<script lang="ts">
	import IconButton from '$cmps/ui/iconButton.svelte';
	import { activePage } from '$data/appStore';
	import type { IUserInfo } from '$lib/types';
	import { Avatar, Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import Dropdown from '$cmps/ui/dropdown.svelte';
	import DropdownItem from '$cmps/ui/dropdownItem.svelte';
	import Divider from '$cmps/ui/divider.svelte';

	export let hideSidebar = false;
	export let user: IUserInfo | null | undefined;

	let showUser = false;
	const dispatch = createEventDispatcher();
</script>

<nav class="py-1.5 flex items-center gap-4">
	<IconButton
		icon={hideSidebar ? 'mdi:menu-close' : 'ic:round-menu-open'}
		color="default"
		on:click={() => (hideSidebar = !hideSidebar)}
	/>
	<div class="flex-grow">
		<p class=" font-semibold">
			{$activePage.title}
		</p>
	</div>
	<div class="flex flex-grow sm:hidden" />
	<div class="flex items-center gap-4">
		<div class="user grid place-content-center">
			<div />
			<Button
				pill
				color="light"
				on:click={(_) => (showUser = !showUser)}
				class="!p-0 sm:!p-1 h-10  max-w-[150px] user"
			>
				<Avatar class="sm:mr-2 w-9 h-9 bg-sky-300  text-sm object-cover">
					{#if user?.profileImage}
						<img
							src={user?.profileImage}
							alt="Profile"
							class="rounded-full w-full object-cover h-full"
						/>
					{:else}
						{user?.initials}
					{/if}
				</Avatar>
				<div class="hidden sm:block text-left text-xs sm:pr-2">
					<div class="w-20 truncate">
						<span class="font-semibold">{user?.firstName}</span>
					</div>
					{#if user?.role}
						<div class="text-gray-500 truncate w-20">
							<span>{user.role}</span>
						</div>
					{:else}
						<p class="text-gray-500 truncate w-20 flex">{user?.email}</p>
					{/if}
				</div>
			</Button>

			<Dropdown otherClasses="mt-2" bind:open={showUser}>
				<div class="px-4 py-2 space-y-2">
					<span class="block text-sm font-bold truncate">{user?.fullName}</span>
					<div class="block truncate text-sm">
						<span class="font-light text-gray-500">Role:</span>
						<span class="font-bold">{user?.role}</span>
					</div>
					<div class="block truncate text-sm">
						<span class="font-light text-gray-500">Email:</span>
						<span class="font-bold">{user?.email}</span>
					</div>
				</div>
				<DropdownItem href="/profile">Profile</DropdownItem>
				<Divider />
				<DropdownItem
					on:click={() => {
						dispatch('signout');
						showUser = false;
					}}>Sign Out</DropdownItem
				>
			</Dropdown>
		</div>
	</div>
</nav>
