<script lang="ts" context="module">
	const columns: ITableColumn[] = [
		{
			header: 'Unit Name',
			accessor: (row: IUnit) => row.unitName,
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Directorate ',
			accessor: (row: IUnit) => '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Department ',
			accessor: (row: IUnit) => '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Unit Head',
			accessor: (row: IUnit) => '-',
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
	import type { IUnit } from '$svc/setup';
	import Editor from './editor.svelte';

	export let tableDataInfo: ITableDataProps<any> | undefined;
	export let directorates: any;
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
	showActions
	showEdit
	pageUrl="/applicationsetup/units"
	optionalData={{ directorates }}
/>
