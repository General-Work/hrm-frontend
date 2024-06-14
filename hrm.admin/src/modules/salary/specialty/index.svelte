<script lang="ts" context="module">
	import type { ITableColumn } from '$cmps/ui/table.svelte';

	const columns: ITableColumn[] = [
		{
			header: 'Name',
			accessor: 'specialityName'
		}
		// { header: 'Category', accessor: (row:ISpecialty) =>  row.}
	];
</script>

<script lang="ts">
	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import Editor from './editor.svelte';
	import type { ITableDataProps } from '$lib/types';
	// import type { ISpecialty } from '$svc/salaries/specialty';
	// import type { ICategory } from '$svc/salaries';

	export let tableDataInfo: ITableDataProps<any> | undefined;
	export let category: any;
</script>

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
	showActions
	showEdit
	fillSpace={false}
	pageUrl="/salarysetup/specialty"
	optionalData={{ category }}
/>
