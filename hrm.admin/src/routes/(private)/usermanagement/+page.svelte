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

<div class="w-full h-full pt-4 custom-container">
	<Box bgWhite shadow rounded>
		<UserManagement tableDataInfo={data.data} />
	</Box>
</div>
