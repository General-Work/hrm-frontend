<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import FileUpload from '$cmps/forms/fileUpload.svelte';
	import { scale } from 'svelte/transition';
	import DateField from '$cmps/forms/dateField.svelte';
	import * as z from 'zod';
	import TextAreaField from '$cmps/forms/textAreaField.svelte';
	import AlertDialog from '$cmps/alerts/alertDialog.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import Helper from '$cmps/alerts/helper.svelte';
	import type { IOkResult } from '$svc/shared';
	import Button from '$cmps/ui/button.svelte';
	import { postSmsCampaign } from '$svc/campaigns';
	// import Excel from '$lib/files/';

	// export let isValid = false;
	export let recordId = 0;
	export let optionalData: any;

	let staff: any[] = [];
	let busy = false;
	let templates: any[] = [];
	let renderId = 0;
	let renderTemplate = 0;
	let selectedMessage = '';
	let showAlert = false;
	let frequency = ['Once', 'Weekly', 'Daily', 'Monthly', 'Yearly'];
	let formData = {
		departmentId: [],
		endDate: '',
		templateFile: null,
		frequency: '',
		directorateId: [],
		unitId: [],
		message: '',
		campaingName: '',
		notes: '',
		staffIds: [],
		startDate: '',
		time: '',
		smsTemplateId: ''
		// subject: ''
	};

	const dispatch = createEventDispatcher();
	$: isOnce = formData.frequency.toLowerCase() === 'once';
	$: isWeekly = formData.frequency.toLowerCase() === 'weekly';
	$: isDaily = formData.frequency.toLowerCase() === 'daily';
	$: isMonthly = formData.frequency.toLowerCase() === 'monthly';
	$: isYearly = formData.frequency.toLowerCase() === 'yearly';
	$: activeTemplateName =
		(formData.smsTemplateId && templates.find((x) => x.id === formData.smsTemplateId).name) || '';
	const schema = z.object({
		campaingName: z
			.string()
			.min(1, 'Campaign name is required')
			.min(3, 'Enter a valid campaign name '),
		message: z.string().min(1, 'Message is required').min(3, 'Enter a valid campaign message '),
		frequency: z.string().min(1, 'Frequency is required'),
		// subject: z.string().min(1, 'Subject is required').min(3, 'Enter a valid subject message '),
		endDate: z.lazy(() =>
			isDaily || isWeekly || isMonthly || isYearly
				? z.string().min(1, 'End date is required')
				: z.string().optional()
		),
		startDate: z.lazy(() =>
			isOnce
				? z.string().min(1, 'Day for campaign is required')
				: isDaily || isWeekly || isMonthly || isYearly
					? z.string().min(1, 'Start date is required')
					: z.string().optional()
		),
		time: z.lazy(() =>
			isOnce || isDaily || isWeekly || isMonthly || isYearly
				? z.string().min(1, 'Time for campaign is required')
				: z.string().optional()
		)
	});

	function unknownParticipantFilter(inputValue: string, dropdownOptions: any) {
		// console.log(inputValue, dropdownOptions);
		if (!inputValue) return '';
		if (dropdownOptions.find((x: any) => x === inputValue)) return;
		return inputValue;
	}
	function handleForm({ detail }: any) {
		const { values, form } = detail;
		formData = values;
		// form.isValid.subscribe((val: boolean) => {
		// 	isValid = val;
		// });
	}

	function setMessage() {
		renderId++;

		selectedMessage =
			(formData.smsTemplateId && templates.find((x) => x.id === formData.smsTemplateId)?.message) ||
			'';
		showAlert = false;
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

	onMount(async () => {
		if (optionalData.templates) {
			try {
				const ret: IOkResult<any> = await optionalData.templates;
				if (!ret.success) {
					showError(ret.message);
					return;
				}
				templates = ret.data;
			} catch (error: any) {
				showError(error);
			}
			// if (data.id) {
			// 	formData = { name: data.specialityName, category: data.categoryId };
			// 	renderId++;
			// }
		}
	});

	async function handSubmit({ detail }: any) {
		const { values } = detail;
		try {
			busy = true;
			startProgress();
			const ret = await postSmsCampaign(values);
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			showInfo(ret.message);
			dispatch('done');
		} catch (error: any) {
			showError(error);
		} finally {
			busy = false;
			endProgress();
		}
	}
</script>

<Form
	initialValues={formData}
	class="px-5 py-2 flex flex-col gap-4"
	on:change={handleForm}
	{schema}
	on:submit={handSubmit}
	let:isValid
>
	<TextField label="Name" name="campaingName" required placeholder="Enter campaign name" />

	{#key renderTemplate}
		<SelectField
			label="Template"
			name="smsTemplateId"
			clearable
			options={templates}
			placeholder="Select an initial message to use"
			on:change={templateChanged}
		/>
	{/key}
	<!-- <TextField label="Subject" name="subject" required placeholder="Enter campaign subject" /> -->
	{#key renderId}
		<TextAreaField rows={7} label="Message" name="message" required value={selectedMessage} />
	{/key}
	<SelectField
		label="Send to Individual Staff"
		options={staff}
		name="staffIds"
		placeholder="Select as many staff"
		createFilter={unknownParticipantFilter}
		creatable
		multiple
	/>
	<div class="grid grid-col-1 md:grid-cols-2 gap-4">
		<SelectField
			label="Directorate"
			name="directorateId"
			placeholder="Select directorate"
			multiple
		/>
		<SelectField label="Department" name="departmentId" placeholder="Select department" multiple />
		<SelectField label="Unit" name="unitId" placeholder="Select unit" multiple />
		<SelectField label="Profession" name="professionId" placeholder="Select profession" multiple />
	</div>
	<div class="space-y-4" class:hidden={!(activeTemplateName === 'New Recruitment')}>
		<Helper>
			<div class="space-y-1">
				<p>Click on the button below to download template for campaign</p>
				<a
					class="bg-blue-500 hover:bg-blue-600 text-white rounded-[5px] text-sm px-3 py-1.5"
					href="/new_recruitment.xlsx"
					download
					target="_blank"
				>
					Download
				</a>
			</div>
		</Helper>
		<FileUpload
			label="Send using file"
			name="templateFile"
			required
			acceptedFileTypes={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
		/>
	</div>
	<SelectField
		label="Frequency"
		placeholder="Select frequency"
		required
		name="frequency"
		options={frequency}
		labelAsValue
	/>
	<div in:scale class:hidden={!formData.frequency}>
		<div class="grid gap-3" class:grid-cols-2={isWeekly || isDaily || isMonthly || isYearly}>
			<DateField name="startDate" label="Start Date" required placeholder="Select start date" />
			<div class:hidden={isOnce}>
				<DateField name="endDate" label="End Date" required placeholder="Select end date" />
			</div>
		</div>
	</div>
	<div class:hidden={!formData.frequency}>
		<DateField
			label="Time"
			name="time"
			dateFormat="H:i"
			altFormat="H:i"
			enableTime
			noCalendar
			placeholder="Select time"
			required
		/>
	</div>
	<div class="py-4 grid">
		<Button label="Submit" type="submit" {busy} disabled={busy || !isValid} color="primary" />
	</div>
</Form>

<AlertDialog
	message="Are you sure want to replace the selected template's messge with the current message?."
	bind:open={showAlert}
	on:cancel={(_) => {
		showAlert = false;
		renderTemplate++;
	}}
	on:yes={setMessage}
/>
