<script lang="ts">
  export let title = "";
  export let large = false;
  export let centered = false;
  // export let width = 4;
  // export let height = 4;
</script>

<div class="ui-component" class:large class:centered>
  {#if title}
    <div class="titlebar">{title}</div>
  {/if}
  <div class="ui-component-inner">
    <slot />
  </div>
</div>

<style>
  .ui-component {
    float: left;
    width: 24%;
    min-height: 200px;
    border: 1px solid #a4a4a4;
    margin: 4px;
    background: #e4e4e4;
  }

  .large {
    width: calc(48% + 8px);
  }

  .ui-component-inner {
    padding: 10px;
  }

  .titlebar {
    width: 100%;
    padding: 10px;
    font-size: 12px;
    background: black;
    color: red;
  }

  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
</style>
