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
			{ title: 'Home', path: '/salarysetup' },
			{ title: 'Grade', path: '/salarysetup/grade' }
		],
		true
	);
</script>

<Box bgWhite otherClasses="p-4" rounded>
	<Grade tableDataInfo={data.data} category={data.optional.category} />
</Box>
