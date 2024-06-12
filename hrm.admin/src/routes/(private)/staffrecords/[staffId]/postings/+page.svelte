<script>
	import { page } from '$app/stores';
	import { activePage, breadCrumb } from '$data/appStore';
	import Details from '$modules/staffrecords/postings.svelte';

	$activePage = {
		title: 'Postings',
		showBreadCrumb: true
	};
	$: id = $page.params.staffId;
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: `/staffrecords` },
			{ title: 'Staff Records', path: `/staffrecords/${id}` },
			{ title: 'Postings', path: '' }
		],
		true
	);
</script>

<Details />
