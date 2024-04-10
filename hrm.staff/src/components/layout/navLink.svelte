<script lang="ts" context="module">
	const formatNumber = (number: number) => {
		return number > 10 ? `10+` : number;
	};
</script>

<script lang="ts">
	import { Avatar } from 'flowbite-svelte';

	export let href = '';
	export let label = '';
	export let active = false;
	export let icon = '';
	export let iconSize = 20;
	export let count = 0;
</script>

<a {href} class="flex p-2.5 px-4 font-medium w-full" class:active class:notActive={!active}>
	<div class="flex items-center gap-3 flex-grow">
		<iconify-icon {icon} class:hidden={!icon} style="font-size: {iconSize}px;" />
		{label}
	</div>
	<Avatar class={count ? 'w-6 h-6 text-xs bg-pink-100 text-pink-600 ' : 'hidden'}
		>{formatNumber(count)}</Avatar
	>
</a>

<style lang="postcss">
	.active {
		@apply rounded-md bg-white shadow text-pink-600;
	}
	.notActive {
		@apply text-gray-500 hover:rounded-md hover:bg-gray-100 hover:shadow;
	}
</style>
