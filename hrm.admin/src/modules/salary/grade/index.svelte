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
</script>

<script lang="ts">
	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import Editor, { type IGradeDto } from './editor.svelte';
	import axios from 'axios';
	import type { ITableDataProps } from '$lib/types';
	import Modal from '$cmps/ui/modal.svelte';
	import SalaryEditor from './salaryEditor.svelte';

	export let tableDataInfo: ITableDataProps<any> | undefined;
	export let category: any;

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
	let reloadData = false;
	function afterAction({ detail }: any) {
		const { values, data } = detail;
		// console.log(data)
		formData = values;
		gradeId = data;
		showModal = true;
	}
</script>

<div>
	<DatatablePage
		{tableDataInfo}
		tableColumns={columns}
		showEditorIn="side-modal"
		addButtonLabel="New Grade"
		addNewHeading="New Grade"
		updateHeading="Update Grade"
		editorComponent={Editor}
		sideModalSize="md"
		showModalButtons
		pageUrl="/salarysetup/grade"
		allowDispatchAfterAction
		allowLoadAfterCreate={false}
		on:afterAction={afterAction}
		optionalData={{ category }}
		{reloadData}
	/>
</div>
<Modal open={showModal} dismissable={false} size="lg" title="Salaries for {formData.grade}">
	<SalaryEditor
		values={formData}
		{gradeId}
		on:close={() => {
			showModal = false;
			reloadData = true;
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
		}}
	/>
</Modal>
