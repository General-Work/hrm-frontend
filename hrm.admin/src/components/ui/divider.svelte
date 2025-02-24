<script>
	import { cn } from '$lib/utils';
	export let otherClasses = '';
	export let text = '';
	export let textClass = '';
</script>

<!-- <div class={cn('my-1 h-px bg-gray-100 dark:bg-gray-600', otherClasses)} /> -->

<div class="flex flex-col gap-4">
	<div class="relative">
		<div class="absolute inset-0 flex items-center" aria-hidden="true">
			<div class={cn('w-full my-1 h-px bg-gray-200 dark:bg-gray-600', otherClasses)} />
		</div>
		<div class="relative flex justify-center">
			<span class={cn('bg-white px-2 text-sm text-gray-500', textClass)}>{text}</span>
		</div>
	</div>
</div>
