<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import Home from '$modules/staffrecords/home.svelte';
	$activePage = {
		title: 'Staff Records',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Staff Records', path: `/staffrecords` },
			{ title: 'Overview', path: '' }
		],
		true
	);
</script>

<Home />
