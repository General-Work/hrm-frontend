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

	const fetchDataForTable = async (pageNumber: number, pageSize: number, filters: TableFilter) => {
		// console.log({ pageNumber, pageSize, filters });

		return await readDirectorates({
			pageNumber: pageNumber,
			pageSize: pageSize,
			search: filters.search || ''
		});
	};

	const update = async (params: any) => {
		const id = params.id;
		delete params.id;
		return updateDirectorate(id, params);
	};
</script>

<script lang="ts">
	import DatatablePage, { type TableFilter } from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	// import type { ITableDataProps } from '$lib/types';
	import {
		postDirectorate,
		readDirectorates,
		updateDirectorate,
		type IDirectorate
	} from '$svc/setup';
	import Editor from './editor.svelte';
</script>

<DatatablePage
	tableColumns={columns}
	editorComponent={Editor}
	showEditorIn="side-modal"
	addButtonLabel="New Directorate"
	addNewHeading="New Directorate"
	updateHeading="Update Directorate"
	sideModalSize="sm"
	showModalButtons
	showActions
	showEdit
	fillSpace={false}
	read={fetchDataForTable}
	createEntry={postDirectorate}
	updateEntry={update}
/>
