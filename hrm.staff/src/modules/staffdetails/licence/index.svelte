<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import {
		postProfessionalLicence,
		readProfessionalBodies,
		readProfessionalLicence,
		type IProfessionalBody
	} from '$svc/staffdetails';
	import axios from 'axios';
	import dayjs from 'dayjs';
	import { Alert } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import * as z from 'zod';
	let bodies: any[] = [];

	const schema = z.object({
		professionalBodyId: z.string().min(1, 'Required'),
		pin: z.string().min(1, 'Required'),
		issuedDate: z.string().min(1, 'Required'),
		expiryDate: z.string().min(1, 'Required')
	});

	let init = {
		professionalBodyId: '',
		pin: '',
		issuedDate: null,
		expiryDate: null
	};
	let busy = false;
	let renderId = 0;
	let readonly = false;
	let isLoading = true;

	async function handleSubmit({ detail }: CustomEvent) {
		const { values } = detail;
		try {
			startProgress();
			busy = true;
			const ret = await postProfessionalLicence({
				...values,
				issuedDate: dayjs(values.issuedDate).format('YYYY-MM-DD'),
				expiryDate: dayjs(values.expiryDate).format('YYYY-MM-DD')
			});
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			showInfo('Successfully updated accomodation details');
			await fetchData();
			renderId++;
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			busy = false;
			endProgress();
		}
	}

	async function fetchData() {
		try {
			const ret = await readProfessionalLicence();
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			init = {
				professionalBodyId: ret.data.professionalBodyId,
				pin: ret.data.pin,
				issuedDate: ret.data.issuedDate,
				expiryDate: ret.data.expiryDate
			};
			readonly = ret.data.status === 'PENDING';
		} catch (error: any) {
			showError(error?.message || error);
		}
	}

	onMount(async () => {
		try {
			const ret = await readProfessionalBodies();
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			bodies = ret.data.map((a: IProfessionalBody) => ({
				value: a.id,
				label: a.name
			}));
		} catch (error: any) {
			showError(error?.message || error);
		}
		await fetchData();
		isLoading = false;
	});
</script>

{#if isLoading}
	<div class="w-full h-full"><PageLoader size={50} /></div>
{:else}
	<Fieldset label="Professional Details" kind="pink" icon="gridicons:institution">
		{#key renderId}
			<Form {schema} initialValues={init} class="space-y-6" on:submit={handleSubmit}>
				{#if readonly}
					<Alert color="blue">Your Professional Licence information is under review</Alert>
				{/if}
				<SelectField
					label="Professional Body"
					placeholder="Select professional body"
					required
					name="professionalBodyId"
					options={bodies}
					{readonly}
				/>
				<TextField label="PIN" name="pin" placeholder="Enter your PIN" required {readonly} />
				<DateField
					label="Issue Date"
					placeholder="Select pin issue date"
					name="issuedDate"
					required
					maxDate={dayjs().toDate()}
					{readonly}
				/>
				<DateField
					label="Expiry Date"
					placeholder="Select pin expiry date"
					name="expiryDate"
					required
					minDate={dayjs().toDate()}
					{readonly}
				/>
				<div class:hidden={readonly} class="flex justify-end gap-2 md:pb-8 pt-3">
					<Button label="Reset" type="reset" />
					<Button label="Submit" type="submit" color="primary" {busy} />
				</div>
			</Form>
		{/key}
	</Fieldset>
{/if}
