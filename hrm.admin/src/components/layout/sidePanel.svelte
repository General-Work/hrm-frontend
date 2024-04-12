<script lang="ts">
	import Divider from '$cmps/ui/divider.svelte';
	import ScrollArea from '$cmps/ui/scrollArea.svelte';
	import type { IRouteItem } from '$lib/types';
	import Sidenav from './sidenav.svelte';
	export let routeItems: IRouteItem[] = [];
	export let hideSidebar = false;
</script>

<ScrollArea otherClasses="flex flex-col gap-6 w-full h-full overflow-y-auto">
	{#each routeItems as route, index}
		<li class="w-full h-fit">
			<span
				class="uppercase text-xs pl-2 text-gray-500 {hideSidebar ? 'hidden' : 'hidden md:block'}"
				>{route.name}</span
			>
			<Sidenav menuItems={route.items} />
			{#if index !== routeItems.length - 1}
				<Divider otherClasses="mx-4 bg-gray-200 mt-3" />
			{/if}
		</li>
	{/each}
</ScrollArea>
