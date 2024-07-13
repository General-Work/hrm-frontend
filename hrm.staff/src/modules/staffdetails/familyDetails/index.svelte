<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import ScrollArea from '$cmps/ui/scrollArea.svelte';
	import SlideDown from '$cmps/ui/slideDown.svelte';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import type { IFamilyDetails } from '$svc/staffdetails';
	import axios from 'axios';
	import * as z from 'zod';

	export let data: IFamilyDetails;
	let formData = {
		fathersName: data.fathersName || '',
		mothersName: data.mothersName || '',
		spouseName: data.spouseName || '',
		spousePhoneNumber: data.spousePhoneNumber || '',
		nextOfKIN: data.nextOfKIN || '',
		nextOfKINPhoneNumber: data.nextOfKINPhoneNumber || '',
		emergencyPerson: data.emergencyPerson || '',
		emergencyPersonPhoneNumber: data.emergencyPersonPhoneNumber || ''
	};
	let busy = false;
	const schema = z.object({
		fathersName: z.string().min(1, 'Required'),
		mothersName: z.string().min(1, 'Required'),
		spouseName: z.string().optional(),
		spousePhoneNumber: z.string().optional(),
		nextOfKIN: z.string().min(1, 'Required'),
		nextOfKINPhoneNumber: z.string().min(1, 'Required'),
		emergencyPerson: z.string().min(1, 'Required'),
		emergencyPersonPhoneNumber: z.string().min(1, 'Required')
	});

	async function handleSubmit({ detail }: CustomEvent) {
		const { values } = detail;
		try {
			startProgress();
			busy = true;
			const ret = await axios.post('/profile/family', values);
			if (!ret.data.success) {
				showError(ret.data.message);
				return;
			}
			showInfo('Successfully updated family details');
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
		<Form
			{schema}
			initialValues={formData}
			class="w-full h-full flex flex-col gap-6"
			on:submit={handleSubmit}
		>
			<Fieldset label="Parents' Info" icon="fluent-mdl2:edit-contact" kind="pink">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
					<TextField label="Father's Name" required name="fathersName" />
					<TextField label="Mother's Name" required name="mothersName" />
				</div>
			</Fieldset>
			<Fieldset label="Spouse's Info" icon="fluent-mdl2:edit-contact" kind="pink">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
					<TextField label="Name" name="spouseName" />
					<TextField label="Phone Number" name="spousePhoneNumber" />
				</div>
			</Fieldset>
			<Fieldset label="Next of Kin Info" icon="fluent-mdl2:edit-contact" kind="pink">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
					<TextField label="Name" required name="nextOfKIN" />
					<TextField label="Phone Number" required name="nextOfKINPhoneNumber" />
				</div>
			</Fieldset>
			<Fieldset label="Emergency Contact" icon="fluent-mdl2:edit-contact" kind="pink">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
					<TextField label="Name" required name="emergencyPerson" />
					<TextField label="Phone Number" required name="emergencyPersonPhoneNumber" />
				</div>
			</Fieldset>
			<div class="flex justify-end gap-2 md:pb-8 pt-3">
				<Button label="Reset" type="reset" />
				<Button label="Submit" type="submit" color="primary" {busy} />
			</div>
		</Form>
	</ScrollArea>
</SlideDown>
