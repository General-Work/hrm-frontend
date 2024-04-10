<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import FamilyDetails from '$modules/staffdetails/familyDetails/index.svelte';
	$activePage = {
		title: 'Family Details',
		showBreadCrumb: true
	};

	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Staff Details', path: '/staffdetails' },
			{ title: 'Family Details', path: '/staffdetails/family' }
		],
		true
	);
</script>

<FamilyDetails />
