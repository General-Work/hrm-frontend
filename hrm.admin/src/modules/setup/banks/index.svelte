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

	const fetchDataForTable = async (pageNumber: number, pageSize: number, filters: TableFilter) => {
		// console.log({ pageNumber, pageSize, filters });

		return await readBanks({
			pageNumber: pageNumber,
			pageSize: pageSize,
			search: filters.search || ''
		});
	};

	const update = async (params: any) => {
		return updateBank(params.id, params.bankName);
	};

	const create = async (params: any) => {
		return postBank(params.bankName);
	};
</script>

<script lang="ts">
	import DatatablePage, { type TableFilter } from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import { postBank, readBanks, updateBank, type IBank } from '$svc/setup';
	import dayjs from 'dayjs';
	import Editor from './editor.svelte';
</script>

<DatatablePage
	tableColumns={columns}
	editorComponent={Editor}
	showEditorIn="side-modal"
	addButtonLabel="New Bank"
	addNewHeading="New Bank"
	updateHeading="Update Bank"
	sideModalSize="sm"
	showModalButtons
	showActions
	showEdit
	fillSpace={false}
	read={fetchDataForTable}
	updateEntry={update}
	createEntry={create}
/>
