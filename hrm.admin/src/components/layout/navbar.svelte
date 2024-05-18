<script lang="ts">
	import IconButton from '$cmps/ui/iconButton.svelte';
	import { activePage, sideQuickActions } from '$data/appStore';
	import type { IUserInfo } from '$lib/types';
	import { Avatar, Button, DropdownDivider } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import Dropdown from '$cmps/ui/dropdown.svelte';
	import DropdownItem from '$cmps/ui/dropdownItem.svelte';
	import Divider from '$cmps/ui/divider.svelte';
	import { clickOutsideAction } from 'svelte-legos';
	import SlideDown from '$cmps/ui/slideDown.svelte';
	import ScrollArea from '$cmps/ui/scrollArea.svelte';
	import { page } from '$app/stores';

	export let hideSidebar = false;
	export let user: IUserInfo | null | undefined;

	let showUser = false;
	let showRequests = false;
	let dropdownOpen = false;

	const dispatch = createEventDispatcher();
</script>

<nav class="py-1.5 flex items-center gap-4">
	<IconButton
		icon={hideSidebar ? 'mdi:menu-close' : 'ic:round-menu-open'}
		color="default"
		on:click={() => (hideSidebar = !hideSidebar)}
	/>
	<div class="hidden sm:flex flex-grow gap-4 items-center">
		<p class=" font-semibold capitalize">
			{$activePage.title}
		</p>

		<!-- {#if $activePage.dropdownOptions && $activePage.dropdownOptions.length}
			<div use:clickOutsideAction on:clickoutside={() => (showRequests = false)}>
				<button
					on:click={() => (showRequests = !showRequests)}
					class="flex items-center gap-1 bg-blue-300 hover:bg-blue-400 rounded-[5px] px-2 py-[4px] min-w-[230px] justify-between"
				>
					<span>{$activePage.currentDropdownOption?.title}</span>
					<iconify-icon
						icon={dropdownOpen ? 'ri:arrow-up-s-fill' : 'gridicons:dropdown'}
						style="font-size: 20px;"
					/>
				</button>
				{#if showRequests}
					<div
						class="min-w-[230px] mt-1 bg-white shadow-md shadow-gray-300 rounded-md absolute z-10 divide-y py-1"
						use:clickOutsideAction
					>
						<SlideDown otherClasses="w-full h-full">
							<ScrollArea otherClasses="max-h-96 overflow-y-auto">
								{#each $activePage.dropdownOptions as item, index}
									<DropdownItem
										href={`${$page.url.pathname}?q=${item.path}`}
										on:click={() => {
											showRequests = false;
											$activePage = {
												...$activePage,
												currentDropdownOption: item
											};
										}}
									>
										<div class="flex items-center gap-2 whitespace-nowrap">
											{#if item.icon}
												<div class="{item.iconBg} grid place-content-center p-1 rounded-[5px]">
													<iconify-icon icon={item.icon} class={item.iconColor} />
												</div>
											{/if}
											<span>{item.title}</span>
										</div>
									</DropdownItem>
									{#if index !== $activePage.dropdownOptions.length - 1}
										<DropdownDivider />
									{/if}
								{/each}
							</ScrollArea>
						</SlideDown>
					</div>
				{/if}
			</div>
		{/if} -->
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
		<button
			class:hidden={!($sideQuickActions && $sideQuickActions.show)}
			class="grid place-content-center pl-2 text-teal-600 lg:hidden hover:text-teal-900"
			type="button"
			on:click={(_) => dispatch('rightDrawer')}
		>
			<iconify-icon icon="heroicons-solid:menu-alt-3" class="text-2xl" />
		</button>
	</div>
</nav>
