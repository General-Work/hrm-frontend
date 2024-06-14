<script>
	import SMS from '$modules/setup/sms/index.svelte';
	import { activePage, breadCrumb } from '$data/appStore';

	export let data;

	$activePage = {
		title: 'Campaigns Template',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/applicationsetup' },
			{ title: 'Campaigns Template', path: '/applicationsetup/sms' }
		],
		true
	);
</script>

<div class="custom-container w-full h-full">
	<SMS tableDataInfo={data.data} />
</div>
