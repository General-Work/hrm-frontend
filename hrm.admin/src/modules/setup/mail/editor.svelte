<script lang="ts">
	import ControlField from '$cmps/forms/controlField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import TextEditor from '$cmps/forms/textEditor.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Box from '$cmps/ui/box.svelte';
	import Progress from '$cmps/ui/progress.svelte';
	import { showError } from '$lib/utils';
	import { onMount } from 'svelte';
	import * as z from 'zod';

	export let valid = false;
	export let recordId = 0;
	export let readonly = false;

	let busy = true;
	let initialValues = {
		message: '',
		name: '',
		notes: '',
		isSystemTemplate: false,
		subject: ''
	};

	export const submit = () => {
		form.submit();
		return true;
	};
	let form: any;

	const schema = z.object({
		name: z.string().min(1, 'Name is required').min(3, 'Enter a valid name'),
		message: z.string().min(1, 'Message is required').min(3, 'Enter a valid message'),
		notes: z.string().optional(),
		isSystemTemplate: z.boolean(),
		subject: z.string().min(1, 'Subject is required').min(3, 'Enter a valid subject')
	});

	function handleForm({ detail }: any) {
		const { form } = detail;
		form.isValid.subscribe((val: boolean) => {
			valid = val;
		});
	}

	onMount(async () => {
		// if (!recordId) {
		// 	busy = false;
		// 	return;
		// }
		// try {
		// 	const res = await readMailTemplate(recordId);
		// 	if (res.success) {
		// 		const xs = res.data!;
		// 		initialValues = {
		// 			message: xs.message,
		// 			notes: xs.notes,
		// 			name: xs.name,
		// 			isSystemTemplate: xs.isSystemTemplate,
		// 			subject: xs.subject ?? ''
		// 		};
		// 	} else {
		// 		showError(res.message);
		// 	}
		// } catch (err: any) {
		// 	console.log(err);
		// 	showError(err?.message || err);
		// } finally {
		// 	busy = false;
		// }
	});
</script>

<Form
	{initialValues}
	class="flex flex-col gap-4"
	{schema}
	bind:this={form}
	on:submit
	on:change={handleForm}
>
	<TextField label="Name" name="name" required placeholder="Enter name of template" {readonly} />
	<TextField
		label="Subject"
		name="subject"
		required
		placeholder="Enter subject of template"
		{readonly}
	/>
	<TextEditor label="Message" name="message" required />
	<TextField label="Notes" name="notes" {readonly} />
	<ControlField label="Is a system template?" name="isSystemTemplate" type="checkbox" {readonly} />
</Form>
