<script>
	import { activePage } from '$data/appStore';
	import Home from '$modules/staffdetails/home/index.svelte';

	$activePage = {
		title: 'Staff Details',
		showBreadCrumb: false
	};
</script>

<Home />
