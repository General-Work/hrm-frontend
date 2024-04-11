<script>
	import { activePage, breadCrumb } from '$data/appStore';
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
