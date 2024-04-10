<script lang="ts">
	import IconButton from '$cmps/ui/iconButton.svelte';
	import type { IUserInfo } from '$types/types';
	import { Avatar, Tooltip } from 'flowbite-svelte';
	export let user: IUserInfo | null;
</script>

<div class="flex items-center justify-between w-full">
	<div class="flex items-center">
		<div class=" ">
			<Avatar class="w-[4rem] h-[4rem]" src={user?.profileImage || ''} />
		</div>
		<div class="block w-40 pl-3">
			<p class="truncate block">{user?.fullName}</p>
			<p class="text-gray-400 font-light text-sm truncate block">{user?.staffId}</p>
		</div>
	</div>
	<IconButton icon="mdi-light:logout" otherClasses="bg-pink-100/70 text-pink-700" on:click />
	<Tooltip placement="right" color="light">Logout</Tooltip>
</div>
