<script lang="ts">
	import type { IMenuItems } from '$types/appTypes';
	import NavLink from './navLink.svelte';
	import { page } from '$app/stores';

	export let menuItems: IMenuItems[] = [];

	$: activePage = $page.url.pathname;

	const name = (str: string) => {
		if (str) {
			const parts = str.split('/');
			return parts[1];
		}
	};
</script>

<ul class="flex flex-col gap-2">
	{#each menuItems as item}
		{@const active = name(activePage) === name(item.path ?? '')}
		<li class="w-full">
			<NavLink
				label={item.label}
				{active}
				icon={item.icon}
				href={item.path}
				iconSize={item.iconSize}
				count={item.count}
			/>
		</li>
	{/each}
</ul>
