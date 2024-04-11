<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import Children from '$modules/staffdetails/children/index.svelte';
	$activePage = {
		title: 'Children Details',
		showBreadCrumb: true
	};

	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Staff Details', path: '/staffdetails' },
			{ title: 'Children Details', path: '/staffdetails/children' }
		],
		true
	);
</script>

<Children />
