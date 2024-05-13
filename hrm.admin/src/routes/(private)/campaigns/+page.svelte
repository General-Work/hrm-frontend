<script>
	import Box from '$cmps/ui/box.svelte';
	import { activePage } from '$data/appStore';
	import Campaign from '$modules/campaigns/sms/index.svelte';

	export let data;

	$activePage = {
		title: 'Campaigns',
		showBreadCrumb: false
	};
</script>

<Box bgWhite otherClasses="p-4 mt-4" rounded>
	<Campaign tableDataInfo={data.data} templates={data.optional.templates} />
</Box>
