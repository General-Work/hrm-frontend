
<script lang="ts" context="module">
	import type { ITableColumn } from '$cmps/ui/table.svelte';

	const columns: ITableColumn[] = [
		{
			header: '#',
			accessor: 'id',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Staff ID',
			accessor: 'staffId'
		},
		{
			header: 'Name',
			accessor: 'name'
		},
		{
			header: 'No. of days',
			accessor: 'noOfDays'
		},
		{ header: 'Start Date', accessor: (row) => dayjs(row.startDate).format('ddd DD MMM YYYY') },
		{ header: 'End Date', accessor: (row) => dayjs(row.endDate).format('ddd DD MMM YYYY') }

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
		showAdd={false}
		addButtonLabel="Add Child"
		addNewHeading="Add Child"
		updateHeading="Update Child"
		editorComponent
		sideModalSize="sm"
		showModalButtons
		createEntry={create}
		{read}
	/>
</div>
