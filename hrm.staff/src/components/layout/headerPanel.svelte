<script>
	import { activePage } from '$data/appStore';
	import { Dropdown, DropdownItem, Avatar, Kbd } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { hotKeyAction } from 'svelte-legos';

	const dispatch = createEventDispatcher();
</script>

<header class="flex pt-6 px-6 items-center">
	<button
		class="nav grid place-content-center hover:text-pink-900 lg:hidden pr-2"
		on:click={(_) => dispatch('leftDrawer')}
	>
		<iconify-icon icon="heroicons-solid:menu-alt-1" class="text-2xl" />
	</button>
	<div class="flex-grow text-3xl tracking-wide">{$activePage.title}</div>
	<div class="flex items-center gap-1">
		<div class="search hidden sm:block">
			<button
				class="justify-start flex gap-2 items-center content-center place-items-center align-middle border rounded-lg p-2 mx-3 hover:bg-gray-50"
				on:click={() => dispatch('search')}
				use:hotKeyAction={{ ctrl: true, code: 'KeyK', cb: () => dispatch('search') }}
			>
				<span class="flex items-center gap-1 text-sm">
					<iconify-icon icon="heroicons-outline:search" class="text-gray-400" />
					Search
				</span>
				<Kbd class="px-2 grid place-content-center h-7 ">Ctrl K</Kbd>
			</button>
		</div>

		<div
			id="bell"
			class="grid place-content-center hover:bg-gray-200/60 rounded-md py-2 px-2.5 cursor-pointer items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
		>
			<iconify-icon icon="material-symbols:notifications-unread-rounded" style="font-size: 20px;" />
			<div class="flex relative">
				<div
					class="absolute -top-6 end-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"
				/>
			</div>
		</div>
		<Dropdown
			triggeredBy="#bell"
			class="w-full max-w-sm rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700"
		>
			<div slot="header" class="text-center py-2 font-bold">Notifications</div>
			<DropdownItem class="flex space-x-4 rtl:space-x-reverse">
				<Avatar src="/images/profile-picture-1.webp" dot={{ color: 'bg-gray-300' }} rounded />
				<div class="ps-3 w-full">
					<div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
						New message from <span class="font-semibold text-gray-900 dark:text-white"
							>Jese Leos</span
						>
						: "Hey, what's up? All set for the presentation?"
					</div>
					<div class="text-xs text-primary-600 dark:text-primary-500">a few moments ago</div>
				</div>
			</DropdownItem>
			<DropdownItem class="flex space-x-4 rtl:space-x-reverse">
				<Avatar src="/images/profile-picture-2.webp" dot={{ color: 'bg-red-400' }} rounded />
				<div class="ps-3 w-full">
					<div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
						<span class="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span>
						and
						<span class="font-medium text-gray-900 dark:text-white">5 others</span>
						started following you.
					</div>
					<div class="text-xs text-primary-600 dark:text-primary-500">10 minutes ago</div>
				</div>
			</DropdownItem>
			<DropdownItem class="flex space-x-4 rtl:space-x-reverse">
				<Avatar src="/images/profile-picture-3.webp" dot={{ color: 'bg-green-400' }} rounded />
				<div class="ps-3 w-full">
					<div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
						<span class="font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
						and
						<span class="font-medium text-gray-900 dark:text-white">141 others</span>
						love your story. See it and view more stories.
					</div>
					<div class="text-xs text-primary-600 dark:text-primary-500">44 minutes ago</div>
				</div>
			</DropdownItem>
			<a
				slot="footer"
				href="/"
				class="block py-2 -my-1 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
			>
				<div class="inline-flex items-center">View all</div>
			</a>
		</Dropdown>
	</div>
	<button
		class="grid place-content-center pl-2 text-pink-600 md:hidden hover:text-pink-900"
		type="button"
		on:click={(_) => dispatch('rightDrawer')}
	>
		<iconify-icon icon="heroicons-solid:menu-alt-3" class="text-2xl" />
	</button>
</header>
