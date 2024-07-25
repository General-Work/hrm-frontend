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

	export let tableDataInfo: ITableDataProps<IRequest> | undefined | null;
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
			reloadData = true;
		}
	}

	function handleStartDate({ detail }: CustomEvent) {
		if (detail) {
			filters = {
				...filters,
				startDate: dayjs(detail).format('YYYY-MM-DD'),
				endDate: dayjs(dayjs(detail).add(1, 'day').toDate()).format('YYYY-MM-DD')
			};
			reloadData = true;
		}
	}

	function handleEndDate({ detail }: CustomEvent) {
		if (detail) {
			filters = {
				...filters,
				startDate: dayjs(filters.startDate).format('YYYY-MM-DD'),
				endDate: dayjs(dayjs(detail).add(1, 'day').toDate()).format('YYYY-MM-DD')
			};
			reloadData = true;
		}
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

<div class="w-full h-full ">
	<Box bgWhite shadow rounded>
		<!-- <Table {tableColumns} data={[]} headerColor="sky" /> -->
		<DatatablePage
			showIndex
			{tableColumns}
			{tableDataInfo}
			editorComponent={{}}
			fillSpace={false}
			showAdd={false}
			showTopActionsBackground={false}
			height={tableDataInfo?.pageSize && tableDataInfo.pageSize > 15 ? 800 : 730}
			rowClickable
			bind:reloadData
			searchPlaceholder="Staff Number..."
			pageUrl={`/staffrequests?requestType=${filters.requestType}&startDate=${filters.startDate}&endDate=${filters.endDate}`}
			on:view={({ detail }) => {
				if (searchParam) {
					goto(
						`/staffrequests/${detail.id}?q=${searchParam}&type=${detail.requestType}&status=${detail.status}&polymorphicId=${detail.requestDetailPolymorphicId}&staffId=${detail.requestFromStaff ? detail.requestFromStaff.staffIdentificationNumber : ''}`
					);
				} else {
					goto(
						`/staffrequests/${detail.id}?type=${detail.requestType}&status=${detail.status}&polymorphicId=${detail.requestDetailPolymorphicId}&staffId=${detail.requestFromStaff ? detail.requestFromStaff.staffIdentificationNumber : ''}`
					);
				}
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
