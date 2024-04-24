<script>
	import { activePage } from '$data/appStore';
	import Home from '$modules/home/index.svelte';

	$activePage = {
		title: 'Overview',
		showBreadCrumb: false
	};
</script>

<Home />
