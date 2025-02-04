<script>
	import { activePage } from '$data/appStore';
	import Home from '$modules/staffdetails/home/index.svelte';
	export let data
	$activePage = {
		title: 'Staff Profile',
		showBreadCrumb: false
	};
</script>

<Home data={data.profile}/>
