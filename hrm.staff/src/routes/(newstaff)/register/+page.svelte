<script lang="ts">
	import { browser } from '$app/environment';
	import ApplicationStatus from '$cmps/alerts/applicationStatus.svelte';
	import Button from '$cmps/ui/button.svelte';
	import BioData, { member, type IMember } from '$modules/register/bioData.svelte';
	import { logoutNewStaff } from '$svc/auth';
	import { Modal } from 'flowbite-svelte';
	export let data;

	const logout = async () => {
		await logoutNewStaff();
		member.set({} as IMember);
		if (browser) location.reload();
	};
</script>

<div class="w-screen h-svh">
	<BioData user={data.user} formData={data.details} />
</div>

<Modal
	open={data.user?.hasSubmittedApplication && data.user?.applicationStatus === 'PENDING'}
	backdropClass="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 backdrop-blur-md dark:bg-opacity-80"
	dismissable={false}
>
	<ApplicationStatus label="Application Under Review" avatarIcon="mage:preview-circle-fill">
		<p class="text-justify">
			Hello <b>{data.user?.firsName} {data.user?.lastName}</b>, your application is currently under
			review by the HR Department. You will receive an email notification on
			<b>{data.user?.email ?? ''}</b> upon successful completion of the review process or in case of
			rejection. If you have any inquiries or need assistance, please feel free to contact the HR Department.
		</p>
	</ApplicationStatus>
	<div class="grid sm:flex sm:justify-end">
		<Button label="Logout" color="gold" on:click={logout} />
	</div>
</Modal>

<Modal
	open={data.user?.hasSubmittedApplication &&
		data.user?.applicationStatus === ('APPROVED' || 'POSTED' || 'APPOINTED' || 'POSTED')}
	backdropClass="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 backdrop-blur-md dark:bg-opacity-80"
	dismissable={false}
>
	<ApplicationStatus
		label="Application Approved"
		avatarIcon="solar:verified-check-bold"
		avatarIconTextColor="text-green-500"
		avatarIconBorderColor="border-green-500"
	>
		<p class="text-justify">
			Hello <b>{data.user?.firsName} {data.user?.lastName}</b>, your application has been approved.
			As a result, you are unable to make any modifications on this portal. Please utilize the staff
			portal for any necessary modifications. If you have any inquiries or require assistance, do
			not hesitate to contact the HR Department.
		</p>
		<div class="grid sm:flex sm:justify-end">
			<Button label="Logout" color="gold" on:click={logout} />
		</div>
	</ApplicationStatus>
</Modal>
