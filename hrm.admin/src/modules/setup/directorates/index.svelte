<script lang="ts" context="module">
	const columns: ITableColumn[] = [
		{
			header: 'Directorate Name',
			accessor: 'directorateName',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Director Name',
			accessor: (row: IDirectorate) =>
				row.director && row.director?.directorName ? row.director?.directorName : '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Deputy director name',
			accessor: (row: IDirectorate) =>
				row.depDirector && row.depDirector?.directorName ? row.depDirector?.directorName : '-',
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
	import type { IDirectorate } from '$svc/setup';
	import Editor from './editor.svelte';

	export let tableDataInfo: ITableDataProps<any> | undefined;
</script>

<DatatablePage
	tableColumns={columns}
	{tableDataInfo}
	editorComponent={Editor}
	showEditorIn="side-modal"
	addButtonLabel="New Directorate"
	addNewHeading="New Directorate"
	updateHeading="Update Directorate"
	sideModalSize="sm"
	showModalButtons
	pageUrl="/applicationsetup/directorate"
	showActions
	showEdit
	fillSpace={false}
/>
