<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import Home from '$modules/staffrecords/home.svelte';
	$activePage = {
		title: 'Staff Records',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: `/staffrecords` },
			{ title: 'Record', path: '' }
		],
		true
	);
</script>

<Home />
