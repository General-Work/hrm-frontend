<script lang="ts">
	import Box from '$cmps/ui/box.svelte';
	import { activePage } from '$data/appStore';
	import StaffTable from '$modules/staffTable.svelte';
	export let data;
	$activePage = {
		title: 'Staff Records',
		showBreadCrumb: false
	};
</script>

<!-- <MemberSearchBox fetchFunction={readStaffWithStaffID} showAvatar href="/staffrecords" /> -->

<div class="w-full h-full custom-container pt-4">
	<Box bgWhite shadow rounded>
		<StaffTable tableDataInfo={data.data} />
	</Box>
</div>
