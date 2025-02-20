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
</script>

<script lang="ts">
	import { goto } from '$app/navigation';

	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import type { IStaff, ITableDataProps } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let tableDataInfo: ITableDataProps<any> | undefined | null;
	// export let searchParam = '';
	// export let requestTypes: any[] = [];
	// export let currentRequest: any = {};

	let reloadData = false;

	const dispatch = createEventDispatcher();
</script>

<DatatablePage
	showIndex
	{tableColumns}
	{tableDataInfo}
	editorComponent={{}}
	fillSpace={false}
	showAdd={false}
	showTopActionsBackground={true}
	rowClickable
	bind:reloadData
	searchPlaceholder="Search..."
	pageUrl={`/staffrecords`}
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
