<script lang="ts">
	import RightPanel from '$modules/staffdetails/partials/rightPanel.svelte';
	import { goto } from '$app/navigation';
	import { hideRightDrawer, sideQuickActions } from '$data/appStore';
	import { writable } from 'svelte/store';

	// breadCrumb.addToFirstIndex({ title: 'Home', path: '/membership' });

	// $: $breadCrumbData = breadCrumb.crumbs;

	// const actionClicked = ({ detail }: any) => {
	// 	goto(detail.path);
	// 	breadCrumb.makeFirst({ title: detail.label, path: detail.path ?? '' });
	// 	updateBreadCrumbOptions();
	// };

	// const removeCrumb = ({ detail }: any) => {
	// 	goto(detail.path);
	// 	breadCrumb.removeFromFront(detail.index);
	// 	updateBreadCrumbOptions();
	// };

	// const updateBreadCrumbOptions = () => {
	// 	$breadCrumbData = breadCrumb.crumbs;
	// };

	// $: activeBreadCrumb = $breadCrumbData[$breadCrumbData.length - 1]?.title;

	// $sideQuickActions = {
	// 	component: RightPanel,
	// 	props: { actionClicked },
	// 	title: 'Quick Actions'
	// };
</script>

<div class=" w-full h-full flex gap-4 overflow-hidden pb-32 lg:pb-0">
	<section class=" flex-grow flex flex-col gap-2 h-full">
		<slot />
	</section>
	<div class="h-full bg-gray-200 w-0.5 pb-10 hidden md:block" />
	<aside class="hidden w-[21rem] shrink-0" class:md:block={$hideRightDrawer}>
		<RightPanel showActionLabel />
	</aside>
</div>
