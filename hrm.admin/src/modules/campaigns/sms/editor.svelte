<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextEditor from '$cmps/forms/textEditor.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import FileUpload from '$cmps/forms/fileUpload.svelte';
	import { scale } from 'svelte/transition';
	import DateField from '$cmps/forms/dateField.svelte';
	import * as z from 'zod';
	import TextAreaField from '$cmps/forms/textAreaField.svelte';
	import AlertDialog from '$cmps/alerts/alertDialog.svelte';
	import { onMount } from 'svelte';
	import { showError } from '$lib/utils';
	import { readSmsTemplates } from '$svc/setup';

	export let isValid = false;
	export let recordId = 0;

	let staff: any[] = [];
	let templates: any[] = [];
	let renderId = 0;
	let renderTemplate = 0;
	let selectedMessage = '';
	let showAlert = false;
	let frequency = ['Once', 'Weekly', 'Daily', 'Monthly', 'Yearly'];
	let formData = {
		department: [],
		endDate: '',
		file: null,
		frequency: '',
		directorate: [],
		unit: [],
		message: '',
		name: '',
		notes: '',
		staffNumbers: [],
		startDate: '',
		time: '',
		template: null
		// subject: ''
	};

	$: isOnce = formData.frequency.toLowerCase() === 'once';
	$: isWeekly = formData.frequency.toLowerCase() === 'weekly';
	$: isDaily = formData.frequency.toLowerCase() === 'daily';
	$: isMonthly = formData.frequency.toLowerCase() === 'monthly';
	$: isYearly = formData.frequency.toLowerCase() === 'yearly';

	const schema = z.object({
		name: z.string().min(1, 'Campaign name is required').min(3, 'Enter a valid campaign name '),
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
		form.isValid.subscribe((val: boolean) => {
			isValid = val;
		});
	}

	function setMessage() {
		renderId++;

		selectedMessage =
			(formData.template && templates.find((x) => x.id === formData.template)?.message) || '';
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

	export const submit = () => {
		form.submit();
		return true;
	};
	let form: any;

	onMount(async () => {
		try {
			const res = await readSmsTemplates();
			if (res.success) {
				const xs = res.data.items;
				templates = xs;
			} else {
				showError(res.message);
			}
		} catch (err: any) {
			console.log(err);
			showError(err?.message || err);
		}
	});
</script>

<Form
	initialValues={formData}
	class="px-5 py-2 flex flex-col gap-4"
	on:change={handleForm}
	{schema}
	on:submit
	bind:this={form}
>
	<TextField label="Name" name="name" required placeholder="Enter campaign name" />

	{#key renderTemplate}
		<SelectField
			label="SMS Template"
			name="template"
			clearable
			options={templates}
			placeholder="Select an initial message to use"
			on:change={templateChanged}
		/>
	{/key}
	<!-- <TextField label="Subject" name="subject" required placeholder="Enter campaign subject" /> -->
	{#key renderId}
		<TextAreaField rows={8} label="Message" name="message" required value={selectedMessage} />
	{/key}
	<SelectField
		label="Send to Individual Staff"
		options={staff}
		name="staffNumbers"
		placeholder="Select as many staff"
		createFilter={unknownParticipantFilter}
		creatable
		multiple
	/>
	<div class="grid grid-cols-3 gap-3">
		<SelectField label="Directorate" name="directorate" placeholder="Select directorate" multiple />
		<SelectField label="Department" name="department" placeholder="Select department" multiple />
		<SelectField label="Unit" name="unit" placeholder="Select unit" multiple />
	</div>
	<FileUpload label="Send using file" name="file" />
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
	</div></Form
>

<AlertDialog
	message="Are you sure want to replace the selected template's messge with the current message?."
	bind:open={showAlert}
	on:cancel={(_) => {
		showAlert = false;
		renderTemplate++;
	}}
	on:yes={setMessage}
/>
