<script lang="ts">
	import { page } from '$app/stores';
	import { activePage, breadCrumb } from '$data/appStore';
	import { extractQueryParam } from '$lib/utils';
	import Details, {
		type IAppointmentFormDto
	} from '$modules/staffrecords/appointmentDetails.svelte';

	export let data;

	$: isApplicant = extractQueryParam($page.url.search, 'applicant');
	$: polymorphicId = extractQueryParam($page.url.search, 'polymorphicId');

	$: $activePage = {
		title: 'Appointment Details',
		showBreadCrumb: isApplicant === 'true' ? false : true
	};
	$: id = $page.params.staffId;
	$: breadCrumb.addToFirstIndex(
		[
			{ title: 'Staff Records', path: `/staffrecords` },
			{ title: 'Overview', path: `/staffrecords/${id}` },
			{ title: 'Appointment Details', path: '' }
		],
		true
	);

	let formData = {
		staffType: data?.staff?.currentAppointment?.staffType || '',
		appointmentType: data?.staff?.currentAppointment?.appointmentType || '',
		step: data?.staff?.currentAppointment?.step || '',
		salarySource: data?.staff?.currentAppointment?.paymentSource || '',
		firstAppointmentNotionalDate: data?.staff?.firstAppointment?.notionalDate || null,
		firstAppointmentSubstantiveDate: data?.staff?.firstAppointment?.substantiveDate || null,
		firstAppointmentGrade: data?.staff?.firstAppointment?.gradeId || '',
		currentAppointmentNotionalDate: data?.staff?.currentAppointment?.notionalDate || null,
		currentAppointmentSubstantiveDate: data?.staff?.currentAppointment?.substantiveDate || null,
		currentAppointmentGrade: data?.staff?.currentAppointment?.gradeId || '',
		professionId: data?.staff?.currentAppointment?.grade?.categoryId || '',
		profession: data?.staff?.currentAppointment?.grade?.category || '',
		specialty: data?.staff?.currentAppointment?.staffSpecialityId || '',
		scale: data?.staff?.currentAppointment?.grade?.scale || '',
		band: data?.staff?.currentAppointment?.grade?.level || '',
		salary: '',
		endDate: data?.staff?.currentAppointment?.endDate || null
	} as IAppointmentFormDto;
</script>

<Details
	grade={data.grades}
	isApplicant={isApplicant === 'true' ? true : false}
	{polymorphicId}
	{formData}
	readOnly={Boolean(formData?.appointmentType)}
/>
