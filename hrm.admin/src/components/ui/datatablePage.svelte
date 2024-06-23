<script lang="ts" context="module">
	export interface TableFilter {
		search?: string;
		actions?: { [key: string]: string };
	}
</script>

<script lang="ts">
	import SideModal from '$cmps/layout/sideModal.svelte';
	import {
		endProgress,
		extractQueryParam,
		parseQueryParams,
		showError,
		showInfo,
		startProgress
	} from '$lib/utils';
	import { PageInfo } from '$lib/paginate';
	import { createEventDispatcher, onMount } from 'svelte';
	import debounce from 'lodash/debounce';
	import Button from './button.svelte';
	import Paginate from './paginate.svelte';
	import TableSearchBox from './tableSearchBox.svelte';
	import Modal, { type IModalSize } from './modal.svelte';
	import DataTable, { type IActionList, type ISortInfo, type ITableColumn } from './table.svelte';
	import { writable } from 'svelte/store';
	import type { ITableDataProps } from '$lib/types';
	import axios from 'axios';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let optionalData: any = {};
	export let tableDataInfo: ITableDataProps<any> | undefined | null;
	export let showEditorIn: 'modal' | 'side-modal' = 'side-modal';
	export let hideSearchBox = false;
	export let searchPlaceholder = 'Search...';
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
	export let showViewDetails = false;
	export let showEdit = false;
	export let allowDispatchAfterAction = false;
	export let allowLoadAfterCreate = true;
	export let showAdd = true;
	export let pageUrl = '';
	export let take = 13;
	export let reloadData = false;
	export let isFormData = false;
	export let fillSpace = true;
	export let showTopActionsBackground = true;
	// export let tableActions: IActionList[] = [
	// 	{ icon: 'ri:edit-2-fil', name: 'Edit detail' }
	// 	// { icon: 'ri:edit-2-fil', name: 'Edit detail' }
	// ];
	let showForm = false;
	let oldQuery = '';
	let pageInfo = new PageInfo();
	pageInfo.setPageSize(take);
	let editorHeading = '';
	let activeEntry = <any>{};
	let editing = false;
	let editor: any;
	let isValid = false;
	let tableData: any[] = [];
	let isLoading = false;

	$: ({ searchParams, pathname, search } = $page.url);

	$: filters = {
		search: extractQueryParam(search, 'search') ?? '',
		page: extractQueryParam(search, 'page') ?? ''
	};

	let allColumns = writable<any>([]);

	const dispatch = createEventDispatcher();

	async function fetchData(page: number, search: string) {
		try {
			// busy = true;
			startProgress();

			let baseUrl = pageUrl;
			let params: any = {
				pageNumber: page,
				pageSize: pageInfo.pageSize,
				search: search
			};

			const { baseUrl: parsedBaseUrl, queryParams } = parseQueryParams(pageUrl);
			if (queryParams) {
				baseUrl = parsedBaseUrl;
				params = {
					...queryParams,
					...params
				};
			}

			const ret = await axios.get(baseUrl, { params });

			if (ret?.data?.success) {
				const xs = ret.data.data;
				pageInfo.totalItems = xs.totalCount;
				pageInfo.setHasNextPage(xs.pageInfo.hasNextPage);
				pageInfo.setHasPrevPage(xs.pageInfo.hasPreviousPage);
				tableData = xs.items;
			} else {
				showError(ret?.data.message || 'Failed to load data');
			}
		} catch (e: any) {
			showError(e.message || e);
		} finally {
			// busy = false;
			endProgress();
		}
	}

	async function getMore() {
		if (pageInfo.gotoNext()) {
			const current = new URLSearchParams(Array.from(searchParams.entries()));
			const value = pageInfo.currentPage;

			if (!value) {
				current.delete('page');
			} else {
				current.set('page', String(value));
			}

			const search = current.toString();
			const page = search ? `?${search}` : '';
			await goto(`${pathname}${page}`);
			await fetchData(value, filters.search);
		}
	}

	async function getLess() {
		if (pageInfo.gotoPrev()) {
			const current = new URLSearchParams(Array.from(searchParams.entries()));
			const value = pageInfo.currentPage;

			if (!value) {
				current.delete('page');
			} else {
				current.set('page', String(value));
			}

			const search = current.toString();
			const page = search ? `?${search}` : '';
			await goto(`${pathname}${page}`);
			await fetchData(value, filters.search);
		}
	}

	function addNew() {
		editorHeading = addNewHeading;
		activeEntry = (newRecord && { ...newRecord }) || null;
		editing = false;
		showForm = true;
	}

	function closeSideModal() {
		showForm = false;
		activeEntry = null;
	}

	async function save(entry: any) {
		const { values } = entry;
		try {
			isLoading = true;
			startProgress();

			let axiosConfig = {};
			if (isFormData) {
				axiosConfig = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				};
			}

			const ret = editing
				? await axios.patch(`${pageUrl}`, { ...values, id: activeEntry.id }, axiosConfig)
				: await axios.post(pageUrl, values, axiosConfig);

			if (ret.data.success) {
				const successMessage = allowLoadAfterCreate
					? editing
						? 'Successfully updated record'
						: 'Successfully added record'
					: '';
				showInfo(ret.data.message || successMessage);
				allowLoadAfterCreate && (await fetchData(+filters.page, filters.search));

				allowDispatchAfterAction &&
					dispatch('afterAction', { type: 'create', values, data: ret.data.data });
			} else {
				showError(ret.data.message);
			}
		} catch (e: any) {
			showError(e.message || e);
		} finally {
			isLoading = false;
			endProgress();
		}
	}

	function handleEdit({ detail }: any) {
		activeEntry = detail;
		editorHeading = updateHeading;
		editing = true;
		showForm = true;
	}

	async function handleDone() {
		closeSideModal();
		await fetchData(+filters.page, filters.search);
	}

	const debouncedSearch = debounce(fetchData, 300);

	// $: if (filters.search) {
	// 	oldQuery = filters.search;
	// 	debouncedSearch(+filters.page, filters.search);
	// } else if (oldQuery && !filters.search) {
	// 	debouncedSearch(+filters.page, filters.search);
	// 	oldQuery = '';
	// }

	$: if (reloadData) {
		fetchData(+filters.page || pageInfo.currentPage, filters.search);
		reloadData = false;
	}

	async function handleInputChange({ detail }: CustomEvent) {
		const current = new URLSearchParams(Array.from(searchParams.entries()));
		const value = detail ? detail : '';
		if (!value) {
			current.delete('search');
		} else {
			current.set('search', String(value));
		}
		const search = current.toString();
		const page = search ? `?${search}` : '';
		debouncedSearch(pageInfo.currentPage, value);
		// goto(`${pathname}${page}`);
	}

	onMount(() => {
		// console.log(tableDataInfo);
		if (tableDataInfo) {
			pageInfo.setPageSize(tableDataInfo.pageSize);
			pageInfo.totalItems = tableDataInfo.totalCount;
			pageInfo.setHasNextPage(tableDataInfo.pageInfo.hasNextPage);
			pageInfo.setHasPrevPage(tableDataInfo.pageInfo.hasPreviousPage);
			tableData = tableDataInfo.items ?? [];
		}
	});
