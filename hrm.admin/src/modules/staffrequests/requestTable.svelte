<script lang="ts" context="module">
	const tableColumns: ITableColumn[] = [
		{
			header: 'ID',
			id: 'id',
			accessor: (row: any) => `000000000${row.id}`.slice(-9)
		},
		{
			header: 'Request Type',
			accessor: (row: any) => row.type ?? '',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Staff ID',
			// id: 'member.staffNumber',
			accessor: (row: any) => row.staffId ?? 'N/A'
		},
		{
			header: 'Staff Name',
			// id: 'memberId',
			accessor: (row: any) => row.staffName ?? 'N/A',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Request Date',
			id: 'createdOn',
			accessor: (row: any) => dayjs(row.requestDateTime).format('DD-MMM-YYYY') ?? 'N/A'
		},
		{
			header: 'Status',
			// id: 'status',
			accessor: (row: any) => row.currentStatus ?? 'N/A',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Assigned To',
			// id: 'assignedToId',
			accessor: 'assignedTo',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Last Updated At',
			// id: 'updatedOn',
      plugins: {
				sort: { disable: true }
			},
			accessor: (row: any) => dayjs(row.lastUpdatedAt).format('DD-MMM-YYYY') ?? 'N/A'
		}
	];
</script>

<script lang="ts">
	import Box from '$cmps/ui/box.svelte';

	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import Table from '$cmps/ui/table.svelte';
	import type { ITableDataProps } from '$types/types';
	import dayjs from 'dayjs';

	export let tableDataInfo: ITableDataProps<any> | undefined;
</script>

<Box bgWhite otherClasses="p-4 mt-4" rounded>
	<Table {tableColumns} data={[]} headerColor="sky" />
</Box>
