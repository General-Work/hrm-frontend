<script lang="ts">
	import Box from '$cmps/ui/box.svelte';
	import RightPanel from '$cmps/ui/rightPanel.svelte';
	import StaffHeader from '$cmps/ui/staffHeader.svelte';
	import { hideRightDrawer, sideQuickActions } from '$data/appStore';
	import type { ISideMenu } from '$lib/types';
	import { onDestroy } from 'svelte';
	export let data;

	$: $sideQuickActions = {
		component: RightPanel,
		props: { buttons: data.pages },
		title: 'Actions',
		show: true
	};

	onDestroy(() => {
		$sideQuickActions = {} as ISideMenu;
	});
</script>

<div class=" w-full h-full flex gap-4 overflow-hidden">
	<section class=" flex-grow flex flex-col gap-3 h-full">
		<div>
			<StaffHeader />
		</div>
		<Box otherClasses="p-4 " rounded bgWhite>
			<slot />
		</Box>
	</section>
	<div class="h-full bg-gray-200 w-0.5 pb-10 hidden lg:block" />
	<aside class="hidden w-[19rem] shrink-0" class:lg:block={$hideRightDrawer}>
		<RightPanel showActionLabel buttons={data.pages} />
	</aside>
</div>
