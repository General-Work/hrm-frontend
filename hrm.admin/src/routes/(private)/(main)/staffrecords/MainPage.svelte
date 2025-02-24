<script lang="ts">
	import Box from '$cmps/ui/box.svelte';
	import type { ITableDataProps } from '$lib/types';
	import StaffTable from '$modules/staffTable.svelte';

	export let data: ITableDataProps<any> | undefined | null;
</script>

<div class="w-full h-full custom-container">
	<Box bgWhite shadow rounded>
		<StaffTable tableDataInfo={data} on:addTab />
	</Box>
</div>
