<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import Accomodation from '$modules/staffdetails/accomodation/index.svelte';
	$activePage = {
		title: 'Accomodation Details',
		showBreadCrumb: true
	};

	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Staff Details', path: '/staffdetails' },
			{ title: 'Accomodation Details', path: '/staffdetails/accomodation' }
		],
		true
	);
</script>

<Accomodation />
