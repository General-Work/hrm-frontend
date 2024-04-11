<script lang="ts" context="module">
	const actionsButtons: IButtonConfig[] = [
		{
			label: 'Annual Leave Plan',
			kind: 'form',
			subLabel: 'Plan your leave for the year',
			path: '/leave/leaveplan'
		},
		{
			label: 'Leave Request',
			kind: 'form',
			subLabel: 'Request for a leave',
			path: '/leave/leaverequest',
			icon: 'clarity:date-solid-badged',
			iconBgColor: 'bg-pink-100',
			iconColor: 'text-pink-500'
		},
		{
			label: 'Excuse Duty',
			kind: 'generic',
			icon: 'iconoir:healthcare',
			subLabel: 'Request for an excuse duty',
			path: '/leave/excueduty'
		}
	];
</script>

<script lang="ts">
	import RightPanel from '$cmps/ui/rightPanel.svelte';
	import { hideRightDrawer } from '$data/appStore';

	import type { IButtonConfig } from '$cmps/ui/cardButton.svelte';
</script>

<div class=" w-full h-full flex gap-4 overflow-hidden pb-32 lg:pb-0">
	<section class=" flex-grow flex flex-col gap-2 h-full">
		<slot />
	</section>
	<div class="h-full bg-gray-200 w-0.5 pb-10 hidden md:block" />
	<aside class="hidden w-[20rem] shrink-0" class:md:block={$hideRightDrawer}>
		<RightPanel showActionLabel buttons={actionsButtons} />
	</aside>
</div>
