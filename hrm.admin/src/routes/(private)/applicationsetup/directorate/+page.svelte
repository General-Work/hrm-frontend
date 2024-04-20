<script>
	import Box from '$cmps/ui/box.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import Directorate from '$modules/setup/directorates/index.svelte';
	export let data;
	$activePage = {
		title: 'Direcotrates',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/applicationsetup' },
			{ title: 'Direcotrates', path: '' }
		],
		true
	);
</script>

<Box bgWhite otherClasses="p-4 " rounded>
	<Directorate tableDataInfo={data.data} />
</Box>
