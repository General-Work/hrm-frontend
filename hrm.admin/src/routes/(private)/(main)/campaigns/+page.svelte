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

<div class="w-full h-full custom-container pt-4">
	<Box bgWhite shadow rounded>
		<Campaign tableDataInfo={data.data} templates={data.optional.templates} />
	</Box>
</div>
