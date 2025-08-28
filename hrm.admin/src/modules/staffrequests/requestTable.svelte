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
			accessor: (row: IRequest) =>
				row.requestFromStaff ? `${row.requestFromStaff.staffIdentificationNumber}` : '-',
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
			header: 'Last Updated',
			// id: 'updatedOn',
			plugins: {
				sort: { disable: true }
			},
			accessor: (row: IRequest) => dayjs(row.updatedAt).format('DD-MMM-YYYY') ?? '-'
		}
	];

	const fetchDataForTable = async (pageNumber: number, pageSize: number, filters: TableFilter) => {
		// console.log({ pageNumber, pageSize, filters });

		return await readRequests({
			pageNumber: pageNumber,
			pageSize: pageSize,
			search: filters.search || '',
			startDate: filters.startDate as string,
			endDate: filters.endDate as string,
			requestType: filters.requestType
		});
	};
</script>

<script lang="ts">
	import Box from '$cmps/ui/box.svelte';

	import DatatablePage, { refetchDatatable, type TableFilter } from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import Table from '$cmps/ui/table.svelte';
	import TableFilters from '$cmps/ui/tableFilters.svelte';
	import type { ITableDataProps } from '$lib/types';
	import { generateDataTableProps } from '$lib/utils';
	import { readRequests, type IRequest } from '$svc/staffrequests';
	import dayjs from 'dayjs';
	import { createEventDispatcher } from 'svelte';

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

	const dispatch = createEventDispatcher();

	function handleFilter({ detail }: any) {
		const { values } = detail;
		console.log(values);
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

	function handleTypeChange({ detail }: CustomEvent) {
		if (detail) {
			filters = { ...filters, requestType: detail };
			refetchDatatable({
				requestType: detail
			});
		}
	}

	function handleStartDate({ detail }: CustomEvent) {
		if (detail) {
			filters = {
				...filters,
				startDate: dayjs(detail).format('YYYY-MM-DD'),
				endDate: dayjs(dayjs(detail).add(1, 'day').toDate()).format('YYYY-MM-DD')
			};
			refetchDatatable({
				startDate: filters.startDate,
				endDate: filters.endDate
			});
		}
	}

	function handleEndDate({ detail }: CustomEvent) {
		if (detail) {
			filters = {
				...filters,
				startDate: dayjs(filters.startDate).format('YYYY-MM-DD'),
				endDate: dayjs(dayjs(detail).add(1, 'day').toDate()).format('YYYY-MM-DD')
			};
			refetchDatatable({
				startDate: filters.startDate,
				endDate: filters.endDate
			});
		}
	}

	function resetForm() {
		filters = {
			startDate: '',
			endDate: '',
			requestType: '',
			remember: false
		};
		refetchDatatable();
	}
</script>

<div class="w-full h-full">
	<Box bgWhite shadow rounded>
		<!-- <Table {tableColumns} data={[]} headerColor="sky" /> -->
		<DatatablePage
			showIndex
			{tableColumns}
			editorComponent={{}}
			fillSpace={false}
			showAdd={false}
			showTopActionsBackground={false}
			height={800}
			rowClickable
			read={fetchDataForTable}
			searchPlaceholder="Staff Number..."
			on:view={({ detail }) => {
				dispatch('addTab', detail);
			}}
		>
			<div slot="filters">
				<TableFilters
					{requestTypes}
					{currentRequest}
					on:click={resetForm}
					on:typeChange={handleTypeChange}
					on:startDate={handleStartDate}
					on:endDate={handleEndDate}
				/>
			</div>
		</DatatablePage>
	</Box>
</div>
