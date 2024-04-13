<script lang="ts" context="module">
	import type { ITableColumn } from '$cmps/ui/table.svelte';

	const columns: ITableColumn[] = [
		{
			header: 'Name',
			accessor: 'name',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'No. of Runs',
			accessor: 'numberOfRuns',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Frequency',
			accessor: 'frequency',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Start Date',
			accessor: (row) => dayjs(row.startDate).format('ddd DD MMM, YYYY'),
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'End Date',
			accessor: (row) => dayjs(row.startDate).format('ddd DD MMM, YYYY'),
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Time',
			accessor: (row) => dayjs(row.time).format('hh:mm A'),
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Status',
			accessor: 'status',
			plugins: {
				sort: { disable: true }
			}
		}
	];

	export async function create(data: any) {
		// return await axios.post('/usermanagement', data);
	}

	export async function read() {
		// return await axios.get('/usermanagement');
	}
</script>

<script lang="ts">
	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import Editor from './editor.svelte';
	import axios from 'axios';
	import type { ITableDataProps } from '$lib/types';
	import dayjs from 'dayjs';
	export let tableDataInfo: ITableDataProps<any> | undefined;
</script>

<div>
	<DatatablePage
		{tableDataInfo}
		tableColumns={columns}
		showEditorIn="side-modal"
		addButtonLabel="New Campaign"
		addNewHeading="New Campaign"
		updateHeading="Update Campaign"
		editorComponent={Editor}
		sideModalSize="xl"
		showModalButtons
		createEntry={create}
		{read}
	/>
</div>
