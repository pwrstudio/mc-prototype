import { get } from "svelte/store";
import { network, blockNumber } from "../../stores/network";
import { entities } from "../../stores/entities";
import { playerAddress } from "../../stores/player";

export function hoard() {
  if (get(entities)[get(playerAddress)].energy >= 100) {
    get(network).api?.gather(100);
    return true;
  } else {
    console.log("Hoard: not enough energy");
    return false;
  }
}
