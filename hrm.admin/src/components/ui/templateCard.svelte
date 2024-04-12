<script lang="ts" context="module">
	const kind = {
		green: 'bg-green-200/50 border-green-300',
		orange: 'bg-orange-200/50 border-orange-300',
		sky: 'bg-cyan-200/50 border-cyan-300',
		red: 'bg-pink-200/50 border-pink-300'
	};

	const avatarColor = {
		green: 'border-green-300 text-green-600 ',
		orange: 'border-orange-300 text-orange-600 ',
		sky: 'border-cyan-300 text-cyan-600 ',
		red: 'border-pink-300 text-pink-600 '
	};
</script>

<script lang="ts">
	import { Avatar, Tooltip } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	export let name = '';
	export let notes = '';
	export let avatarIcon = '';
	export let showEdit = true;
	export let showView = true;
	export let showDelete = true;
	export let isSystemTemplate = false;
	export let color: 'green' | 'sky' | 'orange' | 'red' = 'green';

	const dispatch = createEventDispatcher();
</script>

<button
	class="{kind[
		color
	]} rounded-md flex flex-col gap-3 items-center justify-center shadow-md border p-4 lg:aspect-square h-[14rem]"
>
	<div class="flex flex-col items-center gap-2 flex-grow">
		<Avatar class="w-14 h-14 border {avatarColor[color]} ">
			<iconify-icon icon={avatarIcon} style="font-size: 28px;" />
		</Avatar>
		<p class="text-center text-gray-900">{name}</p>
		<!-- {#if notes} -->
		<p class:hidden={!notes} class="text-center text-gray-600 text-sm font-extralight">{notes}</p>
		<!-- {/if} -->
		<p class="text-center text-black text-sm font-extralight">
			System Template: {isSystemTemplate ? 'Yes' : 'No'}
		</p>
	</div>
	<div class="flex gap-2">
		<button
			on:click={() => dispatch('view')}
			class="text-blue-600 hover:bg-blue-100 rounded-full grid place-content-center p-1"
			class:hidden={!showView}
			><iconify-icon icon="carbon:view-filled" style="font-size: 18px;" /></button
		>
		<Tooltip placement="bottom">View</Tooltip>
		<button
			on:click={() => dispatch('edit')}
			class="text-teal-600 hover:bg-teal-100 rounded-full grid place-content-center p-1"
			class:hidden={!showEdit}
			><iconify-icon icon="dashicons:edit-page" style="font-size: 18px;" /></button
		>
		<Tooltip placement="bottom">Edit</Tooltip>
		<button
			on:click={() => dispatch('delete')}
			class="text-red-600 hover:bg-red-100 rounded-full grid place-content-center p-1"
			class:hidden={!showDelete}><iconify-icon icon="mdi:delete" style="font-size: 18px;" /></button
		>
		<Tooltip placement="bottom">Delete</Tooltip>
	</div>
</button>
