<script lang="ts" context="module">
	const columns: ITableColumn[] = [
		{
			header: 'Name',
			accessor: 'name',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Created At',
			accessor: (row: IProfessionalBody) => dayjs(row.createdAt).format('ddd DD MMM, YYYY'),
			plugins: {
				sort: { disable: true }
			}
		}
	];
	const fetchDataForTable = async (pageNumber: number, pageSize: number, filters: TableFilter) => {
		// console.log({ pageNumber, pageSize, filters });

		return await readProfessionalBodies({
			pageNumber: pageNumber,
			pageSize: pageSize,
			search: filters.search || ''
		});
	};

	const update = async (params: any) => {
		// console.log(params);
		return await updateProfessionalBody(params.id, params.name);
	};

	const create = async (params: any) => {
		// console.log(params);
		return postProfessionalBody(params.name);
	};
</script>

<script lang="ts">
	import DatatablePage, { type TableFilter } from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import {
		postProfessionalBody,
		readProfessionalBodies,
		updateProfessionalBody,
		type IProfessionalBody
	} from '$svc/setup';
	import dayjs from 'dayjs';
	import Editor from './editor.svelte';
</script>

<DatatablePage
	tableColumns={columns}
	editorComponent={Editor}
	showEditorIn="side-modal"
	addButtonLabel="New Professional Body"
	addNewHeading="New Professional Body"
	updateHeading="Update Professional Body"
	sideModalSize="sm"
	showModalButtons
	fillSpace={false}
	createEntry={create}
	read={fetchDataForTable}
	updateEntry={update}
	showActions
	showEdit
/>
