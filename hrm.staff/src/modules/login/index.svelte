<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$cmps/ui/button.svelte';
	import { loginStaff } from '$svc/auth';
	import { extractRedirectToRoute, showError } from '$types/utils';

	let busy = false;
	async function handleLogin() {
		try {
			busy = true;
			await loginStaff({ staffId: 'Msas', password: 'wewe' });
			const redirect = extractRedirectToRoute($page.url.search);
			if (redirect) {
				goto(redirect);
				return;
			}
			goto('/home');
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			busy = false;
		}
	}
</script>

<div class="w-screen h-screen grid justify-center items-center">
	<Button color="primary" label="Login" {busy} on:click={handleLogin} />
</div>
