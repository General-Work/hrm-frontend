<script lang="ts" context="module">
	export interface TableFilter {
		search?: string;
		actions?: { [key: string]: string };
	}
</script>

<script lang="ts">
	import SideModal from '$cmps/layout/sideModal.svelte';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import { PageInfo } from '$lib/paginate';
	import { SvelteComponent, createEventDispatcher, onMount } from 'svelte';
	import Button from './button.svelte';
	import Paginate from './paginate.svelte';
	import TableSearchBox from './tableSearchBox.svelte';
	import Modal, { type IModalSize } from './modal.svelte';
	import DataTable, { type IActionList, type ISortInfo, type ITableColumn } from './table.svelte';
	import { writable } from 'svelte/store';
	import type { ITableDataProps } from '$lib/types';

	export let tableDataInfo: ITableDataProps<any> | undefined;
	export let showEditorIn: 'modal' | 'side-modal' = 'side-modal';
	export let hideSearchBox = false;
	export let searchPlaceholder = 'Search...';
	export let take = 10;
	export let addNewHeading = 'Add New Record';
	export let addButtonLabel = 'Add New';
	export let updateHeading = 'Update';
	export let newRecord: any = {};
	export let sideModalSize: IModalSize = 'sm';
	export let editorComponent: any;
	export let showModalButtons = false;
	export let actionLists: IActionList[] = [];
	export let headerColor: 'green' | 'orange' | 'white' | 'purple' | 'sky' | 'blue' = 'sky';
	export let height = 680;
	export let bgWhite = false;
	export let headerTextColor: 'black' | 'white' | 'gray' = 'black';
	export let tableColumns: ITableColumn[] = [];
	export let hiddenColumns: string[] = [];
	export let selectedRows: any[] = [];
	export let showActions = false;
	export let showMiniWidth = false;
	export let rowClickable = false;
	export let hideWhiteSpace = true;
	export let sortedColumns: ISortInfo[] = [];
	export let initialSortKeys: ISortInfo[] = [];
	export let showIndex = false;
	export let selectAllChecked = false;
	export let showCheckBox = false;
	export let showViewDetails = true;
	export let showEdit = false;
	export let allowDispatchAfterAction = false;
	export let allowLoadAfterCreate = true;
	export let showAdd = true
	export let read = async (skip: number, take: number, defn?: TableFilter) => {
		return <any>[];
	};
	export let createEntry = async (x: any) => {
		showError('Not implemented');
		return <any>null;
	};
	export let updateEntry = async (x: any) => {
		showError('Not implemented');
		return <any>null;
	};

	let showForm = false;
	let query = '';
	let pageInfo = new PageInfo();
	// pageInfo.setPageSize(take);
	let editorHeading = '';
	let activeEntry = <any>{};
	let editing = false;
	let editor: any;
	let isValid = false;
	let busy = false;
	let tableData: any[] = [];
	let updating = false;
	let isLoading = false;

	let allColumns = writable<any>([]);

	const dispatch = createEventDispatcher();

	async function fetchData() {
		try {
			// busy = true;
			startProgress();
			const ret = await read(pageInfo.currentPage, pageInfo.pageSize, {
				search: query
			});
			// console.log(ret)
			if (ret?.data?.success) {
				const xs = ret.data.data;
				pageInfo.totalItems = xs.totalCount;
				pageInfo.setHasNextPage(xs.pageInfo.hasNextPage);
				pageInfo.setHasPrevPage(xs.pageInfo.hasPreviousPage);
				tableData = xs.items;
				// filter(query, inlineFilter, true);
			} else {
				showError(ret?.message || 'Failed to load data');
			}
		} catch (e: any) {
			showError(e.message || e);
			console.log(e);
		} finally {
			// busy = false;
			endProgress();
		}
	}

	async function getMore() {
		if (pageInfo.gotoNext()) await fetchData();
	}
	async function getLess() {
		if (pageInfo.gotoPrev()) await fetchData();
	}

	function addNew() {
		editorHeading = addNewHeading;
		activeEntry = (newRecord && { ...newRecord }) || null;
		editing = false;
		showForm = true;
	}

	function closeSideModal() {
		showForm = false;
	}

	async function save(entry: any) {
		const { values } = entry;
		try {
			isLoading = true;
			startProgress();
			const ret = await createEntry(values);
			if (ret.data.success) {
				showInfo(ret.data.message || 'Successfully added reacord');
				allowLoadAfterCreate && fetchData();
				closeSideModal();
				allowDispatchAfterAction && dispatch('afterAction', { type: 'create', values });
			} else {
				showError(ret.data.message);
			}
		} catch (e: any) {
			showError(e);
		} finally {
			isLoading = false;
			endProgress();
		}
	}

	onMount(async () => {
		if (tableDataInfo) {
			pageInfo.setPageSize(tableDataInfo.pageSize);
			pageInfo.totalItems = tableDataInfo.totalCount;
			pageInfo.setHasNextPage(tableDataInfo.pageInfo.hasNextPage);
			pageInfo.setHasPrevPage(tableDataInfo.pageInfo.hasPreviousPage);
			tableData = tableDataInfo.items ?? [];
		}
	});
</script>

<div class="w-full h-full flex flex-col gap-4">
	<div class="flex flex-col gap-2">
		<div class="flex justify-between">
			<div class:hidden={hideSearchBox} class="flex-grow max-w-md">
				<TableSearchBox placeholder={searchPlaceholder} bind:value={query} />
			</div>
			<div class="flex items-center gap-4">
				<div>
					<Paginate
						onNextPage={getMore}
						onPreviousPage={getLess}
						currentPage={pageInfo.currentPage}
						totalPages={pageInfo.totalPages}
						hasNextPage={pageInfo.hasNextPage}
						hasPreviousPage={pageInfo.hasPrevPage}
						refresh={fetchData}
						tableColumns={$allColumns}
						bind:hiddenColumns
					/>
				</div>
				<div class:hidden={!showAdd}>
					<Button label={addButtonLabel} color="primary" on:click={addNew} />
				</div>
			</div>
		</div>
	</div>
	<DataTable
		{height}
		{headerColor}
		{actionLists}
		data={tableData}
		{bgWhite}
		{headerTextColor}
		{tableColumns}
		{initialSortKeys}
		{showActions}
		{showCheckBox}
		{showViewDetails}
		{showEdit}
		{selectAllChecked}
		{showMiniWidth}
		{rowClickable}
		{hideWhiteSpace}
		{selectedRows}
		{showIndex}
		bind:hiddenColumns
		bind:allColumns
		bind:sortedColumns
		on:cancel
		on:delete
		on:edit
		on:feed
		on:handleCheckbox
		on:view
		on:actionClicked
	/>
</div>

<Modal
	open={showForm && showEditorIn === 'modal'}
	title={editorHeading}
	size={sideModalSize}
	on:close={closeSideModal}
	showModalButtons
	on:submit={() => editor.submit()}
>
	<div>
		<svelte:component
			this={editor}
			recordId={activeEntry.recordId}
			bind:this={editor}
			bind:isValid
			on:submit={(e) => save(e.detail)}
		/>
	</div>
</Modal>

<SideModal
	open={showForm && showEditorIn === 'side-modal'}
	title={editorHeading}
	on:close={closeSideModal}
	size={sideModalSize}
	{showModalButtons}
	{isValid}
	busy={isLoading}
	on:submit={() => editor.submit()}
>
	<svelte:component
		this={editorComponent}
		recordId={activeEntry.recordId}
		bind:this={editor}
		bind:isValid
		on:submit={(e) => save(e.detail)}
	/>
</SideModal>
