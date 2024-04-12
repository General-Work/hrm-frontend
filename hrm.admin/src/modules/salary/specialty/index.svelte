<script lang="ts" context="module">
	import type { ITableColumn } from '$cmps/ui/table.svelte';

	const columns: ITableColumn[] = [
		{
			header: '#',
			accessor: 'id'
		},
		{
			header: 'Name',
			accessor: 'name'
		},
		{ header: 'Category', accessor: (row) => row.category.name }
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

	export let tableDataInfo: ITableDataProps<any> | undefined;
</script>

<div>
	<DatatablePage
		{tableDataInfo}
		tableColumns={columns}
		showEditorIn="side-modal"
		addButtonLabel="New Specialty"
		addNewHeading="New Specialty"
		updateHeading="Update Specialty"
		editorComponent={Editor}
		sideModalSize="sm"
		showModalButtons
		createEntry={create}
		{read}
	/>
</div>
