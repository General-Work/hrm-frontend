<script lang="ts" context="module">
	export const ctxKey = {};
	export type IMember = {
		personalInfo: ApplicantBiodataDto;
		attachments: ApplicantAttachmentDto;
		qualifications: ApplicantQualificationDto;
	};
	type IPersonalInfo = {
		type: 'personalInfo';
		data: ApplicantBiodataDto;
	};
	type IAttachments = {
		type: 'attachments';
		data: ApplicantAttachmentDto;
	};

	type IQualifications = {
		type: 'qualifications';
		data: ApplicantQualificationDto;
	};

	const d: IMember = {
		personalInfo: {
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
		},
		qualifications: {
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
		},
		attachments: {
			passportPicture: null,
			birthCertificate: null,
			highestQualificationCertificate: null,
			nssCertificate: null
		}
	};

	export type IMessage = IPersonalInfo | IAttachments | IQualifications;
	export const member: Writable<IMember> = writable<IMember>(d);
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import AlertDialog from '$cmps/alerts/alertDialog.svelte';
	import HorizontalStepper, { type IStepper } from '$cmps/ui/horizontalStepper.svelte';
	import { logoutNewStaff } from '$svc/auth';
	import type { IApplicantInfo } from '$lib/types';
	import BiodataHeader from './partials/biodataHeader.svelte';
	import Biodata from './partials/biodata.svelte';
	import Footer from './partials/footer.svelte';
	import Qualifications from './partials/qualifications.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import Attachments from './partials/attachments.svelte';
	import { endProgress, extractQueryParam, showError, showInfo, startProgress } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		type ApplicantAttachmentDto,
		type ApplicantBiodataDto,
		type ApplicantDetails,
		type ApplicantQualificationDto
	} from '$svc/applicant';
	import axios from 'axios';
	import { formDataConfig } from '$lib/constants';

	export let user: IApplicantInfo | null;
	export let formData: ApplicantDetails | null;
	let isActiveStep = 0;
	let openAlert = false;
	let busy = false;
	let steps: IStepper[] = [
		{
			label: 'Personal Info',
			icon: 'f7:person-fill',
			id: 1,
			component: Biodata
			// props: { data: $member.personalInfo }
		},
		{
			label: 'Qualifications',
			icon: 'ion:school-sharp',
			id: 2,
			component: Qualifications
			// props: { data: $member.attachments }
		},
		{
			label: 'Attachments',
			icon: 'mdi:certificate',
			id: 2,
			component: Attachments
			// props: { data: $member.attachments }
		}
	];

	const toggleModal = () => {
		if (openAlert) {
			openAlert = false;
		} else {
			openAlert = true;
		}
	};

	const logout = async () => {
		await logoutNewStaff();
		toggleModal();
		member.set({} as IMember);
		if (browser) location.reload();
	};

	async function onMessage({ detail }: any) {
		const step: IStepper = detail.step;
		const message: IMessage = detail.message;
		switch (message.type) {
			case 'personalInfo':
				busy = true;
				startProgress();
				member.update((current) => {
					return {
						...current,
						personalInfo: { ...message.data }
					};
				});

				const personalInfoRet = await axios.post('/register/biodata', { ...message.data });
				busy = false;
				if (!personalInfoRet.data?.success) {
					showError(personalInfoRet.data?.message);
					endProgress();
					return;
				}
				isActiveStep++;
				goto(`?step=${isActiveStep}`);
				endProgress();

				break;
			case 'qualifications':
				busy = true;
				startProgress();
				member.update((current) => {
					return {
						...current,
						qualifications: { ...message.data }
					};
				});
				const qualificationsRet = await axios.post('/register/qualifications', { ...message.data });
				busy = false;
				if (!qualificationsRet.data?.success) {
					endProgress();
					showError(qualificationsRet.data?.message);
					return;
				}
				isActiveStep++;
				goto(`?step=${isActiveStep}`);
				endProgress();

				break;
			case 'attachments':
				busy = true;
				startProgress();
				member.update((current) => {
					return {
						...current,
						attachments: { ...message.data }
					};
				});
				const attachmentsRet = await axios.post(
					'/register/attachments',
					{ ...message.data },
					formDataConfig
				);
				busy = false;
				if (!attachmentsRet.data?.success) {
					endProgress();
					showError(attachmentsRet.data?.message);
					return;
				}
				showInfo('Succesfullly submited details');
				isActiveStep = 0;
				goto(`?step=0`);
				endProgress();
				if (browser) location.reload();
				break;
			default:
				break;
		}
	}

	function handleBack() {
		goto(`?step=${isActiveStep}`);
		endProgress();
	}

	$: if (formData) {
		member.set({
			personalInfo: {
				title: formData.title,
				surName: formData.surName,
				firstName: formData.firstName,
				otherNames: formData.otherNames,
				gender: formData.gender,
				citizenship: formData.citizenship,
				dateOfBirth: formData.dateOfBirth,
				ssnitNumber: formData.snnitNumber,
				phoneOne: formData.phoneOne,
				phoneTwo: formData.phoneTwo,
				email: formData.email,
				gpsAddress: formData.gpsAddress,
				disability: formData.disability,
				ecowasCardNumber: formData.ecowasCardNumber,
				passportNumber: formData.passportNumber,
				controllerStaffNumber: formData.controllerStaffNumber
			},
			qualifications: {
				educationalBackground: formData.educationalBackground,
				yearOfService: formData.yearOfService,
				nssNumber: formData.nssNumber,
				placeOfService: formData.placeOfService,
				highestQualification: formData.highestQualification
			},
			attachments: {
				birthCertificate: formData.birthCertificate,
				nssCertificate: formData.nssCertificate,
				passportPicture: formData.passportPicture,
				highestQualificationCertificate: formData.highestQualificationCertificate
			}
		});
	}
	$: if (user?.email && user?.contact && !formData) {
		member.set({
			...$member,
			personalInfo: {
				...$member.personalInfo,
				phoneOne: `0${user?.contact}` ?? '',
				email: user?.email ?? ''
			}
		});
	}

	onMount(() => {
		const params = extractQueryParam($page.url.search, 'step');
		if (params) {
			isActiveStep = Number(params);
		}
	});
</script>

<div class="w-full h-full flex flex-col flex-grow bg-[#f7f8fa] overflow-y-auto">
	<div class="">
		<BiodataHeader on:logout={toggleModal} {user} />
	</div>
	<div class=" lg:container lg:mx-auto xl:px-40 flex-grow transform -translate-y-11">
		<div class="  bg-[#f7f8fa] px-2 md:px-6 pt-4 rounded-t-lg">
			<HorizontalStepper
				fullHeight={true}
				{steps}
				bind:busy
				nextButtonColor="darkBlue"
				backButtonColor="gold"
				on:message={onMessage}
				on:onBack={handleBack}
				bind:isActiveStep
				nextText={isActiveStep === 2 ? 'Submit' : 'Save and Continue'}
			/>
		</div>
	</div>
	<div>
		<Footer />
	</div>
</div>

<AlertDialog
	bind:open={openAlert}
	on:cancel={toggleModal}
	on:yes={logout}
	{busy}
	icon="line-md:logout"
	message="Are you sure you want to logout?"
/>
