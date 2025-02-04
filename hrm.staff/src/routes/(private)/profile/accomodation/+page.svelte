<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import Accomodation from '$modules/staffdetails/accomodation/index.svelte';
	export let data
	$activePage = {
		title: 'Accomodation Details',
		showBreadCrumb: true
	};

	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Staff Profile', path: '/profile' },
			{ title: 'Accomodation Details', path: '' }
		],
		true
	);
</script>

<Accomodation data={data.accomodatioDetail}/>
