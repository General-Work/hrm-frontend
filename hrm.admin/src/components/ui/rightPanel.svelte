<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import CardButton, { type IButtonConfig } from '$cmps/ui/cardButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import ActionButton from './actionButton.svelte';
	import { addQueryParams } from '$lib/utils';

	export let showActionLabel = false;
	export let actions: IButtonConfig[] = [];
	export let supportDocuments: IButtonConfig[] = [];
	const dispatch = createEventDispatcher();
	// $: activePage = $page.url.pathname;
	// $: currentPage = addQueryParams(activePage, $page.url.searchParams);
</script>

<aside class="w-full h-full flex flex-col gap-3">
	<div class:hidden={Boolean(actions.length == 0)} class="flex flex-col w-full gap-4">
		<span class=" text-gray-500 font-medium" class:hidden={!showActionLabel}>Actions</span>
		<ul class="flex flex-col gap-4 w-full pr-1">
			{#each actions as item}
				<li class="w-full">
					<ActionButton
						showArrow
						kind={item.kind}
						label={item.label}
						subLabel={item.subLabel}
						icon={item.icon}
						showBg
						iconBgColor={item.iconBgColor}
						iconColor={item.iconColor}
						active
						on:click={(_) => dispatch('click', item)}
						iconSize={20}
						moreShadow
					/>
				</li>
			{/each}
		</ul>
	</div>
	<div class:hidden={Boolean(supportDocuments.length == 0)} class="flex flex-col w-full gap-4">
		<span class=" text-gray-500 font-medium" class:hidden={!showActionLabel}>Other Documents</span>
		<ul class="flex flex-col gap-4 w-full pr-1">
			{#each supportDocuments as item}
				<li class="w-full">
					<ActionButton
						showArrow
						kind={item.kind}
						label={item.label}
						subLabel={item.subLabel}
						icon={item.icon}
						showBg
						iconBgColor={item.iconBgColor}
						iconColor={item.iconColor}
						active
						on:click={(_) => dispatch('click', item)}
						iconSize={20}
						moreShadow
					/>
				</li>
			{/each}
		</ul>
	</div>
</aside>
