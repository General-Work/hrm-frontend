<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import ScrollArea from '$cmps/ui/scrollArea.svelte';
	import SlideDown from '$cmps/ui/slideDown.svelte';
	import { DISABILITYLIST, TITLELIST } from '$lib/constants';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import type { IBiodata } from '$svc/staffdetails';
	import axios from 'axios';
	import * as z from 'zod';
	export let data: IBiodata;

	let init = {
		title: data.title || '',
		gpsAddress: data.gpsAddress || '',
		firstName: data.firstName || '',
		lastName: data.lastName || '',
		otherNames: data.otherNames || '',
		phone: data.phone || '',
		gender: data.gender || '',
		snnitNumber: data.snnitNumber || '',
		email: data.email || '',
		disability: data.disability || '',
		phoneTwo: '',
		ecowasCardNumber: data.ecowasCardNumber || ''
	};
	let busy = false;
	const schema = z.object({});

	async function handleSubmit({ detail }: CustomEvent) {
		const { values } = detail;
		try {
			startProgress();
			busy = true;
			const d = {
				title: values.title,
				gpsAddress: values.gpsAddress || '',
				firstName: values.firstName || '',
				lastName: values.lastName || '',
				otherNames: values.otherNames || '',
				phone: values.phone || '',
				gender: values.gender || '',
				snnitNumber: values.snnitNumber || '',
				email: values.email || '',
				disability: values.disability || '',
				ecowasCardNumber: values.ecowasCardNumber || ''
			};
			const ret = await axios.post('/profile/biodata', d);
			if (!ret.data.success) {
				showError(ret.data.message);
				return;
			}
			showInfo('Successfully updated biodata');
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			busy = false;
			endProgress();
		}
	}
</script>

<SlideDown>
	<ScrollArea otherClasses="w-full h-full pt-3 px-1">
		<Fieldset label="Contact Info" icon="fluent-mdl2:edit-contact" kind="pink">
			<Form
				initialValues={init}
				{schema}
				class="w-full h-full flex flex-col gap-6"
				on:submit={handleSubmit}
			>
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
					<SelectField label="Title" required name="title" options={TITLELIST} labelAsValue />
					<TextField label="First name" required name="firstName" />
					<TextField label="Last Name" required name="lastName" />
					<TextField label="Other name(s)" name="otherNames" />
					<!-- <SelectField label="Gender" required name="gender" /> -->
					<!-- <DateField label="Date of Birth" required /> -->
					<TextField label="ECOWAS Card No." name="ecowasCardNumber" />
					<TextField label="SSNIT No." name="snnitNumber" />
					<TextField label="Phone One" name="phone" />
					<TextField label="Phone Two" name="phoneTwo" />
					<TextField label="Email" />
					<TextField label="GPS Address" name="gpsAddress" />
					<SelectField
						label="Disability"
						required
						name="disability"
						options={DISABILITYLIST}
						labelAsValue
					/>
				</div>
				<div class="flex justify-end gap-2 md:pb-8 pt-3">
					<Button label="Reset" type="reset" />
					<Button label="Submit" type="submit" color="primary" {busy} />
				</div>
			</Form>
		</Fieldset>
	</ScrollArea>
</SlideDown>
