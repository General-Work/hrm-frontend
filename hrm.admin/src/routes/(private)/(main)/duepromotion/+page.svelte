<script lang="ts">
	import Box from '$cmps/ui/box.svelte';
	import { activePage } from '$data/appStore';
	import StaffDuePromotion from '$modules/promotion/staffDuePromotion.svelte';

	$activePage = {
		title: 'Staff Due Promotion',
		showBreadCrumb: false
	};
</script>

<div class="w-full h-full custom-container pt-4">
	<Box bgWhite shadow rounded>
		<StaffDuePromotion />
	</Box>
</div>
