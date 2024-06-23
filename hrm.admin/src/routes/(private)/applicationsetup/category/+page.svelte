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
			{ title: 'Application Setup', path: '/applicationsetup' },
			{ title: 'Category', path: '' }
		],
		true
	);
</script>

<!-- <div class="px-6 pb-6 w-full h-full"> -->
<div class="w-full h-full custom-container">
	<Box bgWhite otherClasses="" rounded shadow>
		<Category tableDataInfo={data.data} />
	</Box>
</div>
