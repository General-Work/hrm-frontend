<script lang="ts">
	import Editor from './editor.svelte';
	import dayjs from 'dayjs';
	import { readChildrenDetails } from '$svc/staffdetails';
	import Button from '$cmps/ui/button.svelte';
	import Modal from '$cmps/ui/modal.svelte';
	import { showError } from '$lib/utils';
	import bg from '$lib/images/chat1.png';
	import { onMount } from 'svelte';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import { Alert } from 'flowbite-svelte';

	let showForm = false;

	function toggleForm() {
		showForm = !showForm;
	}

	let data: any[] = [];
	let isLoading = true;
	let readonly = false;

	async function handleClose() {
		toggleForm();
	}

	async function fetchData() {
		try {
			const ret = await readChildrenDetails();
			if (!ret.success) {
				if (ret.message === 'Staff children details not found.') return;
				showError(ret.message);
				return;
			}
			data = ret.data.children;
			readonly = ret.data.status === 'PENDING';
		} catch (error: any) {
			showError(error?.message || error);
		}
	}

	onMount(async () => {
		await fetchData();
		isLoading = false;
	});
</script>

{#if isLoading}
	<div class="w-full h-full">
		<PageLoader size={50} />
	</div>
{:else}
	<div class="flex flex-col gap-4 w-full h-full">
		{#if readonly}
			<Alert color="blue">Your children information is under review</Alert>
		{:else}
			<div class:hidden={!Boolean(data.length > 0)} class="flex justify-end">
				<Button
					label="Add New Child"
					color="primary"
					leadingIcon="line-md:plus-circle"
					on:click={toggleForm}
				/>
			</div>
		{/if}

		{#if data.length > 0}
			<div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
				{#each data as { childName, dateOfBirth, gender }}
					<div
						class="shadow-md rounded-[5px] p-2 flex items-center gap-4 border border-pink-300 bg-pink-50/20"
					>
						<div>
							<div class="bg-white loginbox rounded-full p-2 w-12 h-12 grid place-content-center">
								<iconify-icon
									icon="fluent-emoji-high-contrast:child"
									style="font-size: 20px;"
									class="text-pink-500"
								/>
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
		{:else}
			<div class="min-h-96 justify-center items-center w-full flex">
				<div class="">
					<img src={bg} alt="" class="h-96" />
					<div class="text-center text-xl text-gray-500">
						No children added, <button class="text-pink-500" on:click={toggleForm}
							>Add a child</button
						>
					</div>
				</div>
			</div>
		{/if}
	</div>
{/if}

<Modal size="lg" open={showForm} title="Add Children" on:close={toggleForm}>
	<Editor on:close={handleClose} />
</Modal>
