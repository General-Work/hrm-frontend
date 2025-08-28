<script lang="ts" context="module">
	export interface TableFilter {
		search?: string;
		actions?: { [key: string]: string };
		startDate?: Date | string | null | undefined;
		endDate?: Date | string | null | undefined;
		requestType?: string;
		filter?: Record<string, any>;
	}

	export function refetchDatatable(params?: TableFilter) {
		window.dispatchEvent(
			new CustomEvent('reFetchTableData', {
				detail: params
			})
		);
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
	import TableLoader from './tableLoader.svelte';

	export let optionalData: any = {};
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
	export let loadingBodySize = 10;
	export let loadingHeaderSize = 6;
	// export let pageUrl = '';
	export let take = 15;
	export let fillSpace = true;
	export let showTopActionsBackground = true;
	export let customFilterValues: any = {};
	export let addFuction: (() => void) | null = null;
	export let read = async (skip?: number, take?: number, defn?: TableFilter) => {
		return <any>{};
	};
	export let createEntry = async (x: any) => {
		showError('Not implemented');
		return <any>null;
	};
	export let updateEntry = async (x: any) => {
		showError('Not implemented');
		return <any>null;
	};
	export let deleteEntry = async (x: any) => {
		showError('Not implemented');
		return <any>null;
	};

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
	let busy = false;

	$: ({ searchParams, pathname, search } = $page.url);

	$: filters = {
		search: extractQueryParam(search, 'search') ?? '',
		page: extractQueryParam(search, 'page') ?? ''
	};

	let allColumns = writable<any>([]);

	const dispatch = createEventDispatcher();

	async function fetchData(page: number, params: TableFilter) {
		try {
			// console.log({ page });
			startProgress();
			busy = true;
			let currentPage = 0;
			if (params.search) {
				// if (!pageInfo.hasNextPage) {
				pageInfo.currentPage = 1;
				// }
				currentPage = pageInfo.currentPage;
			} else {
				currentPage = page || pageInfo.currentPage;
			}
			let newParams: any = {
				pageNumber: currentPage,
				pageSize: pageInfo.pageSize,
				search: params.search ?? '',
				filter: params.filter ?? {}
				// order: params.order ?? []
			};
			const ret: { success: boolean; message: string; data?: any } = await read(
				newParams.pageNumber,
				newParams.pageSize,
				{
					...params,
					filter: { ...customFilterValues },
					search: filters.search || newParams.search || ''
				}
			);

			if (!ret.success) {
				showError(ret.message || 'Failed to load data');
				return true;
			}

			const xs = ret.data;

			pageInfo.totalItems = xs.totalCount;
			pageInfo.setHasNextPage(xs.pageInfo.hasNextPage);
			pageInfo.setHasPrevPage(xs.pageInfo.hasPreviousPage);
			tableData = xs.items;
			// if (params.search) {
			// 	await goto(pathname);
			// }
		} catch (e: any) {
			showError(e.message || e);
		} finally {
			endProgress();
			busy = false;
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
			await fetchData(value, { search: filters.search });
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
			await fetchData(value, { search: filters.search });
		}
	}

	function addNew() {
		if (addFuction) {
			addFuction();
			return;
		}
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

			const ret = editing
				? await updateEntry({ ...values, id: activeEntry.id })
				: await createEntry(values);

			if (ret.success) {
				const successMessage = allowLoadAfterCreate
					? editing
						? 'Successfully updated record'
						: 'Successfully added record'
					: '';
				showInfo(ret.message || successMessage);
				allowLoadAfterCreate && (await fetchData(+filters.page, { search: filters.search }));

				allowDispatchAfterAction &&
					dispatch('afterAction', { type: 'create', values, data: ret.data });
				closeSideModal();
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
		await fetchData(+filters.page, { search: filters.search });
	}

	const debouncedSearch = debounce(fetchData, 300);

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
		// debouncedSearch(1, value);
		// console.log({ value });
		debouncedSearch(pageInfo.currentPage, { search: value });

		// goto(`${pathname}${page}`);
	}

	function handleExternalFetch(event: CustomEvent) {
		// console.log({ event });
		const { requestType, startDate, endDate } = event.detail || ({} as TableFilter);

		fetchData(+filters.page || pageInfo.currentPage, {
			search: filters.search,
			requestType,
			startDate,
			endDate
		});
	}

	onMount(() => {
		if (filters.page) {
			pageInfo.currentPage = +filters.page;
			fetchData(+filters.page, { search: filters.search });
		} else {
			fetchData(pageInfo.currentPage, { search: filters.search });
		}

		// Listen for custom event from parent
		window.addEventListener('reFetchTableData', handleExternalFetch as EventListener);

		// Cleanup on destroy
		return () => {
			window.removeEventListener('reFetchTableData', handleExternalFetch as EventListener);
		};
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
							fetchData(+filters.page || pageInfo.currentPage, { search: filters.search });
						}}
						tableColumns={$allColumns}
						bind:hiddenColumns
					/>
				</div>
				<slot name="customHeaderActions" />
				<div class:hidden={!showAdd} class="grid">
					<Button label={addButtonLabel} color="primary" on:click={addNew} />
				</div>
			</div>
		</div>
	</div>
	<div class:custom-container={!fillSpace} class="w-full h-full flex flex-col gap-2">
		<slot name="filters" />

		{#if busy}
			<TableLoader bodySize={loadingBodySize} headerSize={loadingHeaderSize} />
		{:else}
			<div class="w-full h-full">
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
					bind:selectAllChecked
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
		{/if}
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
