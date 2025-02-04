<script>
	import { activePage } from '$data/appStore';
	import Home from '$modules/approvals/home.svelte';

	$activePage = {
		title: 'Approvals',
		showBreadCrumb: false
	};
</script>

<Home />
