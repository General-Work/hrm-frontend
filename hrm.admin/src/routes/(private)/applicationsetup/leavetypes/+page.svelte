<script>
	import Box from '$cmps/ui/box.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import LeaveTypes from '$modules/setup/leavetype/index.svelte';

	export let data;
	$activePage = {
		title: 'Leave Types',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/applicationsetup' },
			{ title: 'Leave Types', path: '' }
		],
		true
	);
</script>

<div class="w-full h-full custom-container">
	<Box bgWhite shadow rounded>
		<LeaveTypes tableDataInfo={data.data} />
	</Box>
</div>
