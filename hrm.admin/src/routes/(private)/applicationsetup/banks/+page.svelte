<script>
	import Box from '$cmps/ui/box.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import Banks from '$modules/setup/banks/index.svelte';

	export let data;
	$activePage = {
		title: 'Banks',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/applicationsetup' },
			{ title: 'Banks', path: '' }
		],
		true
	);
</script>

<Box bgWhite otherClasses="p-4 " rounded>
	<Banks tableDataInfo={data.data} />
</Box>
