<script lang="ts" context="module">
	import type { ITableColumn } from '$cmps/ui/table.svelte';

	const columns: ITableColumn[] = [
		{
			header: 'Name',
			accessor: 'specialityName'
		}
		// { header: 'Category', accessor: (row:ISpecialty) =>  row.}
	];

	const fetchDataForTable = async (pageNumber: number, pageSize: number, filters: TableFilter) => {
		return await readSpecialties({
			pageNumber: pageNumber,
			pageSize: pageSize,
			search: filters.search || ''
		});
	};

	const update = async (params: any) => {
		return updateSpecialty(params.id, { specialityName: params.name, categoryId: params.category });
	};

	const create = async (params: any) => {
		return postSpecialty({ specialityName: params.name, categoryId: params.category });
	};
</script>

<script lang="ts">
	import DatatablePage, { type TableFilter } from '$cmps/ui/datatablePage.svelte';
	import Editor from './editor.svelte';
	import { postSpecialty, readSpecialties, updateSpecialty } from '$svc/salaries';
</script>

<DatatablePage
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
	createEntry={create}
	updateEntry={update}
	read={fetchDataForTable}
/>
