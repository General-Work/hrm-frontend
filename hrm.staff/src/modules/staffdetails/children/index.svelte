<script lang="ts">
	import DatatablePage from '$cmps/ui/datatablePage.svelte';
	import Editor from './editor.svelte';
	import axios from 'axios';
	import type { ITableDataProps } from '$lib/types';
	import dayjs from 'dayjs';
	import type { IChildDetails } from '$svc/staffdetails';
	import Button from '$cmps/ui/button.svelte';
	import Modal from '$cmps/ui/modal.svelte';
	import { endProgress, showError, startProgress } from '$lib/utils';

	export let data: IChildDetails[];
	let showForm = false;

	function toggleForm() {
		showForm = true;
	}

	async function handleClose() {
		try {
			showForm = false;
			startProgress();
			const ret = await axios.get('/profile/children');
			if (!ret.data.success) {
				showError(ret.data.message || 'Failed to load children');
				return;
			}
			data = ret.data.data;
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			endProgress();
		}
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex justify-end">
		<Button
			label="Add Child"
			color="primary"
			leadingIcon="line-md:plus-circle"
			on:click={toggleForm}
		/>
	</div>
	{#if data.length}
		<div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
			{#each data as { childName, dateOfBirth, gender }}
				<div class="shadow-md rounded-[5px] p-2 flex items-center gap-4 border border-pink-300 bg-pink-50/20">
					<div>
						<div class="bg-white loginbox rounded-full p-2 w-12 h-12 grid place-content-center">
							<iconify-icon icon="fa6-solid:children" style="font-size: 20px;" class="text-pink-500" />
						</div>
					</div>
					<div class="">
						<div class="text-lg font-semibold">
							{childName}
						</div>
						<div>
							<span>Date of birth:</span>
							{dayjs(dateOfBirth).format('DD-MMM-YYYY')}
						</div>
						<div>
							<span>Gender:</span>
							{gender}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<Modal open={showForm} title="New Child">
	<Editor on:close={handleClose} />
</Modal>
