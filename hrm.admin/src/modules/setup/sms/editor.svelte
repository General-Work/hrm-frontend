<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import TextAreaField from '$cmps/forms/textAreaField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Box from '$cmps/ui/box.svelte';
	import type { ICampaignTemplate } from '$svc/setup';
	import { onMount } from 'svelte';
	import * as z from 'zod';

	export let valid = false;
	export let recordId = '';
	export let readonly = false;
	export let edit = false;
	export let data: ICampaignTemplate | null;

	let renderId = 0;
	let initialValues = {
		message: '',
		name: '',
		description: ''
	};

	export const submit = () => {
		form.submit();
		return true;
	};
	let form: any;

	const schema = z.object({
		name: z.string().min(1, 'Name is required').min(3, 'Enter a valid name'),
		message: z.string().min(1, 'Message is required').min(3, 'Enter a valid message'),
		description: z.string().optional()
	});

	function handleForm({ detail }: any) {
		const { form } = detail;
		form.isValid.subscribe((val: boolean) => {
			valid = val;
		});
	}

	onMount(() => {
		if (data) {
			initialValues = {
				message: data.message,
				name: data.name,
				description: data.description
			};
			renderId++;
		}
	});
</script>

{#key renderId}
	<Box otherClasses="px-4 pt-3">
		<Form
			{initialValues}
			class="flex flex-col gap-5"
			{schema}
			bind:this={form}
			on:submit
			on:change={handleForm}
		>
			<TextField
				label="Name"
				name="name"
				required
				placeholder="Enter name of template"
				readonly={readonly
					? true
					: !readonly && initialValues.name === 'New Recruitment'
						? true
						: false}
			/>
			<TextAreaField
				label="Message"
				name="message"
				required
				placeholder="Enter template message"
				{readonly}
				rows={9}
			/>
			<TextAreaField label="Description" name="description" {readonly} />
		</Form>
	</Box>
{/key}
