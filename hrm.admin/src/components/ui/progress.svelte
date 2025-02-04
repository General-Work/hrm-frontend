<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	export let max = 100;
	export let value = 0;
	export let intermediate = true;
	export let interval = 50;
	export let step = 10;
	export let show = true;

	let timerId: NodeJS.Timer;

	onMount(() => {
		if (timerId) clearInterval(timerId as any);
		if (intermediate) {
			setInterval(() => {
				value += step;
				if (value > max) value = 0;
			}, interval);
		}
	});

	onDestroy(() => {
		if (timerId) clearInterval(timerId as any);
	});
</script>

{#if show}
	<progress {value} {max}></progress>
{/if}

<style>
  progress {
    @apply appearance-none block w-full bg-gray-200 rounded-full h-1;
  }

  progress::-webkit-progress-value {
    @apply bg-green-400 rounded-full;
  }
</style>
