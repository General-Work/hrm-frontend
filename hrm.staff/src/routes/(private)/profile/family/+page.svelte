<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import FamilyDetails from '$modules/staffdetails/familyDetails/index.svelte';
	export let data 
	$activePage = {
		title: 'Family Details',
		showBreadCrumb: true
	};

	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Staff Profile', path: '/profile' },
			{ title: 'Family Details', path: '/staffdetails/family' }
		],
		true
	);
</script>

<FamilyDetails data={data.familyDetails}/>
