<script lang="ts">
	import { page } from '$app/stores';
	import { activePage, breadCrumb } from '$data/appStore';
	import { extractQueryParam } from '$lib/utils';
	import Details, { type IPostingFormDto } from '$modules/staffrecords/postings.svelte';

	export let data;
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
	let formData = {
		directorateId: data?.staff?.staffPosting?.directorateId || '',
		departmentId: data?.staff?.staffPosting?.departmentId || '',
		unitId: data?.staff?.staffPosting?.unitId || '',
		postingDate: data?.staff?.staffPosting?.postingDate || null
	} as IPostingFormDto;
</script>

<Details
	isRequest={isApplicant === 'true' ? true : false}
	{polymorphicId}
	readOnly={Boolean(formData.directorateId)}
	directorates={data.directorates}
	{formData}
/>
