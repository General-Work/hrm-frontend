<script lang="ts" context="module">
	import type { ITableColumn } from '$cmps/ui/table.svelte';

	const columns: ITableColumn[] = [
		{
			header: 'Staff ID',
			accessor: 'staffId',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Name',
			accessor: 'name',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Email',
			accessor: 'email',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Role',
			accessor: (row) => row.role.name,
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Department',
			accessor: (row) => row.department.name,
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Unit',
			accessor: (row) => row.unit.name,
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
	import Box from '$cmps/ui/box.svelte';

	export let tableDataInfo: ITableDataProps<any> | undefined;
</script>

<Box bgWhite otherClasses="p-4 mt-4" rounded>
	<DatatablePage
		{tableDataInfo}
		tableColumns={columns}
		showEditorIn="side-modal"
		addButtonLabel="New User"
		addNewHeading="New User"
		updateHeading="Update User"
		editorComponent={Editor}
		sideModalSize="md"
		showModalButtons
		createEntry={create}
		{read}
	/>
</Box>
