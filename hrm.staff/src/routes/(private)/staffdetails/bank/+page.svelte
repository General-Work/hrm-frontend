<script>
	import { activePage } from '$data/appStore';
	import Bank from '$modules/membership/bank/index.svelte';
	import { breadCrumbData } from '../+layout.svelte';
	$activePage.title = 'Membership';
	$breadCrumbData = [
		{ title: 'Home', path: '/membership' },
		{ title: 'Bank Details', path: '/membership/bank' }
	];
</script>

<Bank />
