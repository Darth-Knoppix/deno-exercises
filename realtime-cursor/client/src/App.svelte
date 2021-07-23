<script lang="ts">
  import { onDestroy } from "svelte";
  import { userId, users } from "./store";

  const cursorColours = ["gold", "indigo", "darkblue", "deeppink", "salmon"];

  function updateMousePosition(e) {
    users.changePosition($userId, { x: e.layerX, y: e.layerY });
  }

  function resetId() {
    users.remove($userId);
    userId.reset();
  }

  onDestroy(() => {
    users.remove($userId);
  });

  $: userPositions = Object.entries($users);
	$: currentCursorColour = cursorColours[userPositions.findIndex(([id, _pos]) => id === $userId)]
</script>

<main
  class="canvas"
  on:mousemove={updateMousePosition}
  style={`cursor: url("data:image/svg+xml,%3Csvg class='cursor' xmlns='http://www.w3.org/2000/svg' width='32' height='48' viewBox='0 0 156 166' fill='none' %3E%3Cpath d='M52.2033 22.2829L155.557 120.839L96.0332 124.807L52.0366 165.095L52.2033 22.2829Z' fill='${currentCursorColour}' /%3E%3C/svg%3E"), auto;`}
>
  <button on:click={resetId} class="reset">Reset ID ({$userId})</button>
  {#each userPositions as user, index (user[0])}
    {#if user[0] !== $userId}
      <svg
        class="cursor"
        xmlns="http://www.w3.org/2000/svg"
        width="156"
        height="166"
        viewBox="0 0 156 166"
        fill="none"
        style={`transform: translate(${user[1].x}px, ${user[1].y}px)`}
      >
        <path
          d="M52.2033 22.2829L155.557 120.839L96.0332 124.807L52.0366 165.095L52.2033 22.2829Z"
          fill={cursorColours[index]}
        />
      </svg>
    {/if}
  {/each}
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
  .reset {
    position: absolute;
    top: 0;
    left: 0;
  }
  .canvas {
    width: 100vw;
    height: 100vh;
  }
  .cursor {
		width: 2rem;
    height: 2rem;
		transition: transform 500ms ease-in-out;
  }
</style>
