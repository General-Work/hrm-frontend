<script lang="ts" context="module">
	const columns: ITableColumn[] = [
		{
			header: 'Staff ID',
			accessor: (row: IStaffByID) => row.staffIdentificationNumber ?? '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Staff Name',
			accessor: (row: IStaffByID) =>
				`${row.title} ${row.firstName} ${row.lastName} ${row.otherNames ?? ''}`,
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Phone',
			accessor: (row: IStaffByID) => row.phone ?? '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Grade',
			accessor: (row: IStaffByID) => row?.currentAppointment?.grade?.gradeName ?? '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Department',
			accessor: (row: IStaffByID) => row?.department?.departmentName ?? '-',
			plugins: {
				sort: { disable: true }
			}
		},
		{
			header: 'Promotion Type',
			accessor: (row: IStaffByID) => row?.promotionType ?? '-',
			plugins: {
				sort: { disable: true }
			}
		}
	];
</script>

<script lang="ts">
	import SideModal from '$cmps/layout/sideModal.svelte';
	import Button from '$cmps/ui/button.svelte';
	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import type { ITableColumn } from '$cmps/ui/table.svelte';
	import type { IStaffByID, ITableDataProps } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import DispatchAlert from './DispatchAlert.svelte';
	import { showInfo } from '$lib/utils';

	export let tableDataInfo: ITableDataProps<any> | undefined;

	let selectedStaff: IStaffByID[] = [];
	let openModal = false;
	let isValid = false;
	let editor: any;
	let selectAllChecked = false;
	function handleCheckbox({ detail }: CustomEvent) {
		selectedStaff = detail;
	}

	const dispatch = createEventDispatcher();

	function closeModal() {
		openModal = false;
	}

	function submit(entry: any) {
		const { values } = entry;
		console.log({ values, selectedStaff });
		selectedStaff = [];
		selectAllChecked = false;
		closeModal();
		showInfo('Alert sent successfully');
	}
</script>

<div class="w-full h-full">
	<DatatablePage
		{tableDataInfo}
		tableColumns={columns}
		showAdd={false}
		showCheckBox
		editorComponent={{}}
		sideModalSize="lg"
		pageUrl="/campaigns"
		showModalButtons={false}
		take={17}
		height={700}
		fillSpace={false}
		on:handleCheckbox={handleCheckbox}
		selectedRows={selectedStaff}
		rowClickable
		bind:selectAllChecked
		on:view={({ detail }) => dispatch('addTab', detail)}
	>
		<div slot="customHeaderActions">
			<Button
				label="Dispatch Alerts"
				trailingIcon="mingcute:send-fill"
				color="primary"
				type="button"
				disabled={Boolean(selectedStaff.length === 0)}
				on:click={() => (openModal = true)}
			/>
		</div>
	</DatatablePage>
</div>

<SideModal
	open={openModal}
	title="Dispatch Alert"
	size="lg"
	on:close={closeModal}
	showModalButtons
	{isValid}
	on:submit={() => editor.submit()}
>
	<DispatchAlert
		selectedItems={selectedStaff}
		bind:isValid
		bind:this={editor}
		on:removeItem={({ detail }) => {
			selectedStaff = selectedStaff.filter((x) => x.id !== detail.id);
		}}
		on:submit={(e) => submit(e.detail)}
	/>
</SideModal>
