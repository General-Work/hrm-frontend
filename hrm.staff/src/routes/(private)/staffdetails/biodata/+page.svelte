<script>
	import { activePage } from '$data/appStore';
	import Biodata from '$modules/membership/biodata/index.svelte';
	import { breadCrumbData } from '../+layout.svelte';
	$activePage.title = 'Membership';
	$breadCrumbData = [
		{ title: 'Home', path: '/membership' },
		{ title: 'Bio Details', path: '/membership/biodata' }
	];
</script>

<Biodata />
