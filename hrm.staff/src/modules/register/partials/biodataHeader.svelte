<script lang="ts">
	import BG from '$lib/images/bg.jpg';
	import type { IApplicantInfo } from '$lib/types';
	import { getInitials } from '$lib/utils';
	import { Avatar } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let user: IApplicantInfo | null;
</script>

<header
	class=" h-20"
	style="background-image: url('{BG}'); background-size: cover; background-position: center;"
>
	<div class="custom-container pt-5">
		<div class="flex gap-4">
			<div class="flex items-center gap-3">
				<Avatar class="bg-[#993306] text-white shadow-sm border shadow-white"
					>{`${getInitials(user?.firsName)}${getInitials(user?.lastName)}`}</Avatar
				>
				<div class="hidden md:block text-white">
					<div class="text-sm truncate w-36 font-medium">
						{`${user?.firsName} ${user?.lastName}`}
					</div>
					<div class="text-xs text-gray-200 font-light w-36">0{user?.contact}</div>
				</div>
			</div>
			<p
				class=" text-white text-2xl lg:text-3xl flex justify-center font-semibold tracking-tight uppercase flex-grow"
			>
				Applicant's Details
			</p>
			<div>
				<button
					class="bg-gray-50/40 px-3 py-1.5 rounded-[5px] items-center flex gap-1 text-white text-sm hover:bg-gray-50/50 font-light"
					on:click={() => dispatch('logout')}
				>
					<iconify-icon icon="majesticons:logout" />
					Logout</button
				>
			</div>
		</div>
	</div>
</header>
