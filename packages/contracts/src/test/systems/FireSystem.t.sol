// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import "../MudTest.t.sol";
import { entityType } from "../../constants.sol";
import { QueryFragment, LibQuery, QueryType } from "solecs/LibQuery.sol";
import { SpawnSystem, ID as SpawnSystemID } from "../../systems/SpawnSystem.sol";
import { FireSystem, ID as FireSystemID } from "../../systems/FireSystem.sol";
import { PositionComponent, ID as PositionComponentID, Coord } from "../../components/PositionComponent.sol";
import { ResourceComponent, ID as ResourceComponentID } from "../../components/ResourceComponent.sol";
import { EnergyComponent, ID as EnergyComponentID } from "../../components/EnergyComponent.sol";
import { EntityTypeComponent, ID as EntityTypeComponentID } from "../../components/EntityTypeComponent.sol";
import { CreatorComponent, ID as CreatorComponentID } from "../../components/CreatorComponent.sol";
import { CoolDownComponent, ID as CoolDownComponentID } from "../../components/CoolDownComponent.sol";

contract FireSystemTest is MudTest {
  function testExecute() public {
    uint256 entity = 42;

    // Initialize components
    EnergyComponent energyComponent = EnergyComponent(getAddressById(components, EnergyComponentID));
    ResourceComponent resourceComponent = ResourceComponent(getAddressById(components, ResourceComponentID));
    PositionComponent positionComponent = PositionComponent(getAddressById(components, PositionComponentID));
    EntityTypeComponent entityTypeComponent = EntityTypeComponent(getAddressById(components, EntityTypeComponentID));
    CreatorComponent creatorComponent = CreatorComponent(getAddressById(components, CreatorComponentID));
    CoolDownComponent coolDownComponent = CoolDownComponent(getAddressById(components, CoolDownComponentID));

    // Spawn player
    SpawnSystem(system(SpawnSystemID)).executeTyped(entity);

    // Create fire
    FireSystem(system(FireSystemID)).executeTyped(entity, 100);
    // 200 - 100
    assertEq(resourceComponent.getValue(entity), 100);
    // 1000 - 50
    assertEq(energyComponent.getValue(entity), 950);

    // Check for fire component in current location
    Coord memory currentPosition = positionComponent.getValue(entity);
    QueryFragment[] memory fragments = new QueryFragment[](2);
    fragments[0] = QueryFragment(QueryType.HasValue, positionComponent, abi.encode(currentPosition));
    fragments[1] = QueryFragment(QueryType.HasValue, entityTypeComponent, abi.encode(entityType.Fire));
    uint256[] memory entitiesAtPosition = LibQuery.query(fragments);
    assertEq(entitiesAtPosition.length, 1);
    // Cooldown on fire component should be blocknumber + resources added:
    // 1 + 100 = 101
    assertEq(coolDownComponent.getValue(entitiesAtPosition[0]), 101);
    // Creator should be set
    console.logInt(int256(creatorComponent.getValue(entitiesAtPosition[0]).length));
    console.logInt(int256(creatorComponent.getValue(entitiesAtPosition[0])[0]));

    // Fast forward past player cool down block
    vm.roll(66);

    // Add to the existing fire
    FireSystem(system(FireSystemID)).executeTyped(entity, 100);
    // 100 - 100
    assertEq(resourceComponent.getValue(entity), 0);
    // 950 - 50
    assertEq(energyComponent.getValue(entity), 900);
    // Cooldown on fire component should be cooldownblock + resources added:
    // 101 + 100 = 201
    assertEq(coolDownComponent.getValue(entitiesAtPosition[0]), 201);
    // Creator should be set
    console.logInt(int256(creatorComponent.getValue(entitiesAtPosition[0]).length));
    // console.logInt(int256(creatorComponent.getValue(entitiesAtPosition[0])[0]));
  }
}
