<script>
	import { activePage, breadCrumb } from '$data/appStore';
	$activePage = {
		title: 'Leave Request',
		showBreadCrumb: true
	};

	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Leave Details', path: '/leave' },
			{ title: 'Leave Request', path: '/leave/leaverequest' }
		],
		true
	);
</script>
