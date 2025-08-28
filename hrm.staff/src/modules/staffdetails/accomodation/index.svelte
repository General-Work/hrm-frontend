<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import { ACCOMODATIONSOURCE, ACCOMODATIONTYPE } from '$lib/constants';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import type { IAccomodationDetails } from '$svc/staffdetails';
	import axios from 'axios';
	import dayjs from 'dayjs';
	import { Alert } from 'flowbite-svelte';
	import * as z from 'zod';

	export let data: IAccomodationDetails;

	let init = {
		source: data.source || '',
		gpsAddress: data.gpsAddress || '',
		accomodationType: data.accomodationType || '',
		flatNumber: data.flatNumber || '',
		allocationDate: data.allocationDate || null
	};
	let busy = false;
	let readonly = data?.status === 'PENDING';
	const schema = z
		.object({
			source: z.enum(['OFFICIAL', 'RENTED', 'PERSONAL']),
			gpsAddress: z.string().min(1, 'Required'),
			accomodationType: z.string().min(1, 'Required'),
			allocationDate: z.string().nullable(),
			flatNumber: z.string().optional()
		})
		.superRefine((data, ctx) => {
			if (data.source === 'OFFICIAL' && !data.allocationDate) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Required',
					path: ['allocationDate']
				});
			}
		});

	function handleChange({ detail }: any) {
		const { values } = detail;
		init = values;
	}

	async function handleSubmit({ detail }: CustomEvent) {
		const { values } = detail;
		try {
			startProgress();
			busy = true;
			const ret = await axios.post('/profile/accomodation', {
				...values,
				allocationDate: values.allocationDate
					? dayjs(values.allocationDate).format('YYYY-MM-DD')
					: ''
			});
			if (!ret.data.success) {
				showError(ret.data.message);
				return;
			}
			showInfo('Successfully updated accomodation details');
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			busy = false;
			endProgress();
		}
	}
</script>

<Fieldset label="Accomodation Details" kind="pink">
	<Form
		{schema}
		initialValues={init}
		class="space-y-6"
		on:change={handleChange}
		on:submit={handleSubmit}
	>
		{#if readonly}
			<Alert color="blue">Your accomodation information is under review</Alert>
		{/if}
		<SelectField
			options={ACCOMODATIONSOURCE}
			label="Source"
			placeholder="Select accomodation source"
			name="source"
			required
			labelAsValue
			{readonly}
		/>
		<TextField
			label="GPS Address"
			name="gpsAddress"
			required
			placeholder="Enter your GPS address"
			{readonly}
		/>
		<SelectField
			options={ACCOMODATIONTYPE}
			placeholder="Select accomodation type"
			name="accomodationType"
			label="Accomodation Type"
			required
			labelAsValue
			{readonly}
		/>
		<TextField label="Enter flat number" name="flatNumber" {readonly} />
		<div class:hidden={!(init.source === 'OFFICIAL')}>
			<DateField
				label="Select allocation date"
				name="allocationDate"
				required={init.source === 'OFFICIAL'}
				maxDate={dayjs().toDate()}
				{readonly}
			/>
		</div>
		<div class:hidden={readonly} class="flex justify-end gap-2 md:pb-8 pt-3">
			<Button label="Reset" type="reset" />
			<Button label="Submit" type="submit" color="primary" {busy} />
		</div>
	</Form>
</Fieldset>
