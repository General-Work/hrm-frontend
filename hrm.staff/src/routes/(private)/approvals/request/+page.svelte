<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import Approval from '$modules/approvals/request.svelte';
	export let data;
	$activePage = {
		title: 'Leave Request Approval',
		showBreadCrumb: true
	};

	breadCrumb.addToFirstIndex(
		[
			{ title: 'Approvals', path: '/approvals' },
			{ title: 'Leave Request Approval', path: '' }
		],
		true
	);
</script>

<div class="px-6 w-full h-full">
	<Approval tableDataInfo={data.data} />
</div>
