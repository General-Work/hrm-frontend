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

	const fetchDataForTable = async (pageNumber: number, pageSize: number, filters: TableFilter) => {
		// console.log({ pageNumber, pageSize, filters });

		return await readUnits({
			pageNumber: pageNumber,
			pageSize: pageSize,
			search: filters.search || ''
		});
	};

	const update = async (params: any) => {
		const id = params.id;
		delete params.id;
		return updateUnit(id, params);
	};
</script>

<script lang="ts">
	import DatatablePage, { type TableFilter } from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import { postUnit, readUnits, updateUnit, type IUnit } from '$svc/setup';
	import Editor from './editor.svelte';
</script>

<DatatablePage
	tableColumns={columns}
	editorComponent={Editor}
	showEditorIn="side-modal"
	addButtonLabel="New Unit"
	addNewHeading="New Unit"
	updateHeading="Update Unit"
	sideModalSize="sm"
	showModalButtons
	showActions
	showEdit
	fillSpace={false}
	read={fetchDataForTable}
	createEntry={postUnit}
	updateEntry={update}
/>
