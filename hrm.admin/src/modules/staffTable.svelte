<script lang="ts" context="module">
	const tableColumns: ITableColumn[] = [
		{
			header: 'Staff ID',
			accessor: (row: IStaff) => row.staffIdentificationNumber ?? '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Staff Name',
			accessor: (row: IStaff) =>
				`${row.title} ${row.firstName} ${row.lastName} ${row.otherNames ?? ''}` ?? '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Phone',
			accessor: (row: IStaff) => row.phone ?? '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Email',
			accessor: (row: IStaff) => row.email ?? '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Status',
			accessor: (row: IStaff) => row.status ?? '-',
			plugins: {
				sort: { disable: true }
			}
		}
	];

	const fetchDataForTable = async (pageNumber: number, pageSize: number, filters: TableFilter) => {
		// console.log({ pageNumber, pageSize, filters });

		return await readStaffs({
			pageNumber: pageNumber,
			pageSize: pageSize,
			search: filters.search || ''
		});
	};

	const create = async (params: any) => {
		return createStaff({
			...params,
			dateOfBirth: dayjs(params.dateOfBirth).format('YYYY-MM-DD')
		});
	};
</script>

<script lang="ts">
	import DatatablePage, { type TableFilter } from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import type { IStaff } from '$lib/types';
	import { createStaff, readStaffs } from '$svc/staff';
	import { createEventDispatcher } from 'svelte';
	import NewStaff from './staffrecords/newStaff.svelte';
	import dayjs from 'dayjs';

	export let showAdd = false;

	// export let searchParam = '';
	// export let requestTypes: any[] = [];
	// export let currentRequest: any = {};

	// let reloadData = false;

	const dispatch = createEventDispatcher();
</script>

<DatatablePage
	showIndex
	{tableColumns}
	editorComponent={NewStaff}
	fillSpace={false}
	{showAdd}
	showTopActionsBackground={true}
	rowClickable
	searchPlaceholder="Search..."
	addButtonLabel="New Staff"
	addNewHeading="New Staff"
	sideModalSize="lg"
	showModalButtons
	read={fetchDataForTable}
	createEntry={create}
	on:view={({ detail }) => {
		dispatch('addTab', detail);

		// goto(`/staffrecords/${detail.staffIdentificationNumber}`);
		// if (searchParam) {
		// 	goto(
		// 		`/staffrequests/${detail.id}?q=${searchParam}&type=${detail.requestType}&status=${detail.status}&polymorphicId=${detail.requestDetailPolymorphicId}&staffId=${detail.requestFromStaff ? detail.requestFromStaff.staffIdentificationNumber : ''}`
		// 	);
		// } else {
		// 	goto(
		// 		`/staffrequests/${detail.id}?type=${detail.requestType}&status=${detail.status}&polymorphicId=${detail.requestDetailPolymorphicId}&staffId=${detail.requestFromStaff ? detail.requestFromStaff.staffIdentificationNumber : ''}`
		// 	);
		// }
	}}
/>
