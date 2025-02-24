<script lang="ts" context="module">
	const columns: ITableColumn[] = [
		{
			header: 'Staff Number',
			accessor: (row: IInterviewCandidate) => row.staffIdentificationNumber ?? '',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Name',
			accessor: (row: IInterviewCandidate) =>
				`${row.firstName} ${row.otherNames ?? ''} ${row.lastName}`,
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Grade',
			accessor: (row: IInterviewCandidate) => row.currentAppointment.grade.gradeName ?? '',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Department',
			accessor: (row: IInterviewCandidate) => row.department?.departmentName ?? '',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Status',
			accessor: (row: IInterviewCandidate) => 'PENDING',
			plugins: {
				sort: { disable: true }
			}
		}
	];
</script>

<script lang="ts">
	import Box from '$cmps/ui/box.svelte';

	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import type { IStaffByID, ITableDataProps } from '$lib/types';
	import type { IInterviewCandidate } from '$modules/interviews/index.svelte';
	import { createEventDispatcher } from 'svelte';

	export let tableDataInfo: ITableDataProps<any> | undefined;
	const dispatch = createEventDispatcher();
</script>

<Box bgWhite shadow rounded>
	<DatatablePage
		tableColumns={columns}
		{tableDataInfo}
		editorComponent={{}}
		sideModalSize="sm"
		showAdd={false}
		pageUrl="/interview-session"
		fillSpace={false}
		rowClickable
		showActions
		showViewDetails
		on:view={({ detail }) => {
			dispatch('addTab', detail);
		}}
	/>
</Box>
