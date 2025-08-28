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

	const fetchDataForTable = async (pageNumber: number, pageSize: number, filters: TableFilter) => {
		return await readCategories({
			pageNumber: pageNumber,
			pageSize: pageSize,
			search: filters.search || ''
		});
	};

	const update = async (params: any) => {
		const id = params.id;
		delete params.id;
		return updateCategory(id, params);
	};
</script>

<script lang="ts">
	import DatatablePage, { type TableFilter } from '$cmps/ui/datatablePage.svelte';
	import Editor from './editor.svelte';
	import dayjs from 'dayjs';
	import { postCategory, readCategories, updateCategory, type ICategory } from '$svc/salaries';
</script>

<DatatablePage
	tableColumns={columns}
	showEditorIn="side-modal"
	addButtonLabel="New Category"
	addNewHeading="New Category"
	updateHeading="Update Category"
	editorComponent={Editor}
	sideModalSize="sm"
	showModalButtons
	showActions
	fillSpace={false}
	showEdit
	updateEntry={update}
	read={fetchDataForTable}
	createEntry={postCategory}
/>
