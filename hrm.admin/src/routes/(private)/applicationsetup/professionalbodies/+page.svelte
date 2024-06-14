<script>
	import Box from '$cmps/ui/box.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import PlanYear from '$modules/setup/professionalbodies/index.svelte';
	export let data;
	$activePage = {
		title: 'Professional Bodies',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/applicationsetup' },
			{ title: 'Professional Bodies', path: '' }
		],
		true
	);
</script>

<div class="w-full h-full custom-container">
	<Box bgWhite shadow rounded>
		<PlanYear tableDataInfo={data.data} />
	</Box>
</div>
