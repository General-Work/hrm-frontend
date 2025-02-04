<script lang="ts" context="module">
	const columns: ITableColumn[] = [
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
			header: 'Unit',
			accessor: (row) => (row.unit ? row.unit.name : '-'),
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Category ',
			accessor: (row) => row.category.name,
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Specialty ',
			accessor: (row) => row.specialty.name,
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Established Norm',
			accessor: (row) => row.norm
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
	addButtonLabel="New Record"
	addNewHeading="New Record"
	updateHeading="Update Record"
	sideModalSize="sm"
	showModalButtons
	fillSpace={false}
/>
