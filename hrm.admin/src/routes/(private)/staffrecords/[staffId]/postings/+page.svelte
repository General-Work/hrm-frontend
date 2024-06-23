<script>
	import { page } from '$app/stores';
	import { activePage, breadCrumb } from '$data/appStore';
	import { extractQueryParam } from '$lib/utils';
	import Details from '$modules/staffrecords/postings.svelte';
	$: isApplicant = extractQueryParam($page.url.search, 'applicant');

	$: $activePage = {
		title: 'Postings',
		showBreadCrumb: isApplicant === 'true' ? false : false
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

<Details isApplicant={isApplicant === 'true' ? true : false} />
