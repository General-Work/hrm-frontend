<script lang="ts" context="module">
	export interface IBIODATA {
		citizenship: string;
		passportNumber: string;
		disability: string;
		title: string;
		firstName: string;
		surName: string;
		otherNames: string;
		gender: string;
		dateOfBirth: string | null;
		ssnitNumber: string;
		phoneOne: string;
		phoneTwo: string;
		ecowasCardNumber: string;
		email: string;
		gpsAddress: string;
	}
</script>

<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';

	import { CITIZENSHIPLIST, DISABILITYLIST, GENDERLIST, TITLELIST } from '$lib/constants';
	import { validateGhanaCard, validatePhoneNumber } from '$lib/utils';
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import * as z from 'zod';
	import { ctxKey, member, type IMember } from '../bioData.svelte';
	import dayjs from 'dayjs';
	import Helper from '$cmps/ui/helper.svelte';

	let data = {
		citizenship: '',
		passportNumber: '',
		disability: '',
		title: '',
		firstName: '',
		surName: '',
		otherNames: '',
		gender: '',
		dateOfBirth: null,
		ssnitNumber: '',
		phoneOne: '',
		phoneTwo: '',
		ecowasCardNumber: '',
		email: '',
		gpsAddress: '',
		controllerStaffNumber: ''
	};
	let isValid = false;
	let busy = false;
	let renderId = 0;

	onMount(() => {
		// console.log($member)
		if ($member.personalInfo) {
			data = {
				...$member.personalInfo,
				title: $member.personalInfo.title.toUpperCase(),
				gender: $member.personalInfo.gender.toUpperCase()
			};
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
		dispatch('message', {
			type: 'personalInfo',
			data: { ...values, dateOfBirth: dayjs(values.dateOfBirth).format('YYYY-MM-DD') }
		});
	}

	const schema = z.object({
		citizenship: z.string().min(1, 'Citizenship is required'),
		passportNumber: z.lazy(() =>
			data.citizenship === 'NON-GHANAIAN'
				? z.string().min(1, 'Passport Number is required')
				: z.string().optional()
		),
		disability: z.string().min(1, 'Disability is required'),
		ssnitNumber: z.string().optional(),
		controllerStaffNumber: z.string().min(1, 'This is required'),
		title: z.string().min(1, 'Title is required'),
		firstName: z.string().min(1, 'First Name is required'),
		surName: z.string().min(1, 'Surname is required'),
		otherNames: z.string().optional(),
		gender: z.string().min(1, 'Gender is required'),
		dateOfBirth: z
			.string({ invalid_type_error: 'Date of birth is required' })
			.min(1, 'Date of birth is required'),
		phoneOne: z.string().min(1, 'Phone One is required').refine(validatePhoneNumber, {
			message: 'Invalid phone number format. Please enter a 10-digit phone number.'
		}),
		phoneTwo: z.string().optional(),
		ecowasCardNumber: z.lazy(() =>
			data.citizenship === 'GHANAIAN'
				? z
						.string()
						.min(1, 'ECOWAS Card is required')
						.refine((value) => validateGhanaCard(value), { message: 'Invalid Ghana card format' })
				: z.string().optional()
		),
		email: z.string().email(),
		gpsAddress: z.string().optional()
	});
</script>

{#key renderId}
	<Form
		class="w-full h-full flex flex-col gap-6 pl-2"
		initialValues={data}
		on:change={handleChange}
		on:submit={handleSubmit}
		{schema}
	>
		<Helper>
			<p class="text-sm text-justify">
				Kindly provide your personal information and educational background, along with necessary
				attachments such as a passport picture, your highest educational certificate, National
				Service Scheme (NSS) certificate, and birth certificate. Your comprehensive details and
				attachments will facilitate the evaluation process of your application.
			</p>
		</Helper>
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
			<TextField label="Surname" required placeholder="Enter your surname" name="surName" />
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
					name="ecowasCardNumber"
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
			<TextField label="Controller Staff Number" name="controllerStaffNumber" required />
			<TextField label="SSNIT No." name="ssnitNumber" />
			<TextField label="Phone 1" placeholder="0240 123 456" required name="phoneOne" readonly />
			<TextField label="Phone 2" placeholder="0240 123 456" name="phoneTwo" />
			<TextField label="Email" name="email" required readonly />
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
		<div class=" h-40" />
		<slot {isValid} {busy} />
	</Form>
{/key}
