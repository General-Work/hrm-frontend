<script lang="ts" context="module">
	export interface IItem {
		label: string;
		subLabel: string;
		avatarUrl?: string;
		avatarText?: string;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Avatar } from 'flowbite-svelte';
	import ScrollArea from '$cmps/ui/scrollArea.svelte';
	import { showError } from '$types/utils';
	export let placeholder = 'Search with staff number...';
	export let notFoundMessage = 'No member found';
	export let showAvatar = false;
	export let href = '';
	export let fetchFunction: (
		value: string
	) => Promise<{ success: boolean; message: string; items: IItem[] }>;

	let items: IItem[] = [];
	let dataIsFetched = false;
	let value = '';
	let busy = false;
	const dispatch = createEventDispatcher();

	async function getData(value: string) {
		try {
			busy = true;
			const ret = await fetchFunction(value);
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			dataIsFetched = true;
			items = ret.items;
		} catch (e: any) {
			showError(e.message || e);
		} finally {
			busy = false;
		}
	}
</script>

<div class=" flex px-5 py-5">
	<div
		class="w-full mx-auto rounded-xl bg-gray-100 shadow-lg text-gray-800 relative overflow-hidden resize-x min-w-80 max-w-3xl"
	>
		<div class="px-10 pt-10" class:pb-10={!items.length}>
			<div class="relative mt-1">
				<input
					type="text"
					class="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
					bind:value
					{placeholder}
				/>
				<button
					class="grid place-content-center w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors"
					on:click={() => value && getData(value)}
					><iconify-icon
						disabled={busy}
						class:text-green-500={busy}
						icon={busy ? 'svg-spinners:180-ring-with-bg' : 'ri:search-2-line'}
					/></button
				>
			</div>
		</div>
		{#if dataIsFetched && !items.length}
			<div class="flex justify-center pb-10">
				<div class="flex items-center gap-2 bg-yellow-200 p-5 rounded-md">
					<iconify-icon icon="solar:danger-circle-bold-duotone" />
					<div>{notFoundMessage}</div>
				</div>
			</div>
		{:else if dataIsFetched && items.length}
			<div class="py-4" transition:fade>
				<ScrollArea otherClasses="max-h-96">
					{#each items as list}
						<!-- svelte-ignore a11y-interactive-supports-focus -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<a
							href={href ? `${href}/${list.subLabel}` : ''}
							on:click={() => !href && dispatch('selectedItem', list)}
							class="flex justify-between items-center border-l-4 px-10 border-l-gray-100 hover:border-l-red-400 gap-3 cursor-pointer hover:bg-gray-200 py-1 group"
						>
							<div class="flex items-center gap-3">
								{#if showAvatar}
									{#if list.avatarUrl}
										<Avatar class="bg-blue-500 w-[5.5rem] h-[3.8rem]" src={list.avatarUrl} />
									{:else}
										<Avatar class="bg-blue-500 text-white w-12 h-10">
											{list.avatarText}
										</Avatar>
									{/if}
								{/if}
							</div>
							<div class=" block w-full">
								<div class="truncate">{list.label}</div>
								<div class="text-gray-400 truncate">{list.subLabel}</div>
							</div>
							<div
								class=" duration-300 ease-in-out transition-opacity opacity-0 group-hover:opacity-100"
							>
								<button
									on:click={() => dispatch('selectedItem', list)}
									class=" text-center font-extralight whitespace-nowrap text-gray-400 focus:outline-none hover:text-gray-900 transition-colors"
									>Jump to...</button
								>
							</div>
						</a>
					{/each}
				</ScrollArea>
			</div>
		{/if}

		<div class="absolute top-0 left-0 w-full h-2 flex">
			<div class="h-2 bg-blue-500 flex-1" />
			<div class="h-2 bg-red-500 flex-1" />
			<div class="h-2 bg-yellow-500 flex-1" />
			<div class="h-2 bg-blue-500 flex-1" />
			<div class="h-2 bg-green-500 flex-1" />
			<div class="h-2 bg-red-500 flex-1" />
		</div>
	</div>
</div>

<style>
	.min-w-80 {
		min-width: 20rem;
	}
	.resize::-webkit-resizer,
	.resize-x::-webkit-resizer,
	.resize-y::-webkit-resizer {
		background-color: transparent;
	}
	/* .resize:after,
	.resize-x:after,
	.resize-y:after {
		display: block;
		position: absolute;
		bottom: 5px;
		right: 5px;
		width: 24px;
		height: 24px;
		content: '\F045D';
		font: normal normal normal 24px/1 'Material Design Icons';
		font-size: 24px;
		text-rendering: auto;
		line-height: 24px;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: rgba(0, 0, 0, 0.3);
	} */
</style>
