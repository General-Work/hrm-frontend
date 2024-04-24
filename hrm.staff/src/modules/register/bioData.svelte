<script lang="ts" context="module">
	export const ctxKey = {};
	export type IMember = {
		personalInfo: IBIODATA;
		attachments: IPersonalAttachments;
	};
	type IPersonalInfo = {
		type: 'personalInfo';
		data: any;
	};
	type IAttachments = {
		type: 'attachments';
		data: any;
	};

	export type IMessage = IPersonalInfo | IAttachments;
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import AlertDialog from '$cmps/alerts/alertDialog.svelte';
	import HorizontalStepper, { type IStepper } from '$cmps/ui/horizontalStepper.svelte';
	import { logoutNewStaff } from '$svc/auth';
	import type { IUserInfo } from '$types/types';
	import BiodataHeader from './partials/biodataHeader.svelte';
	import Biodata, { type IBIODATA } from './partials/biodata.svelte';
	import Footer from './partials/footer.svelte';
	import Qualifications, { type IPersonalAttachments } from './partials/qualifications.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { setContext } from 'svelte';

	export let user: IUserInfo | null;
	let isActiveStep = 0;
	let member: Writable<IMember> = writable<IMember>();
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
			label: 'Qualification and Attachments',
			icon: 'mdi:certificate',
			id: 2,
			component: Qualifications
			// props: { data: $member.attachments }
		}
	];

	setContext(ctxKey, member);

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
		if (browser) location.reload();
	};

	function onMessage({ detail }: any): void {
		const step: IStepper = detail.step;
		const message: IMessage = detail.message;
		console.log(detail);
		switch (message.type) {
			case 'personalInfo':
				member.update((current) => {
					return {
						...current,
						personalInfo: { ...message.data }
					};
				});
				isActiveStep++;
				break;

			default:
				break;
		}
	}
</script>

<div class="w-full h-full flex flex-col flex-grow bg-[#f7f8fa] overflow-y-auto">
	<div class="">
		<BiodataHeader on:logout={toggleModal} {user} />
	</div>
	<div class=" lg:container lg:mx-auto xl:px-40 flex-grow transform -translate-y-11">
		<div class="  bg-[#f7f8fa] px-2 lg:px-6 pt-4 rounded-t-lg">
			<!-- <Editor /> -->
			<HorizontalStepper
				fullHeight={true}
				{steps}
				nextButtonColor="darkBlue"
				backButtonColor="gold"
				on:message={onMessage}
				bind:isActiveStep
				nextText={isActiveStep === 1 ? 'Submit' : 'Next'}
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
