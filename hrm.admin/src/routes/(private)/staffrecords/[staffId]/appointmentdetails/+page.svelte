<script>
	import { page } from '$app/stores';
	import { activePage, breadCrumb } from '$data/appStore';
	import Details from '$modules/staffrecords/appointmentDetails.svelte';

	$activePage = {
		title: 'Appointment Details',
		showBreadCrumb: true
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

<Details />