</script>

<div class="w-full h-full flex flex-col gap-2">
	<div
		class="flex flex-col gap-2"
		class:custom-container={!fillSpace}
		class:background={showTopActionsBackground}
		class:py-2={!showTopActionsBackground}
	>
		<div class="flex flex-col sm:flex-row gap-2 sm:justify-between">
			<div class:hidden={hideSearchBox} class="flex-grow max-w-md">
				<TableSearchBox
					placeholder={searchPlaceholder}
					value={filters.search}
					on:input={handleInputChange}
				/>
			</div>
			<div class="flex flex-col sm:flex-row sm:items-center gap-4">
				<div>
					<Paginate
						onNextPage={getMore}
						onPreviousPage={getLess}
						currentPage={pageInfo.currentPage}
						totalPages={pageInfo.totalPages}
						hasNextPage={pageInfo.hasNextPage}
						hasPreviousPage={pageInfo.hasPrevPage}
						refresh={() => {
							fetchData(+filters.page || pageInfo.currentPage, filters.search || '');
						}}
						tableColumns={$allColumns}
						bind:hiddenColumns
					/>
				</div>
				<div class:hidden={!showAdd} class="grid">
					<Button label={addButtonLabel} color="primary" on:click={addNew} />
				</div>
			</div>
		</div>
	</div>
	<div class:custom-container={!fillSpace} class="w-full h-full flex flex-col gap-2">
		<slot name="filters" />
		<DataTable
			{height}
			{headerColor}
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
			{actionLists}
			bind:hiddenColumns
			bind:allColumns
			bind:sortedColumns
			on:cancel
			on:delete
			on:edit={handleEdit}
			on:feed
			on:handleCheckbox
			on:view
			on:actionClicked
		/>
	</div>
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
			this={editorComponent}
			recordId={activeEntry.id}
			data={activeEntry}
			bind:this={editor}
			bind:isValid
			on:submit={(e) => save(e.detail)}
			{optionalData}
			on:done={handleDone}
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
		recordId={activeEntry.id}
		data={activeEntry}
		bind:this={editor}
		bind:isValid
		on:submit={(e) => save(e.detail)}
		{optionalData}
		on:done={handleDone}
	/>
</SideModal>

<style>
	.background {
		@apply bg-gradient-to-b from-indigo-100 via-teal-50 to-[#f7f6f2] py-2.5;
	}
</style>
