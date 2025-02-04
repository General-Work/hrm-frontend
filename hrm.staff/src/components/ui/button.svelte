<script lang="ts" context="module">
	const kind = {
		success: 'bg-green-400 hover:bg-green-500 text-white',
		primary: 'bg-blue-500 hover:bg-blue-600 text-white',
		darkBlue: 'bg-blue-800 hover:bg-blue-900 text-white',
		ghost: 'hover:bg-gray-100',
		default: 'border-gray-300 border hover:bg-gray-100',
		warning: 'bg-yellow-300  hover:bg-yellow-400',
		pink: 'bg-pink-300 hover:bg-pink-400',
		gold: 'bg-[#993306] text-white',
		goldOutline: 'border border-[#993306] text-[#993306] disabled:border-gray-300'
	};
	export type ButtonColor =
		| 'primary'
		| 'success'
		| 'warning'
		| 'default'
		| 'ghost'
		| 'pink'
		| 'gold'
		| 'darkBlue'
		| 'goldOutline';
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	export let label = '';
	export let type: 'submit' | 'button' | 'reset' = 'button';
	export let color: ButtonColor = 'default';
	export let disabled = false;
	export let busy = false;
	export let leadingIcon = '';
	export let trailingIcon = '';
	export let otherClasses = '';
</script>

<button
	disabled={disabled || busy}
	{type}
	class={cn(
		`disabled:bg-gray-300 disabled:text-gray-400 rounded-[5px] px-4 py-2 ${kind[color]} `,
		otherClasses
	)}
	on:click
>
	<div class="flex items-center gap-1.5 justify-center whitespace-nowrap">
		{#if leadingIcon}
			<iconify-icon icon={leadingIcon} />
		{/if}
		{label}
		{#if busy}
			<iconify-icon icon="svg-spinners:180-ring-with-bg" class="text-pink-500" />
		{/if}
		{#if trailingIcon}
			<iconify-icon icon={trailingIcon} />
		{/if}
	</div>
</button>
