<script lang="ts" context="module">
	import type { ITableColumn } from '$cmps/ui/table.svelte';

	const columns: ITableColumn[] = [
		{
			header: '#',
			accessor: 'id'
		},
		{
			header: 'Name',
			accessor: 'name'
		},
		{ header: 'Category', accessor: (row) => row.category.name },
		{
			header: 'Band',
			accessor: 'band'
		},
		{
			header: 'Scale',
			accessor: 'scale'
		}
	];

	export async function create(data: any) {
		return {
			data: { success: true }
		};
	}

	export async function read() {
		// return await axios.get('/usermanagement');
	}
</script>

<script lang="ts">
	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import Editor, { type IGradeDto } from './editor.svelte';
	import axios from 'axios';
	import type { ITableDataProps } from '$lib/types';
	import Modal from '$cmps/ui/modal.svelte';
	import SalaryEditor from './salaryEditor.svelte';

	export let tableDataInfo: ITableDataProps<any> | undefined;

	let showModal = false;
	let formData: IGradeDto = {
		category: 0,
		grade: '',
		scale: '',
		level: '',
		high: '',
		marketPremium: 0,
		minimumStep: 0,
		maximumStep: 0
	};

	function afterAction({ detail }: any) {
		const { values } = detail;
		formData = values;
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
		createEntry={create}
		{read}
		allowDispatchAfterAction
		allowLoadAfterCreate={false}
		on:afterAction={afterAction}
	/>
</div>
<Modal open={showModal} dismissable={false} size="md" title="Salaries for {formData.grade}">
	<SalaryEditor
		values={formData}
		on:close={() => {
			showModal = false;
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
		}}
	/>
</Modal>
