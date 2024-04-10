<script>
	import { cn } from '$lib/utils';
	export let otherClasses = '';
</script>

<div
	class={cn(
		'w-full h-full scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch overflow-y-auto ',
		otherClasses
	)}
>
	<slot />
</div>
