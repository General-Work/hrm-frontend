<script>
	import Box from '$cmps/ui/box.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import Grade from '$modules/salary/grade/index.svelte';

	export let data;

	$activePage = {
		title: 'Grade',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Application Setup', path: '/applicationsetup' },
			{ title: 'Grade', path: '' }
		],
		true
	);
</script>

<div class="w-full h-full custom-container">
	<Box bgWhite shadow rounded>
		<Grade tableDataInfo={data.data} category={data.optional.category} />
	</Box>
</div>
