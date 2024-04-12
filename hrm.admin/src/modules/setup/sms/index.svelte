<script lang="ts">
	import SideModal from '$cmps/layout/sideModal.svelte';
	import Box from '$cmps/ui/box.svelte';
	import TemplateCard from '$cmps/ui/templateCard.svelte';
	import { PageInfo } from '$lib/paginate';
	import type { ICampaignTemplate, ITableDataProps } from '$lib/types';
	import { onMount } from 'svelte';
	import Editor from './editor.svelte';
	import AlertDialog from '$cmps/alerts/alertDialog.svelte';
	import { Tooltip } from 'flowbite-svelte';
	import Paginate from '$cmps/ui/paginate.svelte';
	import TableSearchBox from '$cmps/ui/tableSearchBox.svelte';

	export let tableDataInfo: ITableDataProps<any> | undefined;
	let templates: ICampaignTemplate[] = [];
	let open = false;
	let edit = false;
	let add = false;
	let recordId = 0;
	let showAlert = false;
	let editor: any;
	let isValid = false;
	let busy = false;
	let query = '';
	let pageInfo = new PageInfo();
	pageInfo.setPageSize(12);

	// async function fetchData(load = false) {
	// 	try {
	// 		// if (load) isLoading = true;
	// 		$showPageLoader = true;
	// 		const ret = await readSmsTemplates();
	// 		if (ret.success) {
	// 			const data = ret.data;
	// 			templates = data.items;
	// 			pageInfo.setHasNextPage(data.pageInfo.hasNextPage);
	// 			pageInfo.setHasPrevPage(data.pageInfo.hasPreviousPage);
	// 			pageInfo.setNextPageUrl(data.pageInfo.nextPageUrl);
	// 			pageInfo.setPrevPageUrl(data.pageInfo.previousPageUrl);
	// 			pageInfo.totalItems = data.totalCount;
	// 		} else {
	// 			showError(ret.message);
	// 		}
	// 	} catch (err: any) {
	// 		console.log(err);
	// 		showError(err?.message || err);
	// 	} finally {
	// 		// isLoading = false;
	// 		$showPageLoader = false;
	// 	}
	// }

	function handleCardClicked(id: number, name: 'edit' | 'delete' | 'view') {
		switch (name) {
			case 'view':
				recordId = id;
				if (edit) edit = false;
				if (add) add = false;
				open = true;
				break;
			case 'edit':
				recordId = id;
				edit = true;
				if (add) add = false;
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
		if (recordId) recordId = 0;
	}

	async function submitForm({ detail }: any) {
		// try {
		// 	busy = true;
		// 	const { values } = detail;
		// 	const res = edit
		// 		? await updateSmsTemplates({ ...values, id: recordId })
		// 		: await createSmsTemplates(values);
		// 	if (res.success) {
		// 		showInfo(res.message);
		// 		closeModal();
		// 		fetchData();
		// 	} else {
		// 		showError(res.message);
		// 	}
		// } catch (err: any) {
		// 	console.log(err);
		// 	showError(err?.message || err);
		// } finally {
		// 	busy = false;
		// }
	}

	function closeAlert() {
		showAlert = false;
		recordId = 0;
	}

	async function handleAlert(id: number) {
		// try {
		// 	busy = true;
		// 	const res = await deleteSmsTemplates(id);
		// 	if (res.success) {
		// 		showInfo(res.message);
		// 		closeAlert();
		// 		fetchData();
		// 	} else {
		// 		showError(res.message);
		// 	}
		// } catch (err: any) {
		// 	console.log(err);
		// 	showError(err?.message || err);
		// } finally {
		// 	busy = false;
		// }
	}
	async function getMore() {
		// if (pageInfo.gotoNext()) await fetchData();
	}
	async function getLess() {
		// if (pageInfo.gotoPrev()) await fetchData();
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
	<div class="flex gap-2 items-center justify-between xl:pr-4">
		<div class="w-full lg:w-[550px]">
			<TableSearchBox placeholder="Search name..." bind:value={query} />
		</div>
		<div class="flex items-center gap-3">
			<Paginate
				onNextPage={getMore}
				onPreviousPage={getLess}
				currentPage={pageInfo.currentPage}
				hasNextPage={pageInfo.hasNextPage}
				hasPreviousPage={pageInfo.hasPrevPage}
				totalPages={pageInfo.totalPages}
			/>
			<button
				on:click={() => {
					edit = false;
					add = true;
					open = true;
				}}
				class="hover:bg-gray-300 grid p-1.5 rounded-full place-content-center"
				><iconify-icon icon="icon-park-outline:add-one" style="font-size: 20px;" /></button
			>
			<Tooltip placement="left-end">New SMS Template</Tooltip>
		</div>
	</div>

	{#if templates.length}
		<Box
			otherClasses="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6"
		>
			{#each templates as { name, category, isSystemTemplate, id }}
				<TemplateCard
					{name}
					notes={category}
					{isSystemTemplate}
					avatarIcon="fa6-solid:comment-sms"
					color={isSystemTemplate ? 'red' : 'sky'}
					showDelete={!isSystemTemplate}
					on:view={() => handleCardClicked(id, 'view')}
					on:edit={() => handleCardClicked(id, 'edit')}
					on:delete={() => handleCardClicked(id, 'delete')}
				/>
			{/each}
		</Box>
		
	{/if}
</div>

<SideModal
	{open}
	size="md"
	on:close={closeModal}
	title={edit ? 'Update SMS Template' : add ? 'New SMS Template' : 'View SMS Template'}
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
	/>
</SideModal>

<AlertDialog
	bind:open={showAlert}
	on:cancel={closeAlert}
	on:yes={() => handleAlert(recordId)}
	message="Are you sure you want to delete this template?"
	{busy}
/>
