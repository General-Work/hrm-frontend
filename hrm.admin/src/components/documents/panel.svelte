<script lang="ts">
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	import ActionButton from '$cmps/ui/actionButton.svelte';
	import Divider from '$cmps/ui/divider.svelte';
	import Feeds from './feeds.svelte';
	import type { IRequestAction } from '$lib/types';
	import { browser } from '$app/environment';

	export let documentId: string;
	export let status = '';
	export let actions: IRequestAction[] = [];
	export let otherActions: IRequestAction[] = [];
	export let showActions = true;
	export let feeds: any;

	const dispatch = createEventDispatcher();
	let panelSize = '300px'; // todo: update this for chat
	$: smallScreen = browser && window.innerWidth < 768 ? true : false;
</script>

<div class="overflow pl-2 flex-grow flex flex-col right-panel" style:width={panelSize}>
	<Tabs
		style="underline"
		contentClass="flex-grow flex flex-col h-full overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch tab-content-fill-wrapper"
	>
		<TabItem title="Actions" open on:click={(_) => (panelSize = '300px')}>
			<div class="w-full h-full pb-2">
				<div class="my-3 h-full" class:hidden={!status}>
					<div>
						<span class="font-thin text-gray-600">Status:</span>
						<span>{status}</span>
					</div>
				</div>
				{#if showActions && actions.length}
					<div class="flex flex-col gap-3 px-1">
						{#each actions as action}
							<ActionButton {...action} on:click={(_) => dispatch('click', action)} moreShadow />
						{/each}
					</div>
				{/if}
				{#if actions.length && otherActions.length}
					<Divider />
				{/if}
				{#if otherActions?.length}
					<div class="font-thin mt-3 mb-1 text-gray-400">Supporting Documents</div>
					<div class="flex flex-col gap-1">
						{#each otherActions as action}
							<ActionButton
								showBg={false}
								moreShadow
								showArrow
								{...action}
								on:click={(_) => dispatch('click', action)}
							/>
						{/each}
					</div>
				{/if}
			</div>
		</TabItem>

		<TabItem
			title="Feed"
			on:click={(_) => {
				if (!smallScreen) panelSize = '500px';
			}}
			defaultClass="flex-grow grid "
		>
			<div class="flex-grow flex flex-col px-2 pt-3">
				<Feeds {feeds} />
			</div>
		</TabItem>
	</Tabs>
</div>

<style>
	:global(.tab-content-fill-wrapper > div) {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
	}
</style>
