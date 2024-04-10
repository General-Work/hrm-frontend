<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import Biodata from '$modules/staffdetails/biodata/index.svelte';
	$activePage = {
		title: 'Bio Details',
		showBreadCrumb: true
	};

	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Staff Details', path: '/staffdetails' },
			{ title: 'Bio Details', path: '/staffdetails/biodata' }
		],
		true
	);
</script>

<Biodata />
