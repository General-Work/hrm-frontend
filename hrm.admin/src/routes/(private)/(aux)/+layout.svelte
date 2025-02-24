<script lang="ts">
	import Navbar from '$cmps/layout/navbar.svelte';
	import { signOut } from '@auth/sveltekit/client';
	import { authToken, readAuthUser, userInfo } from '$svc/auth';
	import { setAuthToken } from '$lib/axios';
	import { browser } from '$app/environment';
	import AlertDialog from '$cmps/alerts/alertDialog.svelte';
	import Dialog from '$cmps/ui/dialog.svelte';

	let showAlert = false;

	async function logout() {
		await signOut();
		// authToken.set('');
		setAuthToken('');
		if (browser) window.location.reload();
	}
</script>

<div class="w-screen h-screen overflow-hidden">
	<div class="w-full h-full">
		<section class="w-full h-full overflow-hidden">
			<div class="custom-container">
				<Navbar user={$userInfo} showMenuIcon={false} on:signout={() => (showAlert = true)} />
			</div>
			<section class="bg-[#f5e9eb78] w-full h-full flex-grow flex flex-col">
				<div class=" w-full h-full flex-grow overflow-hidden custom-container">
					<div class="w-full h-full">
						<slot />
					</div>
				</div>
			</section>
		</section>
	</div>
</div>

<AlertDialog
	bind:open={showAlert}
	message="Are you sure you want to sign out?"
	on:cancel={() => (showAlert = false)}
	on:yes={logout}
/>

<Dialog />
