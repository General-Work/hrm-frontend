<script>
	import { activePage } from '$data/appStore';
	import FamilyDetails from '$modules/membership/familyDetails/index.svelte';
	import { breadCrumbData } from '../+layout.svelte';
	$activePage.title = 'Membership';
	$breadCrumbData = [
		{ title: 'Home', path: '/membership' },
		{ title: 'Family Details', path: '/membership/familyDetails' }
	];
</script>

<FamilyDetails />
