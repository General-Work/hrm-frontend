<script lang="ts" context="module">
	const columns: ITableColumn[] = [
		{
			header: 'Department Name',
			accessor: 'departmentName',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Directorate Name',
			accessor: (row: IDepartment) => row.directorate || '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'HOD Name',
			accessor: (row: IDepartment) => row.headOfDepartment || '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Deputy HOD name',
			accessor: (row: IDepartment) => row.depHeadOfDepartment ?? '',
			plugins: {
				sort: { disable: true }
			}
		}
	];
</script>

<script lang="ts">
	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import type { ITableDataProps } from '$lib/types';
	import type { IDepartment, IDirectorate } from '$svc/setup';
	import Editor from './editor.svelte';

	export let tableDataInfo: ITableDataProps<any> | undefined;
	export let directorates: any;
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
	pageUrl="/applicationsetup/departments"
	optionalData={{ directorates }}
	showActions
	showEdit
/>
