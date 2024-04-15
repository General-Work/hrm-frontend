<script lang="ts">
	import { cn } from '$lib/utils';

	export let label = '';
	export let kind: 'pink' | 'teal' | 'blue' | 'sky' | 'none' = 'blue';
	export let icon = '';
	export let fieldsetDiv = '';
	export let legendDiv = '';
	export let slotDiv = '';
</script>

<fieldset
	class={cn('border rounded-md', fieldsetDiv)}
	class:border-blue-200={kind === 'blue'}
	class:border-teal-200={kind === 'teal'}
	class:border-pink-200={kind === 'pink'}
	class:border-sky-200={kind === 'sky'}
>
	<legend
		class={cn(
			' shadow-sm shadow-gray-200 t rounded-[5px] px-2 py-1 ml-4 flex items-center gap-1.5 font-light',
			legendDiv
		)}
		class:bg-blue-400={kind === 'blue'}
		class:bg-pink-50={kind === 'pink'}
		class:bg-teal-50={kind === 'teal'}
		class:bg-sky-50={kind === 'sky'}
		class:text-white={kind === 'blue'}
		class:text-teal-500={kind === 'teal'}
		class:text-pink-500={kind === 'pink'}
		class:text-sky-500={kind === 'sky'}
	>
		<iconify-icon {icon} style="font-size: 16px;" />
		{label}</legend
	>
	<div class={cn('p-4', slotDiv)}>
		<slot />
	</div>
</fieldset>
