<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import CardButton, { type IButtonConfig } from '$cmps/ui/cardButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import ActionButton from './actionButton.svelte';

	export let showActionLabel = false;
	export let buttons: IButtonConfig[] = [];
	const dispatch = createEventDispatcher();
	$: activePage = $page.url.pathname;
</script>

<aside class="w-full h-full flex flex-col">
	<div class="flex flex-col w-full gap-4">
		<span class=" text-gray-500 font-medium" class:hidden={!showActionLabel}>Actions</span>
		<ul class="flex flex-col gap-4 w-full pr-1">
			{#each buttons as item}
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
						active={activePage === item.path}
						href={item.path ?? ''}
						iconSize={20}
					/>
				</li>
			{/each}
		</ul>
	</div>
</aside>
