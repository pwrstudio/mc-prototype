<script lang="ts">
  import { entities } from "../stores/entities";
  import { playerAddress } from "../stores/player";
  import { seedToName } from "../utils/name";
  import { EntityType } from "../utils/space";
  import { shortenAddress } from "../utils/ui";
  import { blockNumber } from "../stores/network";
  import { uniq } from "lodash";

  const SECONDS_IN_DAY = 86400;

  let clockTime: number;
  $: clockTime = Math.floor((($blockNumber % 3600) / 3600) * SECONDS_IN_DAY);

  function isNight(date: Date) {
    return date.getHours() > 17 || date.getHours() < 9;
  }

  function formatTime(seconds: number) {
    let currentTime = new Date(seconds * 1000);
    return (isNight(currentTime) ? "🌙 " : "🌞 ") + currentTime.toISOString().substr(11, 8);
  }

  function playerList(players: string[]) {
    let playerNames = players.map((p) => ($entities[p] ? seedToName($entities[p].seed) : "not-found"));
    console.log("playerNames", playerNames);
    // HACK: should make sure that the creator array on contract level is unique instead...
    return uniq(playerNames).join(", ");
  }
</script>

<div class="ui-debug-log">
  <div>Blocknumber: <strong>{$blockNumber}</strong></div>
  <div class="clock-time">World time: {formatTime(clockTime)}</div>
  <div>Cooldown block: {$entities[$playerAddress].coolDownBlock}</div>
  <hr />
  {#each Object.entries($entities) as [address, value]}
    <div class:player={address === $playerAddress}>
      {#if value.entityType == EntityType.Player}
        <strong>👺 {seedToName($entities[address].seed)}</strong>
      {/if}
      {#if value.entityType == EntityType.Terrain}
        <strong>🗺️ {shortenAddress(address)}</strong>
      {/if}
      {#if value.entityType == EntityType.Fire}
        <strong>🔥 {shortenAddress(address)}</strong>
      {/if}
      / x:{value.position?.x}
      / y: {value.position?.y}
      {#if value.entityType == EntityType.Player}
        / e: {value.energy}
      {/if}
      {#if value.coolDownBlock}
        / cdb: {value.coolDownBlock}
      {/if}
      {#if value.resource}
        / r: {value.resource}
      {/if}
      {#if value.entityType == EntityType.Fire}
        / => {playerList(value.creator)}
      {/if}
    </div>
  {/each}
</div>

<style>
  .player {
    color: blue;
  }
</style>
