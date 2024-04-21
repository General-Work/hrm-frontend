<script>
	import Box from '$cmps/ui/box.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import Units from '$modules/setup/manpowerlevels/index.svelte';
	export let data;
	$activePage = {
		title: 'Man Power Levels',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/applicationsetup' },
			{ title: 'Man Power Levels', path: '' }
		],
		true
	);
</script>

<Box bgWhite otherClasses="p-4 " rounded>
	<Units tableDataInfo={data.data} />
</Box>
