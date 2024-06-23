<script>
	import { page } from '$app/stores';
	import { activePage, breadCrumb } from '$data/appStore';
	import { extractQueryParam } from '$lib/utils';
	import Details from '$modules/staffrecords/postings.svelte';
	$: isApplicant = extractQueryParam($page.url.search, 'applicant');
	$: polymorphicId = extractQueryParam($page.url.search, 'polymorphicId');

	$: $activePage = {
		title: 'Postings',
		showBreadCrumb: isApplicant === 'true' ? false : true
	};
	$: id = $page.params.staffId;
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Staff Records', path: `/staffrecords` },
			{ title: 'Overview', path: `/staffrecords/${id}` },
			{ title: 'Postings', path: '' }
		],
		true
	);
</script>

<Details isRequest={isApplicant === 'true' ? true : false} {polymorphicId} />
