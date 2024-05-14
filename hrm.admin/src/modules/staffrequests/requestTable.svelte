<script lang="ts" context="module">
	const tableColumns: ITableColumn[] = [
		// {
		// 	header: 'ID',
		// 	id: 'id',
		// 	accessor: (row: any) => `00000${row.id}`.slice(-9)
		// },
		{
			header: 'Request Type',
			accessor: (row: IRequest) => row.requestType.toLocaleUpperCase() ?? '',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Staff ID',
			// id: 'member.staffNumber',
			accessor: (row: IRequest) => row.requestFromStaffId ?? '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Staff Name',
			// id: 'memberId',
			accessor: (row: IRequest) =>
				row.requestFromStaff
					? `${row.requestFromStaff.firstName} ${row.requestFromStaff.otherNames ?? ''} ${row.requestFromStaff.lastName}`
					: '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Request Date',
			// id: 'createdOn',
			accessor: (row: IRequest) => dayjs(row.createdAt).format('DD-MMM-YYYY') ?? '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Status',
			// id: 'status',
			accessor: (row: any) => row.status ?? '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Assigned To',
			// id: 'assignedToId',
			accessor: (row: IRequest) =>
				row.requestAssignedStaff
					? `${row.requestAssignedStaff.firstName} ${row.requestAssignedStaff.otherNames ?? ''} ${row.requestAssignedStaff.lastName}`
					: '_',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Last Updated At',
			// id: 'updatedOn',
			plugins: {
				sort: { disable: true }
			},
			accessor: (row: IRequest) => dayjs(row.updatedAt).format('DD-MMM-YYYY') ?? '-'
		}
	];
</script>

<script lang="ts">
	import { goto } from '$app/navigation';

	import Box from '$cmps/ui/box.svelte';

	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import Table from '$cmps/ui/table.svelte';
	import TableFilters from '$cmps/ui/tableFilters.svelte';
	import type { ITableDataProps } from '$lib/types';
	import type { IRequest } from '$svc/staffrequests';
	import dayjs from 'dayjs';

	export let tableDataInfo: ITableDataProps<any> | undefined | null;
	export let searchParam = '';
	export let requestTypes: any[] = [];
	export let currentRequest: any = {};

	let reloadData = false;
	let filters = {
		startDate: '',
		endDate: '',
		requestType: '',
		remember: false
	};

	function handleFilter({ detail }: any) {
		const { values } = detail;
		let startDate = '';
		let endDate = '';
		if (values.dateRange) {
			var tokens =
				values.dateRange && values.dateRange.includes('to') && values.dateRange.split(' to ');
			if (tokens.length === 2) {
				startDate = tokens[0];
				endDate = tokens[1];
			}
		}
		filters = {
			startDate,
			endDate,
			remember: values.remember,
			requestType: values.requestType
		};
		reloadData = true;
	}

	function resetForm() {
		filters = {
			startDate: '',
			endDate: '',
			requestType: '',
			remember: false
		};
		reloadData = true;
	}
</script>

<Box bgWhite otherClasses="p-4 mt-4" rounded>
	<!-- <Table {tableColumns} data={[]} headerColor="sky" /> -->
	<DatatablePage
		showIndex
		{tableColumns}
		{tableDataInfo}
		editorComponent={{}}
		showAdd={false}
		rowClickable
		bind:reloadData
		searchPlaceholder="Staff Number..."
		pageUrl={`/staffrequests?requestType=${filters.requestType}&&startDate=${filters.startDate}&&endDate=${filters.endDate}`}
		on:view={({ detail }) => {
			if (searchParam) {
				goto(
					`/staffrequests/${detail.requestDetailPolymorphicId}?q=${searchParam}&&type=${detail.requestType}`
				);
			} else {
				goto(`/staffrequests/${detail.requestDetailPolymorphicId}?type=${detail.requestType}`);
			}
		}}
	>
		<div slot="filters">
			<TableFilters {requestTypes} {currentRequest} on:submit={handleFilter} on:click={resetForm} />
		</div>
	</DatatablePage>
</Box>
