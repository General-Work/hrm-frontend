<script lang="ts">
	import { browser } from '$app/environment';
	import AlertDialog from '$cmps/alerts/alertDialog.svelte';
	import { logoutNewStaff } from '$svc/auth';
	import type { IUserInfo } from '$types/types';
	import BiodataHeader from './partials/biodataHeader.svelte';
	import Editor from './partials/editor.svelte';
	import Footer from './partials/footer.svelte';

	export let user: IUserInfo | null;

	let openAlert = false;
	let busy = false;

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
</script>

<div class="w-full h-full flex flex-col flex-grow bg-[#f7f8fa] overflow-y-auto">
	<div class="">
		<BiodataHeader on:logout={toggleModal} {user}/>
	</div>
	<div class=" lg:container lg:mx-auto xl:px-40 flex-grow transform -translate-y-11">
		<div class="  bg-[#f7f8fa] px-2 lg:px-6 pt-4 rounded-t-lg">
			<Editor />
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
