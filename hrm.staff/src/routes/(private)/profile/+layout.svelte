<script lang="ts" context="module">
	const actionsButtons: IButtonConfig[] = [
		{
			label: 'Bio Details',
			kind: 'form',
			subLabel: 'Update your biography details',
			path: '/profile/biodata'
		},
		{
			label: 'Bank Details',
			kind: 'form',
			subLabel: 'Update your bank details',
			path: '/profile/bank',
			icon: 'mdi:bank-outline',
			iconBgColor: 'bg-orange-100',
			iconColor: 'text-orange-500'
		},
		{
			label: 'Family Details',
			kind: 'generic',
			icon: 'fluent-mdl2:family',
			subLabel: 'Update your family details',
			path: '/profile/family'
		},
		{
			label: 'Children Details',
			kind: 'form',
			icon: 'fa6-solid:children',
			subLabel: 'Update your children details',
			iconBgColor: 'bg-pink-100',
			iconColor: 'text-pink-500',
			path: '/profile/children'
		},
		{
			label: 'Professional Licence',
			kind: 'form',
			icon: 'material-symbols:license',
			subLabel: 'Update your licence details',
			path: '/profile/professionallicence'
		},
		{
			label: 'Accomodation',
			kind: 'form',
			icon: 'solar:home-bold',
			subLabel: 'Update your accomodation details',
			iconBgColor: 'bg-yellow-100',
			iconColor: 'text-yellow-600',
			path: '/profile/accomodation'
		}
	];
</script>

<script lang="ts">
	import { hideRightDrawer } from '$data/appStore';

	import type { IButtonConfig } from '$cmps/ui/cardButton.svelte';
	import RightPanel from '$cmps/ui/rightPanel.svelte';
</script>

<div class=" w-full h-full flex gap-4 overflow-hidden pb-32 lg:pb-0 pl-6 pr-1">
	<section class=" flex-grow flex flex-col gap-2 h-full">
		<slot />
	</section>
	<div class="h-full bg-gray-200 w-0.5 pb-10 hidden md:block" />
	<aside class="hidden w-[21rem] shrink-0" class:md:block={$hideRightDrawer}>
		<RightPanel showActionLabel buttons={actionsButtons} />
	</aside>
</div>
