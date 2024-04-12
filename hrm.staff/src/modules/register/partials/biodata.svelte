<script lang="ts" context="module">
	export interface IBIODATA {
		citizenship: string;
		passportNumber: string;
		disability: string;
		title: string;
		firstName: string;
		surname: string;
		otherNames: string;
		gender: string;
		dateOfBirth: string | null;
		ssnitNo: string;
		phoneOne: string;
		phoneTwo: string;
		ecowasCard: string;
		email: string;
		gpsAddress: string;
	}
</script>

<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';

	import { CITIZENSHIPLIST, DISABILITYLIST, GENDERLIST, TITLELIST } from '$types/constants';
	import { validateGhanaCard, validatePhoneNumber } from '$types/utils';
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import * as z from 'zod';
	import { ctxKey, type IMember } from '../bioData.svelte';

	let data: IBIODATA = {
		citizenship: '',
		passportNumber: '',
		disability: '',
		title: '',
		firstName: '',
		surname: '',
		otherNames: '',
		gender: '',
		dateOfBirth: null,
		ssnitNo: '',
		phoneOne: '',
		phoneTwo: '',
		ecowasCard: '',
		email: '',
		gpsAddress: ''
	};
	let isValid = false;
	let busy = false;
	let renderId = 0;
	// $: if ($store.personalInfo.title) {
	// 	data = $store.personalInfo;
	// }

	let store: Readable<IMember> = getContext(ctxKey);
	onMount(() => {
		if ($store.personalInfo) {
			data = $store.personalInfo;
			renderId++;
		}
	});

	const dispatch = createEventDispatcher();

	function handleChange({ detail }: any) {
		const { values } = detail;
		data = values;
	}
	function handleSubmit({ detail }: any) {
		const { values } = detail;
		dispatch('message', { type: 'personalInfo', data: values });
	}

	const schema = z.object({
		citizenship: z.string().min(1, 'Citizenship is required'),
		passportNumber: z.lazy(() =>
			data.citizenship === 'NON-GHANAIAN'
				? z.string().min(1, 'Passport Number is required')
				: z.string().optional()
		),
		disability: z.string().min(1, 'Disability is required'),
		title: z.string().min(1, 'Title is required'),
		firstName: z.string().min(1, 'First Name is required'),
		surname: z.string().min(1, 'Surname is required'),
		otherNames: z.string().optional(),
		gender: z.string().min(1, 'Gender is required'),
		dateOfBirth: z
			.string({ invalid_type_error: 'Date of birth is required' })
			.min(1, 'Date of birth is required'),
		ssnitNo: z.string().optional(),
		phoneOne: z.string().min(1, 'Phone One is required').refine(validatePhoneNumber, {
			message: 'Invalid phone number format. Please enter a 10-digit phone number.'
		}),
		phoneTwo: z.string().optional(),
		ecowasCard: z.lazy(() =>
			data.citizenship === 'GHANAIAN'
				? z
						.string()
						.min(1, 'ECOWAS Card is required')
						.refine((value) => validateGhanaCard(value), { message: 'Invalid Ghana card format' })
				: z.string().optional()
		),
		email: z.string().refine((c) => (c.length ? z.string().optional() : z.string().email())),
		gpsAddress: z.string().optional()
	});
</script>

{#key renderId}
	<Form
		class="w-full h-full flex flex-col gap-6"
		initialValues={data}
		on:change={handleChange}
		on:submit={handleSubmit}
		{schema}
	>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<SelectField
				label="Title"
				required
				placeholder="Select an option"
				name="title"
				options={TITLELIST}
				labelAsValue
			/>
			<TextField label="First name" required placeholder="Enter your first name" name="firstName" />
			<TextField label="Surname" required placeholder="Enter your surname" name="surname" />
			<TextField
				label="Other name(s)"
				placeholder="Enter your other name(s) if any"
				name="otherNames"
			/>
			<SelectField
				label="Gender"
				required
				placeholder="Select an option"
				name="gender"
				options={GENDERLIST}
				labelAsValue
			/>
			<SelectField
				label="Citizenship"
				required
				placeholder="Select your citizen"
				options={CITIZENSHIPLIST}
				name="citizenship"
				labelAsValue
			/>
			<div class:hidden={!(data.citizenship === 'GHANAIAN')}>
				<TextField
					label="ECOWAS Card No."
					placeholder="GHA-123456789-0"
					name="ecowasCard"
					required={data.citizenship === 'GHANAIAN' ? true : false}
				/>
			</div>
			<div class:hidden={!(data.citizenship === 'NON-GHANAIAN')}>
				<TextField
					label="Passport No."
					placeholder="Enter your passport number"
					name="passportNumber"
					required={data.citizenship === 'NON-GHANAIAN' ? true : false}
				/>
			</div>
			<DateField
				label="Date of Birth"
				required
				placeholder="Select your date of birth"
				name="dateOfBirth"
			/>
			<TextField label="SSNIT No." name="ssnitNo" />
			<TextField label="Phone 1" placeholder="0240 123 456" required name="phoneOne" />
			<TextField label="Phone 2" placeholder="0240 123 456" name="phoneTwo" />
			<TextField label="Email" name="email" />
			<TextField label="GPS Address" placeholder="GA-123-0123" name="gpsAddress" />
		</div>
		<SelectField
			label="Disability"
			required
			placeholder="Select an option"
			name="disability"
			options={DISABILITYLIST}
			labelAsValue
		/>
		<slot {isValid} {busy} />
	</Form>
{/key}
