<script lang="ts">
	import Box from '$cmps/ui/box.svelte';
	import StaffTable from '$modules/staffTable.svelte';
</script>

<div class="w-full h-full custom-container">
	<Box bgWhite shadow rounded>
		<StaffTable on:addTab />
	</Box>
</div>
