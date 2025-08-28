<script lang="ts" context="module">
	export interface IInterviewPanelist extends IStaffByID {
		score?: number[];
	}

	export interface IInterviewCandidate extends IStaffByID {
		interviewStatus: 'PENDING' | 'COMPLETED';
		passPoint: number;
	}
	export interface IInterview {
		id: string;
		type: { id: string; name: string };
		startDate: Date;
		endDate: Date;
		panelMembers: IInterviewPanelist[];
		candidates: IStaffByID[];
		active: boolean;
		name: string;
		department: IDepartment;
	}

	export interface IInterviewDetail extends IInterview {
		passPoint: number;
	}

	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import type { IActionList, ITableColumn } from '$cmps/ui/table.svelte';

	const columns: ITableColumn[] = [
		{
			header: 'Type',
			accessor: (row: IInterview) => row.type.name ?? '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Name',
			accessor: (row: IInterview) => row.name ?? '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Start Date',
			accessor: (row: IInterview) => dayjs(row.startDate).format('ddd DD MMM, YYYY'),
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'End Date',
			accessor: (row: IInterview) => dayjs(row.endDate).format('ddd DD MMM, YYYY'),
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Department',
			accessor: (row: IInterview) => row.department.departmentName,
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Candidates',
			accessor: (row: IInterview) => row.candidates.length,
			plugins: {
				sort: { disable: true }
			}
		}
		// {
		// 	header: 'Panelists',
		// 	accessor: (row: IInterview) => row.panelMembers.length,
		// 	plugins: {
		// 		sort: { disable: true }
		// 	}
		// }
	];

	async function load() {
		const res = {
			success: true,
			message: '',
			status: 200,
			data: {
				totalCount: 5,
				totalPages: 1,
				currentPage: 1,
				pageSize: 17,
				nextPageUrl: null,
				previousPageUrl: null,
				links: [],
				path: 'http://hrm-backend-vsa.fly.dev/api/staff/all?pageNumber=1&pageSize=17&search=&sort=updatedAt_desc',
				data: mockInterviews
			}
		};

		return generateDataTableProps(res.data);
	}
</script>

<script lang="ts">
	import GenerateLink from '$cmps/ui/GenerateLink.svelte';
	import Modal from '$cmps/ui/modal.svelte';
	import type { IStaffByID, ITableDataProps } from '$lib/types';
	import type { IDepartment } from '$svc/setup';
	import dayjs from 'dayjs';
	import { mockInterviews } from '$routes/(private)/(main)/interviews/interviewData';
	import { generateDataTableProps } from '$lib/utils';

	const actionLists: IActionList[] = [
		{ name: 'View Detail', icon: 'solar:eye-bold-duotone' },
		{ name: 'Generate Link', icon: 'tabler:qrcode' }
	];
	let showLink = false;
	let selectedItem: IInterview | null = null;

	function actionClicked({ detail }: CustomEvent) {
		console.log({ detail });
		const { name, row } = detail;
		switch (name) {
			case actionLists[1].name:
				showLink = true;
				selectedItem = row;
				break;

			default:
				break;
		}
	}
</script>

<DatatablePage
	tableColumns={columns}
	showAdd={false}
	{actionLists}
	editorComponent={{}}
	sideModalSize="lg"
	showModalButtons={false}
	take={17}
	height={700}
	fillSpace={false}
	showActions
	on:actionClicked={actionClicked}
	read={load}
/>

<Modal
	open={showLink}
	title="Generated Link"
	on:close={() => {
		showLink = false;
		selectedItem = null;
	}}
>
	<GenerateLink
		route={`/interview-session?q=${selectedItem ? encodeURIComponent(selectedItem.id) : ''}`}
	/>
</Modal>
