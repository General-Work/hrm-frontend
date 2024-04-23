<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import Children from '$modules/staffdetails/children/index.svelte';
	export let data;
	$activePage = {
		title: 'Children Details',
		showBreadCrumb: true
	};

	breadCrumb.addToFirstIndex(
		[
			{ title: 'Staff Details', path: '/staffdetails' },
			{ title: 'Children Details', path: '' }
		],
		true
	);
</script>

<Children tableDataInfo={data.data} />
