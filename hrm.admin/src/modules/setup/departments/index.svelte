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

	const fetchDataForTable = async (pageNumber: number, pageSize: number, filters: TableFilter) => {
		// console.log({ pageNumber, pageSize, filters });

		return await readDepartments({
			pageNumber: pageNumber,
			pageSize: pageSize,
			search: filters.search || ''
		});
	};

	const update = async (params: any) => {
		const id = params.id;
		delete params.id;
		return updateDepartment(id, params);
	};
</script>

<script lang="ts">
	import DatatablePage, { type TableFilter } from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import {
		postDepartment,
		readDepartments,
		updateDepartment,
		type IDepartment,
		type IDirectorate
	} from '$svc/setup';
	import Editor from './editor.svelte';
</script>

<DatatablePage
	tableColumns={columns}
	editorComponent={Editor}
	showEditorIn="side-modal"
	addButtonLabel="New Department"
	addNewHeading="New Department"
	updateHeading="Update Department"
	sideModalSize="sm"
	showModalButtons
	showActions
	showEdit
	fillSpace={false}
	read={fetchDataForTable}
	createEntry={postDepartment}
	updateEntry={update}
/>
