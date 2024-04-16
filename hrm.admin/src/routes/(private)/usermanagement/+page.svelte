<script lang="ts">
	import Box from '$cmps/ui/box.svelte';
	import { activePage } from '$data/appStore';
	import UserManagement from '$modules/usermanagement/index.svelte';
	export let data;
	$activePage = {
		title: 'User Management',
		showBreadCrumb: false
	};
</script>

<!-- <Box bgWhite otherClasses="p-4 mt-4" rounded> -->
	<UserManagement tableDataInfo={data.data} />
<!-- </Box> -->
