<script lang="ts" context="module">
	const actionsButtons: IButtonConfig[] = [
		{
			label: 'Bio Details',
			kind: 'form',
			subLabel: 'Update your biography details',
			path: '/membership/biodata'
		},
		{
			label: 'Bank Details',
			kind: 'form',
			subLabel: 'Update your bank details',
			path: '/membership/bank',
			icon: 'mdi:bank-outline',
			iconBgColor: 'bg-orange-100',
			iconColor: 'text-orange-500'
		},
		{
			label: 'Family Details',
			kind: 'generic',
			icon: 'fluent-mdl2:family',
			subLabel: 'Update your family details',
			path: '/membership/familyDetails'
		},
		{
			label: 'Children Details',
			kind: 'form',
			icon: 'fa6-solid:children',
			subLabel: 'Update your children details',
			iconBgColor: 'bg-pink-100',
			iconColor: 'text-pink-500',
			path: '/membership/children'
		},
		{
			label: 'Professional Licence',
			kind: 'form',
			icon: 'material-symbols:license',
			subLabel: 'Update your licence details'
		},
		{
			label: 'Accomodation',
			kind: 'form',
			icon: 'solar:home-bold',
			subLabel: 'Update your accomodation details',
			iconBgColor: 'bg-yellow-100',
			iconColor: 'text-yellow-600'
		}
	];
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import CardButton, { type IButtonConfig } from '$cmps/ui/cardButton.svelte';
	import { createEventDispatcher } from 'svelte';

	export let showActionLabel = false;
	const dispatch = createEventDispatcher();
	$: activePage = $page.url.pathname;
</script>

<div class="w-full h-full flex flex-col">
	<div class="flex flex-col w-full gap-4">
		<span class=" text-gray-500 font-medium" class:hidden={!showActionLabel}>Actions</span>
		<ul class="flex flex-col gap-4 w-full pr-1">
			{#each actionsButtons as item}
				<li class="w-full">
					<CardButton
						showArrow
						kind={item.kind}
						label={item.label}
						subLabel={item.subLabel}
						icon={item.icon}
						showBg
						showShadow={false}
						iconBgColor={item.iconBgColor}
						iconColor={item.iconColor}
						active={activePage === item.path}
						on:click={() => dispatch('actionClicked', item)}
					/>
				</li>
			{/each}
		</ul>
	</div>
</div>
