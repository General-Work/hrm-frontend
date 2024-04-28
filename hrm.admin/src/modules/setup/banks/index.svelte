<script lang="ts" context="module">
	const columns: ITableColumn[] = [
		{
			header: 'Name',
			accessor: 'bankName',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Created At',
			accessor: (row: IBank) => dayjs(row.createdAt).format('ddd DD MMM, YYYY'),
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
	import type { IBank } from '$svc/setup';
	import dayjs from 'dayjs';
	import Editor from './editor.svelte';

	export let tableDataInfo: ITableDataProps<any> | undefined;
</script>

<DatatablePage
	tableColumns={columns}
	{tableDataInfo}
	editorComponent={Editor}
	showEditorIn="side-modal"
	addButtonLabel="New Bank"
	addNewHeading="New Bank"
	updateHeading="Update Bank"
	sideModalSize="sm"
	showModalButtons
	pageUrl="/applicationsetup/banks"
	showActions
	showEdit
/>
