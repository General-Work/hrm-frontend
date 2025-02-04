<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import ExuseDuty from '$modules/leave/excuse/index.svelte';
	$activePage = {
		title: 'Excuse Duty',
		showBreadCrumb: true
	};

	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Leave Details', path: '/leave' },
			{ title: 'Excuse Duty', path: '/leave/excueduty' }
		],
		true
	);
</script>

<ExuseDuty />
