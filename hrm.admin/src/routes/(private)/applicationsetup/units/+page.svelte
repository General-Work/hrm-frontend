<script>
	import Box from '$cmps/ui/box.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import Units from '$modules/setup/units/index.svelte';
	export let data;
	$activePage = {
		title: 'Units',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/applicationsetup' },
			{ title: 'Units', path: '' }
		],
		true
	);
</script>

<div class="w-full h-full custom-container">
	<Box bgWhite shadow rounded>
		<Units tableDataInfo={data.data} directorates={data.optional.directorates} />
	</Box>
</div>
