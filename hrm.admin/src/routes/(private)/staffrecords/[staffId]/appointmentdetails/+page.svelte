<script>
	import { page } from '$app/stores';
	import { activePage, breadCrumb } from '$data/appStore';
	import { extractQueryParam } from '$lib/utils';
	import Details from '$modules/staffrecords/appointmentDetails.svelte';

	export let data;

	$: isApplicant = extractQueryParam($page.url.search, 'applicant');
	$: polymorphicId = extractQueryParam($page.url.search, 'polymorphicId');

	$: $activePage = {
		title: 'Appointment Details',
		showBreadCrumb: isApplicant === 'true' ? false : true
	};
	$: id = $page.params.staffId;
	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: `/staffrecords` },
			{ title: 'Staff Records', path: `/staffrecords/${id}` },
			{ title: 'Appointment Details', path: '' }
		],
		true
	);
</script>

<Details grade={data.grades} isApplicant={isApplicant === 'true' ? true : false} {polymorphicId} />
