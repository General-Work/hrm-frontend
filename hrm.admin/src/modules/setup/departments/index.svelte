<script lang="ts" context="module">
	const columns: ITableColumn[] = [
		{
			header: 'Department Name',
			accessor: 'name',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Directorate Name',
			accessor: (row) => row.directorate.name,
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'HOD Name',
			accessor: (row) => row.hod.name,
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Deputy HOD name',
			accessor: (row) => (row.deputyHod ? row.deputyHod.name : '-'),
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
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import type { ITableDataProps } from '$types/types';
	import Editor from './editor.svelte';

	export let tableDataInfo: ITableDataProps<any> | undefined;
</script>

<DatatablePage
	tableColumns={columns}
	{tableDataInfo}
	editorComponent={Editor}
	showEditorIn="side-modal"
	addButtonLabel="New Department"
	addNewHeading="New Department"
	updateHeading="Update Department"
	sideModalSize="sm"
	showModalButtons
	createEntry={create}
	{read}
/>
