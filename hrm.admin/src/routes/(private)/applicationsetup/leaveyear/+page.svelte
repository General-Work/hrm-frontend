<script>
	import Box from '$cmps/ui/box.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import LeaveYear from '$modules/setup/leaveyear/index.svelte';

  export let data
	$activePage = {
		title: 'Leave Year',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/applicationsetup' },
			{ title: 'Leave Year', path: '' }
		],
		true
	);
</script>

<Box bgWhite otherClasses="p-4 " rounded>
	<LeaveYear tableDataInfo={data.data} />
</Box>
