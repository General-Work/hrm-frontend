<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import ScrollArea from '$cmps/ui/scrollArea.svelte';
	import SlideDown from '$cmps/ui/slideDown.svelte';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import { postFamilyDetails, readFamilyDetails, type IFamilyDetails } from '$svc/staffdetails';
	import axios from 'axios';
	import { Alert } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import * as z from 'zod';

	let formData = {
		fathersName: '',
		mothersName: '',
		spouseName: '',
		spousePhoneNumber: '',
		nextOfKIN: '',
		nextOfKINPhoneNumber: '',
		emergencyPerson: '',
		emergencyPersonPhoneNumber: ''
	};
	let busy = false;
	let readonly = false;
	let isLoading = true;
	let renderId = 0;
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
			const ret = await postFamilyDetails(values);
			// const ret = await axios.post('/profile/family', values);
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			showInfo('Successfully updated family details');
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
			const ret = await readFamilyDetails();
			if (!ret.success) {
				showError(ret.message);
				return;
			}

			formData = {
				fathersName: ret.data.fathersName,
				mothersName: ret.data.mothersName,
				spouseName: ret.data.spouseName,
				spousePhoneNumber: ret.data.spousePhoneNumber,
				nextOfKIN: ret.data.nextOfKIN,
				nextOfKINPhoneNumber: ret.data.nextOfKINPhoneNumber,
				emergencyPerson: ret.data.emergencyPerson,
				emergencyPersonPhoneNumber: ret.data.emergencyPersonPhoneNumber
			};
			readonly = ret.data.status === "PENDING"
		} catch (error: any) {
			showError(error?.message || error);
		}
	}

	onMount(async () => {
		await fetchData();
		isLoading = false;
	});
</script>

{#if isLoading}
	<div class="w-full h-full">
		<PageLoader size={50} />
	</div>
{:else}
	<SlideDown>
		<ScrollArea otherClasses="w-full h-full pt-3 px-1">
			{#key renderId}
				<Form
					{schema}
					initialValues={formData}
					class="w-full h-full flex flex-col gap-6"
					on:submit={handleSubmit}
				>
					{#if readonly}
						<Alert color="blue">Your family information is under review</Alert>
					{/if}
					<Fieldset label="Parents' Info" icon="fluent-mdl2:edit-contact" kind="pink">
						<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
							<TextField label="Father's Name" required name="fathersName" {readonly} />
							<TextField label="Mother's Name" required name="mothersName" {readonly} />
						</div>
					</Fieldset>
					<Fieldset label="Spouse's Info" icon="fluent-mdl2:edit-contact" kind="pink">
						<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
							<TextField label="Name" name="spouseName" {readonly} />
							<TextField label="Phone Number" name="spousePhoneNumber" {readonly} />
						</div>
					</Fieldset>
					<Fieldset label="Next of Kin Info" icon="fluent-mdl2:edit-contact" kind="pink">
						<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
							<TextField label="Name" required name="nextOfKIN" {readonly} />
							<TextField label="Phone Number" required name="nextOfKINPhoneNumber" {readonly} />
						</div>
					</Fieldset>
					<Fieldset label="Emergency Contact" icon="fluent-mdl2:edit-contact" kind="pink">
						<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
							<TextField label="Name" required name="emergencyPerson" {readonly} />
							<TextField
								label="Phone Number"
								required
								name="emergencyPersonPhoneNumber"
								{readonly}
							/>
						</div>
					</Fieldset>
					<div class:hidden={readonly} class="flex justify-end gap-2 md:pb-8 pt-3">
						<Button label="Reset" type="reset" />
						<Button label="Submit" type="submit" color="primary" {busy} />
					</div>
				</Form>
			{/key}
		</ScrollArea>
	</SlideDown>
{/if}
