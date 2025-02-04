<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import ExuseDuty from '$modules/leave/deferment/index.svelte';
	$activePage = {
		title: 'Deferment',
		showBreadCrumb: true
	};

	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Leave Details', path: '/leave' },
			{ title: 'Deferment', path: '' }
		],
		true
	);
</script>

<ExuseDuty />
