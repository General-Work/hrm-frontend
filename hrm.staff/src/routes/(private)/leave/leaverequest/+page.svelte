<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import Request from '$modules/leave/request/index.svelte';

	$activePage = {
		title: 'Leave Request',
		showBreadCrumb: true
	};

	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Leave Overview', path: '/leave' },
			{ title: 'Leave Request', path: '/leave/leaverequest' }
		],
		true
	);
</script>

<Request />
