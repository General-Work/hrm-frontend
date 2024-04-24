<script>
	import { activePage, breadCrumb } from '$data/appStore';
	import Approval from '$modules/approvals/excuseduty.svelte';
	export let data;
	$activePage = {
		title: 'Excuse Duty Approval',
		showBreadCrumb: true
	};

	breadCrumb.addToFirstIndex(
		[
			{ title: 'Approvals', path: '/approvals' },
			{ title: 'Excuse Duty Approval', path: '' }
		],
		true
	);
</script>

<div class="px-6 w-full h-full">
	<Approval tableDataInfo={data.data} />
</div>
