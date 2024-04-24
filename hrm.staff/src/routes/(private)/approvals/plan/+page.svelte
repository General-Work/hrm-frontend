<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import Approval from '$modules/approvals/plan.svelte';
	export let data;
	$activePage = {
		title: 'Plan Approval',
		showBreadCrumb: true
	};

	breadCrumb.addToFirstIndex(
		[
			{ title: 'Approvals', path: '/approvals' },
			{ title: 'Plan Approval', path: '' }
		],
		true
	);
</script>

<div class="px-6 w-full h-full">
	<Approval tableDataInfo={data.data} />
</div>
