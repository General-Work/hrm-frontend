<script lang="ts" context="module">
	const columns: ITableColumn[] = [
		{
			header: 'Unit Name',
			accessor: 'name',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Directorate ',
			accessor: (row) => row.directorate.name,
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Department ',
			accessor: (row) => row.department.name,
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Unit Head',
			accessor: (row) => (row.head ? row.head.name : '-'),
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
	addButtonLabel="New Unit"
	addNewHeading="New Unit"
	updateHeading="Update Unit"
	sideModalSize="sm"
	showModalButtons
	createEntry={create}
	{read}
/>
