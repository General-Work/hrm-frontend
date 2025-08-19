<script lang="ts">
	import type { IStaffByID } from '$lib/types';
	import { showError } from '$lib/utils';
	import { readStaffById } from '$svc/staff';
	import { onMount } from 'svelte';
	import type { IAppointmentFormDto } from '../appointmentDetails.svelte';
	import PageLoader from '$cmps/ui/pageLoader.svelte';
	import AppointmentDetails from '../appointmentDetails.svelte';
	import { readGrades, type IGrade } from '$svc/salaries';

	export let staffNumber = '';
	export let readonly = true;

	$: console.log({ readonly });
	let staff: IStaffByID = {} as IStaffByID;
	let formData: IAppointmentFormDto = {} as IAppointmentFormDto;
	let busy = true;
	let grades: any[] = [];
	onMount(async () => {
		try {
			const [staffRes, gradeRes] = await Promise.all([readStaffById(staffNumber), readGrades()]);
			if (!staffRes.success) {
				showError(staffRes.message);
				return;
			}
			staff = staffRes.data;
			formData = {
				staffType: staff?.currentAppointment?.staffType || '',
				appointmentType: staff?.currentAppointment?.appointmentType || '',
				step: staff?.currentAppointment?.step || '',
				salarySource: staff?.currentAppointment?.paymentSource || '',
				firstAppointmentNotionalDate: staff?.firstAppointment?.notionalDate || null,
				firstAppointmentSubstantiveDate: staff?.firstAppointment?.substantiveDate || null,
				firstAppointmentGrade: staff?.firstAppointment?.gradeId || '',
				currentAppointmentNotionalDate: staff?.currentAppointment?.notionalDate || null,
				currentAppointmentSubstantiveDate: staff?.currentAppointment?.substantiveDate || null,
				currentAppointmentGrade: staff?.currentAppointment?.gradeId || '',
				professionId: staff?.currentAppointment?.grade?.categoryId || '',
				profession: staff?.currentAppointment?.grade?.category || '',
				specialty: staff?.currentAppointment?.staffSpecialityId || '',
				scale: staff?.currentAppointment?.grade?.scale || '',
				band: staff?.currentAppointment?.grade?.level || '',
				salary: '',
				endDate: staff?.currentAppointment?.endDate || null
			} as IAppointmentFormDto;

			if (gradeRes.success) {
				grades = gradeRes.data.map((x: IGrade) => ({ id: x.id, label: x.gradeName }));
			}
		} catch (error: any) {
			showError(error?.message || error);
		} finally {
			busy = false;
		}
	});
</script>

{#if busy}
	<div class="w-full h-full">
		<PageLoader size={50} />
	</div>
{:else}
	<AppointmentDetails
		readOnly={readonly}
		{formData}
		isApplicant={false}
		polymorphicId=""
		grade={grades}
		updating={!readonly}
		staffDbId={staff.id}
	/>
{/if}
