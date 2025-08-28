<script lang="ts" context="module">
	import type { ITableColumn } from '$cmps/ui/table.svelte';

	const columns: ITableColumn[] = [
		{
			header: 'Name',
			accessor: 'gradeName'
		},
		{
			header: 'Level',
			accessor: 'level'
		},
		{
			header: 'Scale',
			accessor: 'scale'
		}
	];

	const fetchDataForTable = async (pageNumber: number, pageSize: number, filters: TableFilter) => {
		return await readGrades({
			pageNumber: pageNumber,
			pageSize: pageSize,
			search: filters.search || ''
		});
	};

	const create = async (params: any) => {
		// console.log(params);
		return await postGrade({
			categoryId: params.categoryId,
			gradeName: params.grade,
			level: params.level,
			scale: params.scale,
			marketPremium: params.marketPremium,
			minimunStep: params.minimumStep,
			maximumStep: params.maximumStep
		});
	};
</script>

<script lang="ts">
	import DatatablePage, { refetchDatatable, type TableFilter } from '$cmps/ui/datatablePage.svelte';
	import Editor, { type IGradeDto } from './editor.svelte';
	import Modal from '$cmps/ui/modal.svelte';
	import SalaryEditor from './salaryEditor.svelte';
	import { postGrade, readGrades } from '$svc/salaries';

	let showModal = false;
	let formData: IGradeDto = {
		category: 0,
		grade: '',
		scale: '',
		level: '',
		high: '',
		marketPremium: 0,
		minimumStep: 1,
		maximumStep: 4
	};
	let gradeId = '';
	function afterAction({ detail }: any) {
		const { values, data } = detail;
		// console.log(data)
		formData = values;
		gradeId = data;
		showModal = true;
	}
</script>

<DatatablePage
	tableColumns={columns}
	showEditorIn="side-modal"
	addButtonLabel="New Grade"
	addNewHeading="New Grade"
	updateHeading="Update Grade"
	editorComponent={Editor}
	sideModalSize="md"
	showModalButtons
	allowDispatchAfterAction
	allowLoadAfterCreate={false}
	on:afterAction={afterAction}
	fillSpace={false}
	read={fetchDataForTable}
	createEntry={create}
/>
<Modal open={showModal} dismissable={false} size="lg" title="Salaries for {formData.grade}">
	<SalaryEditor
		values={formData}
		{gradeId}
		on:close={() => {
			showModal = false;
			// reloadData = true;
			formData = {
				category: 0,
				grade: '',
				scale: '',
				level: '',
				high: '',
				marketPremium: 0,
				minimumStep: 0,
				maximumStep: 0
			};
			gradeId = '';
			refetchDatatable();
		}}
	/>
</Modal>
