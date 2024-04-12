<script>
	import SMS from '$modules/setup/sms/index.svelte';
	import { activePage, breadCrumb } from '$data/appStore';

	export let data;

	$activePage = {
		title: 'SMS Template',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/applicationsetup' },
			{ title: 'SMS Templates', path: '/applicationsetup/sms' }
		],
		true
	);
</script>

<div class="px-6 pb-6 w-full h-full">
	<SMS tableDataInfo={data.data} />
</div>
