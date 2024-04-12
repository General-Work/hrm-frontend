<script lang="ts">
	import ControlField from '$cmps/forms/controlField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import TextAreaField from '$cmps/forms/textAreaField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Box from '$cmps/ui/box.svelte';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
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
		isSystemTemplate: false
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
		isSystemTemplate: z.boolean()
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
		// 	const res = await readSmsTemplate(recordId);
		// 	if (res.success) {
		// 		const xs = res.data;
		// 		initialValues = {
		// 			message: xs.message,
		// 			notes: xs.notes,
		// 			name: xs.name,
		// 			isSystemTemplate: xs.isSystemTemplate
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

<Box otherClasses="px-4 pt-3">
	<Form
		{initialValues}
		class="flex flex-col gap-5"
		{schema}
		bind:this={form}
		on:submit
		on:change={handleForm}
	>
		<TextField label="Name" name="name" required placeholder="Enter name of template" {readonly} />
		<TextAreaField
			label="Message"
			name="message"
			required
			placeholder="Enter template message"
			{readonly}
			rows={10}
		/>
		<TextField label="Notes" name="notes" {readonly} />

	</Form>
</Box>
