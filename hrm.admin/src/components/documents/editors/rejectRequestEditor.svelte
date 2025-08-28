<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import TextAreaField from '$cmps/forms/textAreaField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import { rejectRequest } from '$svc/staffrequests';
	import { createEventDispatcher } from 'svelte';
	// import { get } from 'svelte/store';
	import * as z from 'zod';

	export let allowAutoSpan = true;
	export let documentId: string;

	let busy = false;
	let initialValues = {
		reason: ''
	};
	const schema = z.object({
		reason: z.string().min(3, 'Reason is required')
	});

	const dispatch = createEventDispatcher();
	async function submit(reason: string) {
		try {
			busy = true;
			startProgress();
			// const ret = await axios.post(`/staffrequests/${documentId}`, {
			// 	id: documentId,
			// 	description: reason
			// });
			const ret = await rejectRequest(documentId, reason);
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			showInfo(ret.message);
			dispatch('close', 'refresh');
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			busy = false;
			endProgress();
		}
	}
</script>

<Form class="flex flex-col gap-5" {initialValues} {schema} let:isValid let:values>
	<TextAreaField
		rows={5}
		label="Reason for rejection"
		name="reason"
		{allowAutoSpan}
		required
		placeholder="Why are you rejecting this request"
	/>
	<div class="grid pt-2">
		<Button
			label="Submit"
			color="success"
			{busy}
			disabled={!isValid}
			on:click={() => submit(values.reason)}
		/>
	</div>
</Form>
