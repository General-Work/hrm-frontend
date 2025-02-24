<script lang="ts">
	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';

	import { extractQueryParam, extractRedirectToRoute, showError, showInfo } from '$lib/utils';
	import * as z from 'zod';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const schema = z.object({
		email: z.string().email(),
		password: z.string().min(1, 'Password is required')
	});
	let init = { email: '', password: '' };
	let busy = false;

	async function handleLogin({ detail }: any) {
		try {
			const { values } = detail;
			busy = true;
			const ret = await axios.patch('/login', values);
			if (!ret.data.success) {
				showError(ret.data.message);
				return;
			}
			showInfo(ret.data.message);
			const redirectTo = `${extractQueryParam($page.url.search, 'redirectTo') ?? ''}&email=${encodeURIComponent(values.email)}&pwd=${encodeURIComponent(values.password)}`;
			console.log({ search: $page.url.search, redirectTo });
			goto(`/otp?redirectTo=${redirectTo}`);
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			busy = false;
		}
	}
</script>

<div class="w-full h-full">
	<h2 class="mt-1 text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
		Sign in to your HRM Account
	</h2>
	<Form
		class="w-full mt-8 mr-0 mb-4 ml-0 relative space-y-6"
		{schema}
		initialValues={init}
		on:submit={handleLogin}
	>
		<div class="flex flex-col gap-6">
			<TextField label="Email" name="email" required />
			<TextField label="Password" name="password" required />
			<div class="pt-4 grid">
				<Button label="Submit" type="submit" {busy} color="primary" />
			</div>
		</div>
	</Form>
</div>
