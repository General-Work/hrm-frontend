<script lang="ts">
	import { page } from '$app/stores';
	import { activePage, breadCrumb } from '$data/appStore';
	import LeaveHistory from '$modules/staffrecords/leaveHistory.svelte';
	$: $activePage = {
		title: 'Leave History',
		showBreadCrumb: true
	};
	$: id = $page.params.staffId;
	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Staff Records', path: `/staffrecords` },
			{ title: 'Overview', path: `/staffrecords/${id}` },
			{ title: 'Leave History', path: '' }
		],
		true
	);
</script>

<LeaveHistory />
