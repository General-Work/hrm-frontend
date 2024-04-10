<script lang="ts">
	import BG from '$lib/images/bg.jpg';
	import type { IUserInfo } from '$types/types';
	import { Avatar } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let user: IUserInfo | null;
</script>

<header
	class=" h-40"
	style="background-image: url('{BG}'); background-size: cover; background-position: center;"
>
	<div class="lg:container lg:mx-auto px-2 xl:px-40 pt-5">
		<div class="flex justify-between items-end">
			<div class="flex items-center gap-3">
				<Avatar class="bg-[#993306] text-white shadow-sm border shadow-white"
					>{user?.initials}</Avatar
				>
				<div class="hidden md:block text-white">
					<div class="text-sm truncate w-36 font-medium">{user?.fullName}</div>
					<div class="text-xs text-gray-200 font-light w-36">{user?.phoneNumber}</div>
				</div>
			</div>
			<button
				class="bg-gray-50/40 px-3 py-1.5 rounded-[5px] items-center flex gap-1 text-white text-sm hover:bg-gray-50/50 font-light"
				on:click={() => dispatch('logout')}
			>
				<iconify-icon icon="majesticons:logout" />
				Logout</button
			>
		</div>
		<p
			class="py-4 lg:py-0 text-white text-2xl lg:text-3xl flex justify-center font-semibold tracking-wide"
		>
			Employee's Bio Details
		</p>
	</div>
</header>
