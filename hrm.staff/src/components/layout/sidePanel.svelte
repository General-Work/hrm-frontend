<script lang="ts">
	import type { IRouteItems, IUserInfo } from '$lib/types';
	import { DropdownDivider } from 'flowbite-svelte';
	import UserContent from './userContent.svelte';
	import SideRoutes from './sideRoutes.svelte';

	export let menuItems: IRouteItems[] = [];
	export let user: IUserInfo | null = null;
</script>

<aside class="w-full h-full bg-gray-100/50 px-4 pt-8 ">
	<div class="flex flex-col h-full">
		<div class="w-full h-full flex flex-col gap-6 flex-grow">
			<UserContent on:click {user} />
			<DropdownDivider divClass="my-1 h-px bg-gray-200 dark:bg-gray-600" />
			<!-- <div class="flex flex-col gap-3">
					<span class="text-sm text-gray-500 font-thin pl-2"> Basics </span>
					<SideNav {menuItems} />
				</div>

				<div class="flex flex-col gap-3" class:hidden={!adminItems.length}>
					<span class="text-sm text-gray-500 font-thin pl-2"> Admin </span>
					<SideNav menuItems={adminItems} />
				</div> -->
			<SideRoutes {menuItems} />
		</div>
		<div class="pb-4">
			<div class="bg-pink-100 h-52 rounded-xl">here</div>
		</div>
	</div>
</aside>
