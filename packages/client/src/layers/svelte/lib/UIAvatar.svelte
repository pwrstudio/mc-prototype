<script lang="ts">
  import { tweened } from "svelte/motion";
  import { playerAddress } from "../stores/player";
  import { entities } from "../stores/entities";
  import { seedToName } from "../utils/name";
  import { blockNumber } from "../stores/network";

  const energy = tweened($entities[$playerAddress].energy);
  const resource = tweened($entities[$playerAddress].resource);
  const x = tweened($entities[$playerAddress].position?.x);
  const y = tweened($entities[$playerAddress].position?.y);

  entities.subscribe((value) => {
    let duration = ($entities[$playerAddress].coolDownBlock - $blockNumber) * 1000;
    duration = duration > 0 ? duration : 1000;

    console.log("$entities[$playerAddress].coolDownBlock", $entities[$playerAddress].coolDownBlock);
    console.log("$blockNumber", $blockNumber);
    console.log("duration", duration);

    let newEnergy = $entities[$playerAddress].energy;
    if (newEnergy !== $energy) {
      energy.set(newEnergy, { duration: duration });
    }

    let newResource = $entities[$playerAddress].resource;
    if (newResource !== $resource) {
      resource.set(newResource, { duration: duration });
    }

    let newX = $entities[$playerAddress].position?.x;
    if (newX !== $x) {
      x.set(newX, { duration: duration });
    }

    let newY = $entities[$playerAddress].position?.y;
    if (newY !== $y) {
      y.set(newY, { duration: duration });
    }
  });
</script>

<div class="ui-avatar">
  <img src="/img/avatar-placeholder.jpg" alt="Avatar" />
  <div class="name">{seedToName($entities[$playerAddress].seed)}</div>
  <div class="large-indicator">
    <div class="label">Energy</div>
    <div class="value">{$energy.toFixed(2)}</div>
  </div>
  <div class="large-indicator">
    <div class="label">Resource</div>
    <div class="value">{$resource.toFixed(2)}</div>
  </div>
  <div class="large-indicator">
    <div class="label">X</div>
    <div class="value">{$x.toFixed(2)}</div>
  </div>
  <div class="large-indicator">
    <div class="label">Y</div>
    <div class="value">{$y.toFixed(2)}</div>
  </div>
</div>

<style>
  .ui-avatar {
    /* height: 400px; */
  }

  img {
    max-width: 100%;
    max-height: 300px;
  }

  .name {
    font-size: 1.5em;
    font-weight: bold;
  }

  .large-indicator {
    display: flex;
    width: 100%;
    border: 1px solid black;
    text-align: center;
    height: 60px;
    line-height: 60px;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .label {
    background: black;
    color: white;
    width: 30%;
  }

  .value {
    font-size: 2em;
    width: 70%;
    font-family: monospace;
  }

  .up {
    background: #bfff5e;
  }

  .down {
    background: #d1656c;
  }
</style>
