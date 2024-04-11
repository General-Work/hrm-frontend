<script lang="ts">
	import type { IRouteItems } from '$types/types';
	import SideNav from './sideNav.svelte';

	export let menuItems: IRouteItems[] = [];
</script>

<div class="flex flex-col gap-5">
	{#if menuItems.length}
		{#each menuItems as item}
			<div class="flex flex-col gap-2">
				<span class="text-sm text-gray-500 font-thin "> {item.title} </span>
				<SideNav menuItems={item.items} />
			</div>
		{/each}
	{/if}
</div>
