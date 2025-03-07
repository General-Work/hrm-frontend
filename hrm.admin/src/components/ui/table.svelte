<script lang="ts" context="module">
	export interface ITableColumn {
		header: string;
		id?: string;
		plugins?: any;
		accessor?: string | string[] | ((row: any) => any);
	}

	export interface IActionList {
		name: string;
		icon?: string;
		otherClasses?: string;
		visible?: (row: any) => boolean;
	}
	export interface ISortInfo {
		id: string;
		order: 'asc' | 'desc';
		// name?: string;
	}
	function getRow(row: any) {
		const { original } = row;
		return original;
	}
</script>

<script lang="ts">
	import { writable } from 'svelte/store';
	import { createTable, Subscribe, Render } from 'svelte-headless-table';
	import {
		addSortBy,
		addColumnOrder,
		addSelectedRows,
		addHiddenColumns,
		addResizedColumns
	} from 'svelte-headless-table/plugins';
	import { createEventDispatcher } from 'svelte';
	import { clickOutsideAction } from 'svelte-legos';
	import { slide } from 'svelte/transition';
	import DropdownItem from './dropdownItem.svelte';

	export let data: any[];
	export let headerColor: 'green' | 'orange' | 'white' | 'purple' | 'sky' | 'blue' = 'white';
	export let height = 400;
	export let bgWhite = false;
	export let headerTextColor: 'black' | 'white' | 'gray' = 'black';
	export let tableColumns: ITableColumn[] = [];
	export let showActions = false;
	export let showCheckBox = false;
	export let showViewDetails = true;
	export let showEdit = false;
	export let showMiniWidth = false;
	export let rowClickable = false;
	export let hideWhiteSpace = true;
	export let hiddenColumns: string[] = [];
	export let sortedColumns: ISortInfo[] = [];
	export let initialSortKeys: ISortInfo[] = [];
	export const allColumns = writable<any>([]);
	export let actionLists: IActionList[] = [];
	export let showIndex = false;
	export let selectedRows: any[] = [];
	export let selectAllChecked = false;

	let dropdown = -1;
	let openDropDown = false;
	let previousSelectAllChecked = false;
	const dispatch = createEventDispatcher();

	let tableData = writable(data);
	$: $tableData = data;
	const table = createTable(tableData, {
		sort: addSortBy({
			disableMultiSort: false,
			serverSide: true,
			initialSortKeys: initialSortKeys
		}),
		colOrder: addColumnOrder(),
		select: addSelectedRows(),
		hideCols: addHiddenColumns({
			initialHiddenColumnIds: hiddenColumns
		}),
		resize: addResizedColumns()
	});
	const columns = tableColumns.map((x: any) => table.column({ ...x }));
	const { headerRows, flatColumns, rows, tableAttrs, tableBodyAttrs, pluginStates, pageRows } =
		table.createViewModel(columns);
	$allColumns = flatColumns;
	// handle hidden columns
	const { hiddenColumnIds } = pluginStates.hideCols;
	$: $hiddenColumnIds = hiddenColumns;

	const { sortKeys } = pluginStates.sort;
	$: sortedColumns = $sortKeys;

	function handleRowCheckboxChange(row: any) {
		const updatedSelectedRows = [...selectedRows, row];
		selectedRows = updatedSelectedRows;
		dispatch('handleCheckbox', selectedRows);
	}

	function handleRowCheckboxUncheck(row: any) {
		const updatedSelectedRows = selectedRows.filter((x) => x.id !== row.id);
		selectedRows = updatedSelectedRows;
		dispatch('handleCheckbox', selectedRows);
		previousSelectAllChecked = true;
	}

	const handleSelectAllChange = () => {
		if (selectAllChecked) {
			selectedRows = [];
			dispatch('handleCheckbox', []);
		} else {
			const allRows = data.map((x) => x);
			selectedRows = allRows;
			dispatch('handleCheckbox', allRows);
		}
		selectAllChecked = !selectAllChecked;
	};


	// TODO: Recheck later 
	// $: if (selectAllChecked && previousSelectAllChecked === false) {
	// 	const allDataIds = data.map((d) => d.id);
	// 	const selectedIds = selectedRows.map((x) => x.id);
	// 	const allSelected = allDataIds.every((id) => selectedIds.includes(id));

	// 	if (!allSelected) {
	// 		const newSelectedRows = data.filter((d) => !selectedIds.includes(d.id));
	// 		selectedRows = [...selectedRows, ...newSelectedRows];
	// 		dispatch('handleCheckbox', selectedRows);
	// 	}
	// }
	function toggleSubmenu(index: any) {
		dropdown = dropdown === index ? -1 : index;
	}
