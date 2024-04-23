<script lang="ts">
	import { cn } from '$lib/utils';

	export let otherClasses = '';
	export let bgWhite = false;
	export let rounded = false;
	export let padding = false;
</script>

<div
	class={cn(
		'w-full h-full scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch overflow-y-auto ',
		otherClasses
	)}
	class:rounded-lg={rounded}
	class:bgWhite
	class:p-6={padding}
>
	<slot />
</div>

<style lang="postcss">
	.bgWhite {
		@apply bg-white dark:bg-gray-900;
	}
</style>
