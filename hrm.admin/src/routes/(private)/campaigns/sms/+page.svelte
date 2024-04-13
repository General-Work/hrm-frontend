<script>
	import Box from '$cmps/ui/box.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import SMSCampaign from '$modules/campaigns/sms/index.svelte';
	export let data;

	$activePage = {
		title: 'SMS Campaign',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/campaigns' },
			{ title: 'SMS Campaign', path: '/campaigns/sms' }
		],
		true
	);
</script>

<Box bgWhite otherClasses="p-4 " rounded>
	<SMSCampaign tableDataInfo={data.data} />
</Box>