</script>

<div class="w-full h-full flex-auto">
	<div class="grid grid-cols-1 gap-2">
		<div
			class=" overflow-x-auto w-full h-full max-h-[{height}px] scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
			style="max-height: {height}px; min-height: {showMiniWidth && '250px'};"
		>
			<table {...$tableAttrs} class="w-full mb-6 pb-6">
				<thead
					class=" sticky top-0"
					class:bg-[#92cbdf]={headerColor === 'sky'}
					class:bg-green-300={headerColor === 'green'}
					class:bg-[#CF9B14]={headerColor === 'orange'}
					class:bg-[#cbc3fa]={headerColor === 'purple'}
					class:bg-blue-300={headerColor === 'blue'}
					class:bg-white={headerColor === 'white'}
					class:text-gray-700={headerTextColor === 'gray'}
					class:text-white={headerTextColor === 'white'}
					class:text-black={headerTextColor === 'black'}
					class:border-b-2={headerColor === 'white'}
				>
					{#each $headerRows as headerRow (headerRow.id)}
						<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
							<tr {...rowAttrs}>
								{#if showCheckBox}
									<th
										class="px-6 py-2.5 text-left rtl:text-right whitespace-nowrap font-semibold text-sm"
									>
										<input
											class="cursor-pointer"
											type="checkbox"
											checked={selectAllChecked}
											on:change={handleSelectAllChange}
										/>
									</th>
								{/if}
								{#if showActions}
									<th
										class="px-4 py-2.5 text-left rtl:text-right whitespace-nowrap font-semibold text-sm"
										>Actions</th
									>
								{/if}
								{#if showIndex}
									<th
										class="px-6 py-2.5 text-left rtl:text-right whitespace-nowrap font-semibold text-sm"
										>#</th
									>
								{/if}
								{#each headerRow.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
										<!-- use:props.resize : apply to th -->
										<th
											{...attrs}
											on:click={props.sort.toggle}
											class="px-6 py-2.5 text-left rtl:text-right whitespace-nowrap font-semibold text-sm cursor-pointer relative"
										>
											<div class="flex items-center gap-1">
												<Render of={cell.render()} />
												{#if props.sort?.order === 'asc'}
													<iconify-icon icon="ph:caret-up" class="text-gray-500" />
												{:else if props.sort?.order === 'desc'}
													<iconify-icon icon="ph:caret-down" class="text-gray-500" />
												{:else if props.sort?.disabled == false}
													<iconify-icon icon="ph:caret-up-down" class="text-gray-500" />
												{/if}
												<!-- {#if !props.resize.disabled}
													<div class="resizer" use:props.resize.drag />
												{/if} -->
											</div>
										</th>
									</Subscribe>
								{/each}
							</tr>
						</Subscribe>
					{/each}
				</thead>
				<tbody {...$tableBodyAttrs} class="divide-y" class:bg-white={bgWhite}>
					{#each $pageRows as row, index (row.id)}
						<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
							<tr
								{...rowAttrs}
								class:bg-slate-100={index % 2 !== 0}
								class:cursor-pointer={rowClickable}
								class:hover:bg-gray-100={rowClickable}
								class="dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
								on:click={(e) => {
									rowClickable && dispatch('view', getRow(row));
								}}
							>
								{#if showCheckBox}
									<td class="px-6 py-2">
										<input
											type="checkbox"
											class="cursor-pointer"
											on:change={(event) => {
												const d = getRow(row);
												if (event.target.checked) {
													handleRowCheckboxChange(d);
												} else {
													handleRowCheckboxUncheck(d);
												}
											}}
											checked={selectedRows.find((x) => x.id === getRow(row).id) ?? false}
										/>
									</td>
								{/if}
								{#if showActions}
									<td
										class="px-5 py-2"
										use:clickOutsideAction
										on:clickoutside={() => {
											{
												openDropDown = false;
												dropdown = -1;
											}
										}}
									>
										<button
											class="bg-gray-200 hover:bg-gray-300 rounded-[5px] w-7 h-7 grid place-content-center border border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-700"
											on:click={(e) => {
												toggleSubmenu(index);
												openDropDown = true;
												if (
													e.target.localName === 'iconify-icon' ||
													e.target.localName === 'button'
												) {
													e.stopPropagation();
												}
											}}
										>
											<iconify-icon class="dots-menu dark:text-white" icon="tabler:dots-vertical" />
										</button>
										{#if dropdown === index && openDropDown}
											<div
												transition:slide
												use:clickOutsideAction
												class="bg-white shadow-md shadow-gray-300 rounded-md absolute z-10 divide-y py-1"
											>
												{#each actionLists as { name, icon, otherClasses, visible }}
													{#if visible}
														{#if visible(getRow(row))}
															<DropdownItem
																otherClasses="flex items-center gap-2 {otherClasses}"
																on:click={(e) => {
																	dispatch('actionClicked', {
																		name,
																		row: getRow(row)
																	});
																	openDropDown = false;
																	dropdown = -1;
																	e.stopPropagation();
																}}
															>
																{#if icon}
																	<iconify-icon {icon} style="font-size: 18px;" />
																{/if}
																{name}</DropdownItem
															>
														{/if}
													{:else}
														<DropdownItem
															otherClasses="flex items-center gap-2 {otherClasses}"
															on:click={(e) => {
																dispatch('actionClicked', {
																	name,
																	row: getRow(row)
																});
																openDropDown = false;
																dropdown = -1;
																e.stopPropagation();
															}}
														>
															{#if icon}
																<iconify-icon {icon} style="font-size: 18px;" />
															{/if}
															{name}</DropdownItem
														>
													{/if}
												{:else}
													{#if showViewDetails}
														<DropdownItem
															otherClasses="flex items-center gap-2"
															on:click={(e) => {
																dispatch('view', getRow(row));
																e.stopPropagation();
															}}
															><iconify-icon icon="ion:eye" style="font-size: 18px;" />View Details</DropdownItem
														>
													{/if}

													{#if showEdit}
														<DropdownItem
															otherClasses="flex items-center gap-2"
															on:click={(e) => {
																dispatch('edit', getRow(row));
																e.stopPropagation();
															}}
															><iconify-icon icon="ri:edit-2-fill" style="font-size: 18px;" />Edit
															Details</DropdownItem
														>
													{/if}
												{/each}
											</div>
										{/if}
									</td>
								{/if}
								{#if showIndex}
									<td class="px-6 py-2">
										{index + 1}
									</td>
								{/if}
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs>
										<td
											{...attrs}
											class="py-2 px-6 text-left text-sm rtl:text-right"
											class:whitespace-nowrap={hideWhiteSpace}
										>
											<Render of={cell.render()} />
										</td>
									</Subscribe>
								{/each}
							</tr>
						</Subscribe>
					{/each}
				</tbody>
			</table>
			{#if !$pageRows.length}
				<div class="w-full h-72 flex justify-center items-center">
					<div class="bg-yellow-200 py-4 px-6 rounded-md">No records found</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.resizer {
		position: absolute;
		top: 0;
		bottom: 0;
		right: -4px;
		width: 8px;
		background: #6194d9;
		cursor: col-resize;
		z-index: 1;
	}
</style>
