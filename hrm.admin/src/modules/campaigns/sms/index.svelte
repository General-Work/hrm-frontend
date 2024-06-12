<script lang="ts" context="module">
	import type { ITableColumn } from '$cmps/ui/table.svelte';

	// id: string;
	// createdAt: Date;
	// updatedAt: Date;
	// campaignName: string;
	// smsTemplateId: string;
	// message: string;
	// receipients: number;
	// smsTemplate: null | any;
	// smsReceipients: null | any;
	const columns: ITableColumn[] = [
		{
			header: 'Name',
			accessor: 'campaignName',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'No. of Runs',
			accessor: 'numberOfRuns',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Frequency',
			accessor: 'frequency',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Start Date',
			accessor: (row) => dayjs(row.startDate).format('ddd DD MMM, YYYY'),
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'End Date',
			accessor: (row) => dayjs(row.startDate).format('ddd DD MMM, YYYY'),
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Time',
			accessor: (row) => dayjs(row.time).format('hh:mm A'),
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Status',
			accessor: 'status',
			plugins: {
				sort: { disable: true }
			}
		}
	];
</script>

<script lang="ts">
	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import Editor from './editor.svelte';
	import type { ITableDataProps } from '$lib/types';
	import dayjs from 'dayjs';
	export let tableDataInfo: ITableDataProps<any> | undefined;
	export let templates: any;
</script>

<div>
	<DatatablePage
		{tableDataInfo}
		tableColumns={columns}
		showEditorIn="side-modal"
		addButtonLabel="New Campaign"
		addNewHeading="New Campaign"
		updateHeading="Update Campaign"
		editorComponent={Editor}
		sideModalSize="lg"
		pageUrl="/campaigns"
		optionalData={{ templates }}
		isFormData
		showModalButtons={false}
		take={17}
		height={700}
	/>
</div>
