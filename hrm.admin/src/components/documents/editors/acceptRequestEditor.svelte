<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AlertDialog from '$cmps/alerts/alertDialog.svelte';
	import Form from '$cmps/forms/form.svelte';
	import TextAreaField from '$cmps/forms/textAreaField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import { modalConfig } from '$data/appStore';
	import { extractQueryParam, showError, showInfo } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';
	import * as z from 'zod';

	export let documentId: string;
	export let staffNumber: string;
	let busy = false;
	let openAlert = false;
	const dispatch = createEventDispatcher();

	const schema = z.object({
		comment: z.string().optional()
	});

	async function submit() {
		// busy = true;
		// try {
		// 	const ret = await acceptDocument(documentId, comment || "");
		// 	if (!ret.success) {
		// 		showError(ret.message);
		// 		return;
		// 	}
		// 	showInfo(ret.message || 'Document reviewed successfully');
		// 	dispatch('close', 'refresh');
		// } catch (e: any) {
		// 	showError(e?.message || e);
		// } finally {
		// 	busy = false;
		// }
		// goto('')
		// dispatch('close', 'refresh');
		const type = extractQueryParam($page.url.search, 'type');
		if (type === 'STAFF REGISTRATION') {
			openAlert = true;
			// $modalConfig = {
			// 	show: false,
			// 	title: '',
			// 	size: 'xs',
			// 	componentConfig: null,
			// 	onDone: (refresh: boolean) => {}
			// };
		} else {
			dispatch('close', 'refresh');
		}
	}

	function handleCancel() {
		if (browser) window.history.back();
		openAlert = false;
		dispatch('close', 'refresh');
	}
	function handleYes() {
		// const id = $page.params.
		goto(`/staffrecords/MS0001/appointmentdetails`);
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
