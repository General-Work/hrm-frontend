<script lang="ts">
	import AlertDialog from '$cmps/alerts/alertDialog.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextAreaField from '$cmps/forms/textAreaField.svelte';
	import type { IStaffByID } from '$lib/types';
	import { showError } from '$lib/utils';
	import { readSmsTemplates, type ICampaignTemplate } from '$svc/setup';
	import { createEventDispatcher, onMount } from 'svelte';
	import { z } from 'zod';

	export let selectedItems: IStaffByID[] = [];
	export let isValid = false;
	export const submit = () => {
		form.submit();
		return true;
	};
	let form: any;

	let formData = {
		message: '',
		smsTemplateId: ''
	};
	let templates: any[] = [];
	let renderId = 0;
	let renderTemplate = 0;
	let selectedMessage = '';
	let showAlert = false;

	const dispatch = createEventDispatcher();

	const schema = z.object({});
	$: if (selectedItems.length > 0 && formData.message) {
		isValid = true;
	} else {
		isValid = false;
	}

	function templateChanged({ detail }: any) {
		// console.log(detail);
		if (detail) {
			if (formData.message) {
				showAlert = true;
			} else {
				selectedMessage = detail.message;
				renderId++;
			}
		} else {
			selectedMessage = '';
			renderId++;
		}
	}

	function setMessage() {
		renderId++;

		selectedMessage =
			(formData.smsTemplateId && templates.find((x) => x.id === formData.smsTemplateId)?.message) ||
			'';
		showAlert = false;
	}

	function handleForm({ detail }: any) {
		const { values, form } = detail;
		formData = values;
	}

	onMount(async () => {
		try {
			const ret = await readSmsTemplates();
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			templates = ret.data.map((x: ICampaignTemplate) => ({
				id: x.id,
				name: x.name,
				message: x.message
			}));
		} catch (error: any) {
			showError(error?.message || error);
		}
	});
</script>

<div class="w-full h-full px-4 py-2">
	<fieldset class="flex flex-wrap gap-3 bg-blue-50 shadow p-3 rounded-md">
		<legend class="text-sm bg-blue-500 text-white rounded-[5px] px-2 py-0.5">Selected Staff</legend>
		{#each selectedItems as item}
			<div class="bg-orange-300 px-1.5 py-1 flex items-center gap-1 rounded-[4px]">
				<p class="text-xs">{item.lastName} - {item.staffIdentificationNumber}</p>
				<iconify-icon
					icon="ic:round-close"
					style="font-size: 15px;"
					role="button"
					class="hover:text-red-600"
					on:click={() => dispatch('removeItem', item)}
					tabindex="0"
					on:keydown={() => dispatch('removeItem', item)}
				/>
			</div>
		{/each}
	</fieldset>

	<Form
		initialValues={formData}
		{schema}
		on:change={handleForm}
		class="space-y-4 pt-4"
		on:submit
		bind:this={form}
	>
		{#key renderTemplate}
			<SelectField
				label="Templates"
				options={templates}
				name="smsTemplateId"
				on:change={templateChanged}
			/>
		{/key}
		{#key renderId}
			<TextAreaField label="Message" required rows={7} name="message" value={selectedMessage} />
		{/key}
	</Form>
</div>

<AlertDialog
	message="Are you sure want to replace the selected template's messge with the current message?."
	bind:open={showAlert}
	on:cancel={(_) => {
		showAlert = false;
		renderTemplate++;
	}}
	on:yes={setMessage}
/>
