<script lang="ts" context="module">
	export interface IPersonalAttachments {}

	interface School {
		institutionName: string;
		yearCompleted: string;
		certificate: string;
	}
</script>

<script lang="ts">
	import DateField from '$cmps/forms/dateField.svelte';

	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Helper from '$cmps/ui/helper.svelte';
	import Title from '$cmps/ui/title.svelte';
	import { CERTIFICATES } from '$lib/constants';
	import dayjs from 'dayjs';
	import { createEventDispatcher, onMount } from 'svelte';
	import * as z from 'zod';
	import { member } from '../bioData.svelte';
	let data = {
		educationalBackground: [
			{
				institutionName: '',
				yearCompleted: null,
				certificate: ''
			}
		],
		yearOfService: null,
		nssNumber: '',
		placeOfService: '',
		highestQualification: ''
	};

	let busy = false;
	let isValid = false;
	let renderId = 0;
	const dispatch = createEventDispatcher();
	const schema = z.object({
		highestQualification: z.string().min(1, 'Highest Qualification is required'),
		nssNumber: z.string().min(1, 'NSS Number is required'),
		yearOfService: z
			.string({ invalid_type_error: 'Year of Service is required' })
			.min(1, 'Year of Service is required'),
		placeOfService: z.string().min(1, 'Place of service is required')
		// educationalBackground: z.array(
		// 	z.object({
		// 	institutionName: z.string().min(1, 'This is required'),
		// 		yearCompleted: z.string().min(1, 'This is required'),
		// 		certificate: z.string().min(1, 'This is required')
		// 	})
		// )
	});
	let educationalBackground: School[] = [
		{
			institutionName: '',
			yearCompleted: '',
			certificate: ''
		}
	];
	function handleSubmit({ detail }: any) {
		const { values } = detail;
		const length = values.educationalBackground.length;

		for (let i = 0; i < length; i++) {
			const certificate = values[`educationalBackground.${i}.certificate`];
			if (certificate) {
				values.educationalBackground[i].certificate = certificate;
			}
		}

		const newValues = {
			educationalBackground: values.educationalBackground.map((x: School) => ({
				...x,
				yearCompleted: dayjs(x.yearCompleted).format('YYYY-MM-DD')
			})),
			yearOfService: dayjs(values.yearOfService).format('YYYY-MM-DD'),
			nssNumber: values.nssNumber,
			placeOfService: values.placeOfService,
			highestQualification: values.highestQualification
		};

		dispatch('message', { type: 'qualifications', data: newValues });
	}

	function addSchool() {
		educationalBackground = [
			...educationalBackground,
			{ institutionName: '', yearCompleted: '', certificate: '' }
		];
	}

	function removeSchool(index: number) {
		educationalBackground = educationalBackground.filter((_, i) => i !== index);
	}

	// function handleChange({ detail }: any) {
	// 	const { values, form } = detail;

	// 	// form.subscribe((data:any)=> {

	// 	// })
	// 	// console.log(values);

	// 	const length = values.educationalBackground.length;

	// 	// Update certificate property for each index
	// 	for (let i = 0; i < length; i++) {
	// 		const certificate = values[`educationalBackground.${i}.certificate`];
	// 		if (certificate) {
	// 			values.educationalBackground[i].certificate = certificate;
	// 		}
	// 	}

	// 	console.log('here', values);
	// }

	onMount(() => {
		if ($member.qualifications) {
			data = $member.qualifications;

			educationalBackground = $member.qualifications.educationalBackground.reverse();
			renderId++;
		}
	});
</script>

{#key renderId}
	<Form
		{schema}
		initialValues={data}
		on:submit={handleSubmit}
		class="pl-2 h-full w-full flex flex-col gap-4"
	>
		<Title label="Educational Background" />
		<SelectField
			label="Highest Education Level"
			options={CERTIFICATES}
			name="highestQualification"
			labelAsValue
		/>
		<Helper>
			<div class="space-y-2 pl-4">
				<ul class="text-sm list-disc">
					<li>Please click the button below to add the institutions you have attended.</li>
					<li>The order should be <b>recent</b> to <b>former</b></li>
				</ul>
				<button
					class="bg-blue-500 hover:bg-blue-600 text-white rounded-[5px] text-sm px-3 py-1.5"
					type="button"
					on:click={addSchool}
				>
					Add institution
				</button>
			</div>
		</Helper>
		{#each educationalBackground as school, index}
			<div class="flex flex-col gap-1">
				<div class="flex items-center gap-2" class:hidden={!(educationalBackground.length > 1)}>
					<Title
						label={`Institution ${index + 1}`}
						on:click={() => removeSchool(index)}
						showButton
					/>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<TextField
						label="Institution Name"
						name={`educationalBackground.${index}.institutionName`}
						required
					/>
					<DateField
						label="Year completed"
						name={`educationalBackground.${index}.yearCompleted`}
						required
					/>
					<div class="col-span-2">
						<SelectField
							label="Certificate awarded"
							options={CERTIFICATES}
							name={`educationalBackground.${index}.certificate`}
							labelAsValue
							required
						/>
					</div>
				</div>
			</div>
		{/each}
		<Title label="National Service Details" />
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<TextField label="NSS Number" name="nssNumber" placeholder="NSS0123456789" required />
			<DateField label="Year of Service" name="yearOfService" required />
		</div>
		<div>
			<TextField label="Institution of Service" name="placeOfService" placeholder="Tema" required />
		</div>

		<slot {isValid} {busy} />
	</Form>
{/key}
