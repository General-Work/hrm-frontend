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
			header: 'Name',
			accessor: 'name'
		},
		{ header: 'Date of Birth', accessor: (row) => dayjs(row.dob).format('DD-MM-YYYY') },
		{ header: 'Gender', accessor: 'gender' }
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
		addButtonLabel="Add Child"
		addNewHeading="Add Child"
		updateHeading="Update Child"
		editorComponent={Editor}
		sideModalSize="sm"
		showModalButtons
		createEntry={create}
		{read}
	/>
</div>
