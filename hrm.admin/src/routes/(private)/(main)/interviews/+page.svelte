<script lang="ts">
	import Box from '$cmps/ui/box.svelte';
	import { activePage } from '$data/appStore';
	import StaffDuePromotion from '$modules/interviews/index.svelte';

	export let data;

	$activePage = {
		title: 'Interviews',
		showBreadCrumb: false
	};
</script>

<div class="w-full h-full custom-container pt-4">
	<Box bgWhite shadow rounded>
		<StaffDuePromotion tableDataInfo={data.data} />
	</Box>
</div>
