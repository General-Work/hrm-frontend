<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import Licence from '$modules/staffdetails/licence/index.svelte';
	export let data;
	$activePage = {
		title: 'Professional Licence Details',
		showBreadCrumb: true
	};

	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Staff Profile', path: '/profile' },
			{ title: 'Professional Licence Details', path: '/staffdetails/professionallicence' }
		],
		true
	);
</script>

<Licence data={data.professionalLicenceDetails} bodies={data.professionalBodies} />
