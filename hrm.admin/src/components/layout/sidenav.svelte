<script lang="ts">
	import type { IMenuItem } from '$lib/types';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { slide } from 'svelte/transition';

	export let menuItems: IMenuItem[] = [];
	export let hideSidebar = false;

	$: activePage = $page.url.pathname;

	const name = (str: string) => {
		if (str) {
			const parts = str.split('/');
			return parts[1];
		}
	};

	// Store to track the visibility of nested items for each menu item
	const nestedItemVisibility = writable<{ [key: string]: boolean }>({});

	function toggleNestedItems(item: IMenuItem) {
		nestedItemVisibility.update((visibility) => ({
			...visibility,
			[item.title]: !visibility[item.title]
		}));
	}
	// function getRouteDepth(path: string): number {
	//   if (path) {
	//     const parts = path.split("/");
	//     return parts.length - 1; // Subtract 1 to exclude empty string before first /
	//   }
	//   return 0;
	// }
</script>

{#if menuItems.length}
	<ul class="flex flex-col gap-1 side-menu">
		{#each menuItems as item}
			{@const active = name(activePage) === name(item?.path ?? '')}
			{#if !item.items}
				<li class:active class:isActive={active} class:inactive={!active} class="px-4 ml-[1px]">
					<a href={item.path} class="space-x-3 pl-3">
						<iconify-icon icon={item.icon} style="font-size: {item.iconSize}px;" />
						<span>
							{item.title}
						</span>
					</a>
				</li>
			{:else}
				<li class=" py-3 w-full">
					<button
						class=" flex justify-between items-center gap-2 w-full h-full pl-3"
						on:click={() => toggleNestedItems(item)}
					>
						<div class="flex items-center gap-2">
							<iconify-icon icon={item.icon} style="font-size: {item.iconSize}px;" />
							<span>
								{item.title}
							</span>
						</div>
						<iconify-icon icon="iconamoon:arrow-down-2-light" style="font-size: 22px;" />
					</button>
					{#if $nestedItemVisibility[item.title]}
						<div transition:slide>
							<svelte:self menuItems={item.items} {hideSidebar} />
						</div>
					{/if}
				</li>
			{/if}
		{/each}
	</ul>
{/if}

<style lang="postcss">
	.isActive {
		@apply text-blue-600 bg-[#f5e9eb78] py-3 border-l-[3px] border-blue-600;
	}
	.inactive {
		@apply py-3 border-l-[3px] border-white hover:text-blue-600;
	}
	/* .isActiveNestedRoute {
    @apply text-blue-600;
  } */
</style>
