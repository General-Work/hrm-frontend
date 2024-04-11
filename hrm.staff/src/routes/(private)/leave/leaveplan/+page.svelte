<script>
	import { activePage, breadCrumb } from '$data/appStore';
	$activePage = {
		title: 'Annual Leave Plan',
		showBreadCrumb: true
	};

	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Leave Details', path: '/leave' },
			{ title: 'Annual Leave Plan', path: '/leave/leaveplan' }
		],
		true
	);
</script>
