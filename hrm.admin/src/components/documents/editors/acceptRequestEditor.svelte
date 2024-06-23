<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AlertDialog from '$cmps/alerts/alertDialog.svelte';
	import Button from '$cmps/ui/button.svelte';
	import { endProgress, extractQueryParam, showError, startProgress } from '$lib/utils';
	import axios from 'axios';
	import { createEventDispatcher } from 'svelte';
	import * as z from 'zod';

	export let documentId: string;
	export let polymorphicId: string;
	export let staffNumber: string;
	let busy = false;
	let openAlert = false;
	const dispatch = createEventDispatcher();

	const schema = z.object({
		comment: z.string().optional()
	});

	async function submit() {
		try {
			startProgress();
			busy = true;
			const ret = await axios.patch(`/staffrequests/${documentId}`, { id: documentId });
			if (!ret.data.success) {
				showError(ret.data.message || 'Failed to approve request');
				return;
			}
			const type = extractQueryParam($page.url.search, 'type');
			if (type === 'new-registeration') {
				openAlert = true;
			} else {
				dispatch('close', 'refresh');
			}
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			endProgress();
			busy = false;
		}
	}

	function handleCancel() {
		if (browser) window.history.back();
		openAlert = false;
		dispatch('close', 'refresh');
	}
	function handleYes() {
		// const id = $page.params.
		goto(
			`/staffrecords/${documentId}/appointmentdetails?applicant=true&polymorphicId=${polymorphicId}`
		);
		openAlert = false;
		dispatch('close');
	}
</script>

<div class="w-full h-full flex justify-center">
	<div class="flex justify-center flex-col gap-4">
		<div class="flex justify-center">
			<iconify-icon
				icon="solar:verified-check-bold"
				style="font-size: 70px;"
				class="text-green-400"
			/>
		</div>
		<p class="text-center pb-2">
			Are you sure want to accept this request. This action is irreversible.
		</p>
		<div class="grid pt-10">
			<Button label="Accept" color="success" {busy} on:click={submit} />
		</div>
	</div>
</div>

<AlertDialog
	open={openAlert}
	message="Do you want to continue with staff's Appointment Details?"
	confirmText="Yes, I want"
	dismissable={false}
	on:yes={handleYes}
	on:cancel={handleCancel}
/>
