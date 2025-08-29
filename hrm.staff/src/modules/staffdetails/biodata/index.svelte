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
	import { DISABILITYLIST, TITLELIST } from '$lib/constants';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import { getBiodata, postBiodata, type IBiodata } from '$svc/staffdetails';
	import { Alert } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import * as z from 'zod';

	let init = {
		title: '',
		gpsAddress: '',
		firstName: '',
		lastName: '',
		otherNames: '',
		phone: '',
		gender: '',
		snnitNumber: '',
		email: '',
		disability: '',
		phoneTwo: '',
		ecowasCardNumber: ''
	};
	let isLoading = true;
	let busy = false;
	let readonly = false;
	let render = 0;
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
				ecowasCardNumber: values.ecowasCardNumber || '',
				phoneTwo: values.phoneTwo || ''
			};
			const ret = await postBiodata(d);
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			showInfo('Successfully updated biodata');
			await fetchData();
			render++;
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			busy = false;
			endProgress();
		}
	}

	async function fetchData() {
		try {
			const ret = await getBiodata();
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			readonly = ret.data.status === 'PENDING';
			init = {
				phoneTwo: ret.data?.phoneTwo,
				title: ret.data?.title ? ret.data.title.toUpperCase() : '',
				gpsAddress: ret.data?.gpsAddress,
				firstName: ret.data?.firstName,
				lastName: ret.data?.lastName,
				otherNames: ret.data?.otherNames,
				phone: ret.data?.phone,
				gender: ret.data?.gender,
				snnitNumber: ret.data?.snnitNumber,
				email: ret.data?.email,
				disability: ret.data?.disability,
				ecowasCardNumber: ret.data?.ecowasCardNumber
			};
			// render;
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
			<Fieldset label="Contact Info" icon="fluent-mdl2:edit-contact" kind="pink">
				{#key render}
					<Form
						initialValues={init}
						{schema}
						class="w-full h-full flex flex-col gap-6"
						on:submit={handleSubmit}
					>
						{#if readonly}
							<Alert color="blue">Your contact information is under review</Alert>
						{/if}
						<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
							<SelectField
								label="Title"
								required
								name="title"
								options={TITLELIST}
								labelAsValue
								{readonly}
							/>
							<TextField label="First name" required name="firstName" {readonly} />
							<TextField label="Last Name" required name="lastName" {readonly} />
							<TextField label="Other name(s)" name="otherNames" {readonly} />
							<!-- <SelectField label="Gender" required name="gender" /> -->
							<!-- <DateField label="Date of Birth" required /> -->
							<TextField label="ECOWAS Card No." name="ecowasCardNumber" {readonly} />
							<TextField label="SSNIT No." name="snnitNumber" {readonly} />
							<TextField label="Phone One" name="phone" {readonly} />
							<TextField label="Phone Two" name="phoneTwo" {readonly} />
							<TextField label="Email" name="email" {readonly} />
							<TextField label="GPS Address" name="gpsAddress" {readonly} />
							<SelectField
								label="Disability"
								required
								name="disability"
								options={DISABILITYLIST}
								labelAsValue
								{readonly}
							/>
						</div>
						<div class:hidden={readonly} class="flex justify-end gap-2 md:pb-8 pt-3">
							<Button label="Reset" type="reset" />
							<Button label="Submit" type="submit" color="primary" {busy} />
						</div>
					</Form>
				{/key}
			</Fieldset>
		</ScrollArea>
	</SlideDown>
{/if}
