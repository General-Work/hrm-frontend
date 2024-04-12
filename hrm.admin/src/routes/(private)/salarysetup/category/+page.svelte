<script>
	import Box from '$cmps/ui/box.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import Category from '$modules/salary/category/index.svelte';

	export let data;

	$activePage = {
		title: 'Category',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/salarysetup' },
			{ title: 'Category', path: '/salarysetup/category' }
		],
		true
	);
</script>

<!-- <div class="px-6 pb-6 w-full h-full"> -->
<Box bgWhite otherClasses="p-4 " rounded>
	<Category tableDataInfo={data.data} />
</Box>
