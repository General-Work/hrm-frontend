<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import TextAreaField from '$cmps/forms/textAreaField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import { showError, showInfo } from '$lib/utils';
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
	async function submit(reason: string) {}
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
