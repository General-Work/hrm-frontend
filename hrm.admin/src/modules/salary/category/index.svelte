<script lang="ts" context="module">
	import type { ITableColumn } from '$cmps/ui/table.svelte';

	const columns: ITableColumn[] = [
		{
			header: 'Name',
			accessor: 'categoryName',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Created At',
			accessor: (row: ICategory) => dayjs(row.createdAt).format('ddd DD MMM, YYYY'),
			plugins: {
				sort: { disable: true }
			}
		}
	];
</script>

<script lang="ts">
	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import Editor from './editor.svelte';
	import type { ITableDataProps } from '$lib/types';
	import dayjs from 'dayjs';
	import type { ICategory } from '$svc/salaries';

	export let tableDataInfo: ITableDataProps<any> | undefined;
</script>

<DatatablePage
	{tableDataInfo}
	tableColumns={columns}
	showEditorIn="side-modal"
	addButtonLabel="New Category"
	addNewHeading="New Category"
	updateHeading="Update Category"
	editorComponent={Editor}
	sideModalSize="sm"
	showModalButtons
	pageUrl="/salarysetup/category"
	showActions
	fillSpace={false}
	showEdit
/>
