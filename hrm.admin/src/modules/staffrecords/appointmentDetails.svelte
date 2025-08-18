<script lang="ts" context="module">
	export interface IAppointmentFormDto {
		staffType: string;
		appointmentType: string;
		salarySource: string;
		firstAppointmentNotionalDate: string | null;
		firstAppointmentSubstantiveDate: string | null;
		firstAppointmentGrade: string;
		currentAppointmentNotionalDate: string | null;
		currentAppointmentSubstantiveDate: string | null;
		currentAppointmentGrade: string;
		professionId: string;
		profession: string;
		specialty: string;
		scale: string;
		step: string;
		band: string;
		salary: string;
		endDate: null | string;
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AlertDialog from '$cmps/alerts/alertDialog.svelte';
	import DateField from '$cmps/forms/dateField.svelte';
	import Form from '$cmps/forms/form.svelte';
	import SelectField from '$cmps/forms/selectField.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import Fieldset from '$cmps/ui/fieldset.svelte';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import Title from '$cmps/ui/title.svelte';
	import { APPOINTMENTTYPELIST, STAFFPAYMENTTYPE, STAFFTYPE } from '$lib/constants';
	import { endProgress, showError, showInfo, startProgress } from '$lib/utils';
	import { readGrades, type IGrade, type ISpecialty } from '$svc/salaries';
	import { addNewAppointmentDetails, type AppointmentDto } from '$svc/staffrequests';
	import axios from 'axios';
	import dayjs from 'dayjs';
	import { createEventDispatcher, onMount } from 'svelte';

	import * as z from 'zod';

	export let grade: any[] = [];
	export let isApplicant = $page.url.pathname === '/staffrequests';
	export let polymorphicId: string;
	export let readOnly = false;
	export let documentId = '';
	export let staffNumber = '';
	export let staffDbId = ''
	export let hasAppointment = false;
	export let formData: IAppointmentFormDto = {
		staffType: '',
		appointmentType: '',
		salarySource: '',
		firstAppointmentNotionalDate: null,
		firstAppointmentSubstantiveDate: null,
		firstAppointmentGrade: '',
		currentAppointmentNotionalDate: null,
		currentAppointmentSubstantiveDate: null,
		currentAppointmentGrade: '',
		professionId: '',
		profession: '',
		specialty: '',
		scale: '',
		step: '',
		band: '',
		salary: '',
		endDate: null
	};
	// const id = $page.params.staffId;
	$: console.log({ staffNumber, polymorphicId });

	const schema = z.object({
		staffType: z.string().min(1, 'Required'),
		appointmentType: z.string().min(1, 'Required'),
		salarySource: z.string().min(1, 'Required'),
		firstAppointmentNotionalDate: z.lazy(() =>
			!isApplicant ? z.string().min(1, 'Required') : z.string().nullable()
		),
		firstAppointmentSubstantiveDate: z.lazy(() =>
			!isApplicant ? z.string().min(1, 'Required') : z.string().nullable()
		),
		firstAppointmentGrade: z.lazy(() =>
			!isApplicant ? z.string().min(1, 'Required') : z.string().nullable()
		),
		currentAppointmentGrade: z.string({ invalid_type_error: 'Required' }).min(1, 'Required'),
		currentAppointmentNotionalDate: z.string({ invalid_type_error: 'Required' }).min(1, 'Required'),
		currentAppointmentSubstantiveDate: z
			.string({ invalid_type_error: 'Required' })
			.min(1, 'Required'),
		profession: z.string().min(1, 'Required'),
		specialty: z.string().optional(),
		scale: z.string().min(1, 'Required'),
		band: z.string().min(1, 'Required'),
		step: z.string().min(1, 'Required'),
		salary: z.string().min(1, 'Required'),
		endDate: z.lazy(() =>
			formData.appointmentType === 'CONTRACT'
				? z.string({ invalid_type_error: 'Required' }).min(1, 'Required')
				: z.string().nullable()
		)
	});
	let openAlert = false;
	let load = false;
	let renderId = 0;
	let busy = false;
	let specialty: any[] = [];
	let steps: any[] = [];
	let isLoading = true;

	const dispatch = createEventDispatcher();

	async function handleSubmit({ detail }: CustomEvent) {
		const { values } = detail;
		try {
			startProgress();
			busy = true;
			const d: AppointmentDto = {
				polymorphicId: null,
				staffId: staffDbId,
				gradeId: values.currentAppointmentGrade,
				appointmentType: values.appointmentType,
				staffType: values.staffType,
				paymentSource: values.salarySource,
				endDate: values.endDate ? dayjs(values.endDate).format('YYYY-MM-DD') : null,
				notionalDate: values.currentAppointmentNotionalDate
					? dayjs(values.currentAppointmentNotionalDate).format('YYYY-MM-DD')
					: null,
				substantiveDate: values.currentAppointmentSubstantiveDate
					? dayjs(values.currentAppointmentSubstantiveDate).format('YYYY-MM-DD')
					: null,
				firstAppointmentNotionalDate: values.firstAppointmentNotionalDate
					? dayjs(values.firstAppointmentNotionalDate).format('YYYY-MM-DD')
					: null,
				firstAppointmentSubstantiveDate: values.firstAppointmentSubstantiveDate
					? dayjs(values.firstAppointmentSubstantiveDate).format('YYYY-MM-DD')
					: null,
				firstAppointmentGradeId: values.firstAppointmentGrade || null,
				step: values.step,
				staffSpecialityId: values.specialty || null
			};

			const ret = await addNewAppointmentDetails(d);
			if (!ret.success) {
				showError(ret.message);
				return;
			}
			showInfo('Appointment details added');

			// openAlert = true;
			handleCancel();
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			endProgress();
			busy = false;
		}
	}

	function handleCancel() {
		openAlert = false;
		// if (isApplicant) goto('/staffrequest');
		dispatch('removeItem', { tabId: documentId });
	}
	function handleYes() {
		// goto(`/staffrecords/${staffId}/postings?applicant=${isApplicant}`);
		dispatch('removeItem', { tabId: documentId, switchTo: '' });

		openAlert = false;
	}

	async function loadCategoryAndSpecialty({ detail }: CustomEvent) {
		const { id } = detail;
		if (!id) {
			formData = {
				...formData,
				currentAppointmentGrade: '',
				professionId: '',
				profession: '',
				specialty: '',
				scale: '',
				step: '',
				band: '',
				salary: ''
			};
			renderId++;
			return;
		}
		try {
			load = true;
			const ret = await axios.get('/applicationsetup/grade/category-specialties', {
				params: { id }
			});
			if (!ret.data.success) {
				showError(ret.data.message);
				return;
			}
			const { data } = ret.data;
			formData = {
				...formData,
				profession: data.categoryName,
				professionId: data.id,
				band: data.level,
				scale: data.scale
			};
			specialty = data.specialities
				? data.specialities.map((x: ISpecialty) => ({ id: x.id, label: x.specialityName }))
				: [];
			steps = data.steps
				? data.steps
						.map((x: any) => ({ id: x.id, label: x.stepIndex, salary: x.salary.toFixed(2) }))
						.reverse()
				: [];
			renderId++;
		} catch (error: any) {
			showError(error?.message || error);
		} finally {
			load = false;
		}
	}

	function handleSteps({ detail }: CustomEvent) {
		const { id } = detail;
		if (!id) return;
		const m = steps.find((x: any) => x.id === id);
		if (m) {
			formData = {
				...formData,
				salary: m.salary
			};
			renderId++;
		}
	}

	function handleChange({ detail }: CustomEvent) {
		const { values } = detail;
		// console.log(values);
		if (!readOnly) formData = values;
	}

	onMount(async () => {
		if (grade.length === 0) {
			try {
				const gradeRes = await readGrades();

				if (gradeRes.success) {
					grade = gradeRes.data.map((x: IGrade) => ({ id: x.id, gradeName: x.gradeName }));
				}
			} catch (error: any) {
				showError(error?.message || error);
			} finally {
				isLoading = false;
			}
		} else {
			isLoading = false;
		}
		if (formData.currentAppointmentGrade) {
			await loadCategoryAndSpecialty({
				detail: { id: formData.currentAppointmentGrade }
			} as CustomEvent);
		}
		if (formData.step) {
			handleSteps({ detail: { id: formData.step } } as CustomEvent);
		}
	});
</script>

{#if isLoading}
	<div class="w-full h-52"><PageLoader size={50} /></div>
{:else}
	{#key renderId}
		<Form
			{schema}
			initialValues={formData}
			class="flex flex-col gap-4"
			on:submit={handleSubmit}
			on:change={handleChange}
		>
			<Fieldset label="Appointments" kind="blue" icon="mingcute:pencil-3-fill">
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
					<SelectField
						label="Staff Type"
						name="staffType"
						options={STAFFTYPE}
						required
						labelAsValue
						readonly={readOnly}
					/>
					<SelectField
						label="Appointment Type"
						name="appointmentType"
						options={APPOINTMENTTYPELIST}
						labelAsValue
						required
						readonly={readOnly}
					/>
					<SelectField
						label="Salary Source"
						name="salarySource"
						options={STAFFPAYMENTTYPE}
						labelAsValue
						required
						readonly={readOnly}
					/>
				</div>
				<div class="my-5" class:hidden={isApplicant}>
					<Title label="First Appointment" />
					<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
						<DateField
							label="Notional Date"
							name="firstAppointmentNotionalDate"
							required
							readonly={readOnly}
						/>
						<DateField
							label="Substantive Date"
							name="firstAppointmentSubstantiveDate"
							required
							readonly={readOnly}
						/>
						<SelectField
							label="First Appointment Grade"
							required
							name="firstAppointmentGrade"
							options={grade}
							readonly={readOnly}
						/>
					</div>
				</div>
				<div class="my-5">
					<Title label={isApplicant ? 'Appointment' : 'Current Appointment'} />
					<div class="space-y-4">
						<div
							class="grid grid-cols-1 gap-4 pt-2 {formData.appointmentType === 'CONTRACT'
								? 'lg:grid-cols-3'
								: 'lg:grid-cols-2'}"
						>
							<DateField
								label="Notional Date"
								name="currentAppointmentNotionalDate"
								required
								readonly={readOnly}
							/>
							<DateField
								label="Substantive Date"
								name="currentAppointmentSubstantiveDate"
								required
								readonly={readOnly}
							/>
							<div class:hidden={!(formData.appointmentType === 'CONTRACT')}>
								<DateField
									label="Appointment End Date"
									name="endDate"
									required
									readonly={readOnly}
								/>
							</div>
						</div>
						<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
							<SelectField
								label="Current Grade"
								name="currentAppointmentGrade"
								required
								options={grade}
								clearable={false}
								on:change={loadCategoryAndSpecialty}
								readonly={readOnly}
							/>
							<TextField label="Profession" name="profession" readOnly required />

							<SelectField
								label="Specialty"
								name="specialty"
								options={specialty}
								isLoading={load}
								readonly={readOnly}
							/>
						</div>
					</div>
				</div>
			</Fieldset>
			<Fieldset label="Salary" icon="fluent:payment-32-filled">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<TextField label="Scale" name="scale" readOnly required readonly={readOnly} />
					<TextField label="Band" name="band" readOnly required readonly={readOnly} />
					<SelectField
						size="small"
						label="Step"
						name="step"
						required
						options={steps}
						on:change={handleSteps}
						clearable={false}
						readonly={readOnly}
					/>
					<TextField
						label="Salary"
						name="salary"
						required
						readOnly
						type="number"
						readonly={readOnly}
					/>
				</div>
				<!-- <div class="pt-4">
			<div class="border-b">Bank Details</div>
			<div class="grid grid-cols-1 gap-4 pt-2">
				<SelectField label="Name of bank" name="bank" required />
				<TextField label="Branch" name="branch" />
				<SelectField label="Account Type" name="accountType" options={ACCOUNTTYPE} />
				<TextField label="Account Number" name="accountNumber" required />
			</div>
		</div> -->
			</Fieldset>
			<div class="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4" class:hidden={readOnly}>
				<Button label="Reset" type="reset" />
				<Button label="Submit" type="submit" color="success" {busy} />
			</div>
		</Form>
	{/key}

	<AlertDialog
		open={openAlert}
		message="Do you want to continue with staff's Posting Details?"
		confirmText="Yes, I want"
		dismissable={false}
		on:yes={handleYes}
		on:cancel={handleCancel}
	/>
{/if}
