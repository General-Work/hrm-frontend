<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import { DISABILITYLIST, TITLELIST } from '$lib/constants';
	import type { IStaff } from '$lib/types';
	import { showError } from '$lib/utils';
	import { readSpecialties, type ISpecialty } from '$svc/salaries';
	import { onMount } from 'svelte';
	import * as z from 'zod';

	export let isValid = false;
	export let data: IStaff;
	export const submit = () => {
		form.submit();
		return true;
	};
	let form: any;

	let initialValues = {
		title: data?.title || '',
		firstName: data?.firstName || '',
		lastName: data?.lastName || '',
		otherNames: data?.otherNames || '',
		staffIdentificationNumber: data?.staffIdentificationNumber || '',
		dateOfBirth: data?.dateOfBirth || null,
		phone: data?.phone || '',
		phoneTwo: data?.phoneTwo || '',
		gender: data?.gender || '',
		snnitNumber: data?.snnitNumber || '',
		ecowasCardNumber: data?.ecowasCardNumber || '',
		email: data?.email || '',
		gpsAddress: data?.gpsAddress || '',
		specialityId: data?.specialityId || null,
		disability: data?.disability || ''
	};

	const schema = z.object({
		title: z.string().min(1, 'Required'),
		firstName: z.string().min(1, 'Required'),
		lastName: z.string().min(1, 'Required'),
		otherNames: z.string().optional(),
		staffIdentificationNumber: z.string().min(1, 'Required'),
		dateOfBirth: z.string().min(1, 'Required'),
		phone: z.string().min(1, 'Required'),
		phoneTwo: z.string().optional(),
		gender: z.string().min(1, 'Required'),
		snnitNumber: z.string().min(1, 'Required'),
		ecowasCardNumber: z.string().min(1, 'Required'),
		email: z.string().email(),
		gpsAddress: z.string().optional(),
		// specialityId: z.string().optional(),
		disability: z.string().min(1, 'Required')
	});
	let specialty: any[] = [];
	let isLoading = true;

	function handleChange({ detail }: any) {
		const { form } = detail;

		form.isValid.subscribe((val: boolean) => {
			isValid = val;
		});
	}

	onMount(async () => {
		try {
			const ret = await readSpecialties();
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			specialty = ret.data.map((a: ISpecialty) => ({
				value: a.id,
				label: a.specialityName
			}));
		} catch (error: any) {
			showError(error?.message || error);
		} finally {
			isLoading = false;
		}
	});
</script>

{#if isLoading}
	<div class="w-full h-full"><PageLoader size={50} /></div>
{:else}
	<Form
		{initialValues}
		{schema}
		class="p-4 space-y-4"
		on:change={handleChange}
		on:submit
		bind:this={form}
	>
		<div class="grid grid-cols-2 gap-3">
			<SelectField name="title" label="Title" options={TITLELIST} labelAsValue required />
			<TextField name="firstName" label="First Name" required />
			<TextField name="lastName" label="Last Name" required />
			<TextField name="otherNames" label="Other names" />
			<TextField name="staffIdentificationNumber" label="Staff Number" required />
			<DateField name="dateOfBirth" label="Date of Birth" required />
			<TextField name="phone" label="Phone Number" required type="tel" />
			<TextField name="phoneTwo" label="Phone Number 2" type="tel" />
			<SelectField
				name="gender"
				label="Gender"
				options={['MALE', 'FEMALE']}
				labelAsValue
				required
			/>
			<TextField label="SSNIT No." name="snnitNumber" required />
			<TextField label="ECOWAS Card No." name="ecowasCardNumber" required />
			<TextField label="Email" name="email" type="email" required />
			<TextField label="GPS Address" name="gpsAddress" />
		</div>
		<SelectField name="specialityId" label="Speciality" options={specialty} />
		<SelectField
			label="Disability"
			required
			name="disability"
			options={DISABILITYLIST}
			labelAsValue
		/>
	</Form>
{/if}
