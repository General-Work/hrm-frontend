<script lang="ts">
	import SideModal from '$cmps/layout/sideModal.svelte';
	import Box from '$cmps/ui/box.svelte';
	import TemplateCard from '$cmps/ui/templateCard.svelte';
	import { PageInfo } from '$lib/paginate';
	import type { ITableDataProps } from '$lib/types';
	import { onMount } from 'svelte';
	import Editor from './editor.svelte';
	import Paginate from '$cmps/ui/paginate.svelte';
	import TableSearchBox from '$cmps/ui/tableSearchBox.svelte';
	import type { ICampaignTemplate } from '$svc/setup';
	import Button from '$cmps/ui/button.svelte';
	import axios from 'axios';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import debounce from 'lodash/debounce';
	import ActionDialog from '$cmps/alerts/actionDialog.svelte';

	export let tableDataInfo: ITableDataProps<any> | undefined;
	let templates: ICampaignTemplate[] = [];
	let open = false;
	let edit = false;
	let add = false;
	let recordId = '';
	let showAlert = false;
	let editor: any;
	let isValid = false;
	let busy = false;
	let query = '';
	let oldQuery = '';
	let pageInfo = new PageInfo();
	let data: ICampaignTemplate | null;
	pageInfo.setPageSize(12);

	async function fetchData(query?: string) {
		try {
			const ret = await axios.get('/applicationsetup/sms', {
				params: {
					pageNumber: pageInfo.currentPage,
					pageSize: pageInfo.pageSize,
					search: query ?? ''
				}
			});
			if (!ret.data.success) {
				showError(ret.data.message);
				return;
			}
			const xs = ret.data.data;
			pageInfo.totalItems = xs.totalCount;
			pageInfo.setHasNextPage(xs.pageInfo.hasNextPage);
			pageInfo.setHasPrevPage(xs.pageInfo.hasPreviousPage);
			templates = xs.items;
		} catch (err: any) {
			console.log(err);
			showError(err?.message || err);
		} finally {
		}
	}

	function handleCardClicked(row: ICampaignTemplate, name: 'edit' | 'delete' | 'view') {
		const { id } = row;
		switch (name) {
			case 'view':
				recordId = id;
				if (edit) edit = false;
				if (add) add = false;
				data = row;
				open = true;
				break;
			case 'edit':
				recordId = id;
				edit = true;
				if (add) add = false;
				data = row;
				open = true;
				break;
			case 'delete':
				recordId = id;
				showAlert = true;
				break;

			default:
				break;
		}
	}

	function closeModal() {
		open = false;
		if (edit) edit = false;
		if (add) add = false;
		if (recordId) recordId = '';
		if (data) data = null;
	}

	async function submitForm({ detail }: any) {
		try {
			busy = true;
			startProgress();
			const { values } = detail;
			const res = edit
				? await axios.patch('/applicationsetup/sms', { id: recordId, ...values })
				: await axios.post('/applicationsetup/sms', values);
			if (!res.data.success) {
				showError(res.data.message);
				return;
			}
			showInfo(
				res.data.message ?? edit ? 'Successfully upated record' : 'Successfully created record'
			);
			closeModal();
			fetchData();
		} catch (err: any) {
			console.log(err);
			showError(err?.message || err);
		} finally {
			busy = false;
			endProgress();
		}
	}

	function closeAlert() {
		showAlert = false;
		recordId = '';
	}

	async function handleAlert(id: string) {
		try {
			busy = true;
			const res = await axios.delete(`/applicationsetup/sms?q=${id}`);
			if (!res.data.success) {
				showError(res.data.message);
				return;
			}
			showInfo(res.data.message || 'Sucessfully deleted record');
			closeAlert();
			fetchData(query);
		} catch (err: any) {
			console.log(err);
			showError(err?.message || err);
		} finally {
			busy = false;
		}
	}
	async function getMore() {
		if (pageInfo.gotoNext()) await fetchData(query);
	}
	async function getLess() {
		if (pageInfo.gotoPrev()) await fetchData(query);
	}
	const debouncedSearch = debounce(fetchData, 300);

	$: if (query) {
		oldQuery = query;
		debouncedSearch(query);
	} else if (oldQuery && !query) {
		debouncedSearch();
		oldQuery = '';
	}
	onMount(() => {
		if (tableDataInfo) {
			pageInfo.setPageSize(tableDataInfo.pageSize);
			pageInfo.totalItems = tableDataInfo.totalCount;
			pageInfo.setHasNextPage(tableDataInfo.pageInfo.hasNextPage);
			pageInfo.setHasPrevPage(tableDataInfo.pageInfo.hasPreviousPage);
			templates = tableDataInfo.items ?? [];
		}
	});
</script>

<div class="w-full h-full flex flex-col gap-4">
	<div class="flex gap-2 flex-col sm:flex-row sm:items-center sm:justify-between xl:pr-4">
		<div class="w-full lg:w-[550px]">
			<TableSearchBox placeholder="Search name..." bind:value={query} />
		</div>
		<div class="flex flex-col sm:flex-row sm:items-center gap-3">
			<Paginate
				onNextPage={getMore}
				onPreviousPage={getLess}
				currentPage={pageInfo.currentPage}
				hasNextPage={pageInfo.hasNextPage}
				hasPreviousPage={pageInfo.hasPrevPage}
				totalPages={pageInfo.totalPages}
			/>
			<Button
				color="primary"
				on:click={() => {
					edit = false;
					add = true;
					open = true;
				}}>New Template</Button
			>
		</div>
	</div>

	{#if templates.length}
		<Box
			otherClasses="w-full h-full pr-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6"
		>
			{#each templates as item}
				<TemplateCard
					name={item.name}
					notes={item.description}
					isSystemTemplate={item.readOnly}
					avatarIcon="fa6-solid:comment-sms"
					color={item.readOnly ? 'red' : 'sky'}
					showDelete={!item.readOnly}
					on:view={() => handleCardClicked(item, 'view')}
					on:edit={() => handleCardClicked(item, 'edit')}
					on:delete={() => handleCardClicked(item, 'delete')}
				/>
			{/each}
		</Box>
	{/if}
</div>

<SideModal
	{open}
	size="md"
	on:close={closeModal}
	title={edit ? 'Update Template' : add ? 'New Template' : 'View Template'}
	showModalButtons={!add && !edit ? false : true}
	{isValid}
	{busy}
	{edit}
	on:submit={() => editor.submit()}
>
	<Editor
		bind:valid={isValid}
		bind:this={editor}
		on:submit={submitForm}
		readonly={!add && !edit ? true : false}
		{recordId}
		{data}
	/>
</SideModal>

<ActionDialog
	bind:open={showAlert}
	on:close={closeAlert}
	on:accept={() => handleAlert(recordId)}
	title="Delete Template"
	text="Are you sure you want to delete this template?"
	{busy}
/>
