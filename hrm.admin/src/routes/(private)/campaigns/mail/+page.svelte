<script>
	import Box from '$cmps/ui/box.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import MailCampaign from '$modules/campaigns/mail/index.svelte';
	export let data;

	$activePage = {
		title: 'Mail Campaign',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/campaigns' },
			{ title: 'Mail Campaign', path: '/campaigns/sms' }
		],
		true
	);
</script>

<Box bgWhite otherClasses="p-4 " rounded>
	<MailCampaign tableDataInfo={data.data} />
</Box>
