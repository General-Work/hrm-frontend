<script lang="ts" context="module">
	const getTime = () => {
		const now = dayjs();
		const currentHour = now.hour();
		// let x
		if (currentHour >= 0 && currentHour < 12) {
			return 'Good morning!';
		} else if (currentHour >= 12 && currentHour < 18) {
			return 'Good afternoon!';
		} else {
			return 'Good evening!';
		}
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';

	import Form from '$cmps/forms/form.svelte';
	import TextField from '$cmps/forms/textField.svelte';
	import Button from '$cmps/ui/button.svelte';
	import logo from '$lib/images/newlogo.png';
	import { loginUser } from '$svc/auth';
	import { extractRedirectToRoute, showError } from '$types/utils';
	import dayjs from 'dayjs';
	import * as z from 'zod';

	const schema = z.object({
		staffId: z.string().min(1, 'Staff ID is required'),
		password: z.string().min(1, 'Password is required')
	});
	let init = { staffId: '', password: '' };
	let busy = false;

	async function handleLogin({ detail }: any) {
		try {
			const { values } = detail;
			busy = true;
			await loginUser(values);
			const redirect = extractRedirectToRoute($page.url.search);
			if (redirect) {
				goto(redirect);
				return;
			}
			goto('/dashboard');
		} catch (error: any) {
			showError(error.message || error);
		} finally {
			busy = false;
		}
	}
</script>

<div class="w-full mr-0 mb-0 ml-0 relative z-10 max-w-lg lg:mt-0 lg:w-5/12">
	<div
		class="flex flex-col items-start justify-start pt-6 pr-10 pb-5 pl-10 bg-white loginbox rounded-xl
  relative z-10"
	>
		<div class="flex flex-col items-center gap-2 w-full">
			<div class="flex justify-center gap-2 text-sky-600 pb-1">
				<img src={logo} alt="" class="w-52" />
			</div>
			<p class=" text-gray-600 text-lg text-center font-medium">{getTime()}</p>
			<h2 class="mt-1 text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Sign in to your HRM Account
			</h2>
		</div>

		<Form
			class="w-full mt-8 mr-0 mb-4 ml-0 relative space-y-6"
			{schema}
			initialValues={init}
			on:submit={handleLogin}
		>
			<div class="flex flex-col gap-6">
				<TextField label="Staff ID" name="staffId" required />
				<TextField label="Password" name="password" required />
				<div class="pt-4 grid">
					<Button label="Submit" type="submit" {busy} color="primary" />
				</div>
			</div>
		</Form>
	</div>
	<svg
		viewBox="0 0 91 91"
		class="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-red-200/60
  fill-current"
		><g stroke="none" strokeWidth="1" fillRule="evenodd"
			><g fillRule="nonzero"
				><g
					><g
						><circle cx="3.261" cy="3.445" r="2.72" /><circle
							cx="15.296"
							cy="3.445"
							r="2.719"
						/><circle cx="27.333" cy="3.445" r="2.72" /><circle
							cx="39.369"
							cy="3.445"
							r="2.72"
						/><circle cx="51.405" cy="3.445" r="2.72" /><circle
							cx="63.441"
							cy="3.445"
							r="2.72"
						/><circle cx="75.479" cy="3.445" r="2.72" /><circle
							cx="87.514"
							cy="3.445"
							r="2.719"
						/></g
					><g transform="translate(0 12)"
						><circle cx="3.261" cy="3.525" r="2.72" /><circle
							cx="15.296"
							cy="3.525"
							r="2.719"
						/><circle cx="27.333" cy="3.525" r="2.72" /><circle
							cx="39.369"
							cy="3.525"
							r="2.72"
						/><circle cx="51.405" cy="3.525" r="2.72" /><circle
							cx="63.441"
							cy="3.525"
							r="2.72"
						/><circle cx="75.479" cy="3.525" r="2.72" /><circle
							cx="87.514"
							cy="3.525"
							r="2.719"
						/></g
					><g transform="translate(0 24)"
						><circle cx="3.261" cy="3.605" r="2.72" /><circle
							cx="15.296"
							cy="3.605"
							r="2.719"
						/><circle cx="27.333" cy="3.605" r="2.72" /><circle
							cx="39.369"
							cy="3.605"
							r="2.72"
						/><circle cx="51.405" cy="3.605" r="2.72" /><circle
							cx="63.441"
							cy="3.605"
							r="2.72"
						/><circle cx="75.479" cy="3.605" r="2.72" /><circle
							cx="87.514"
							cy="3.605"
							r="2.719"
						/></g
					><g transform="translate(0 36)"
						><circle cx="3.261" cy="3.686" r="2.72" /><circle
							cx="15.296"
							cy="3.686"
							r="2.719"
						/><circle cx="27.333" cy="3.686" r="2.72" /><circle
							cx="39.369"
							cy="3.686"
							r="2.72"
						/><circle cx="51.405" cy="3.686" r="2.72" /><circle
							cx="63.441"
							cy="3.686"
							r="2.72"
						/><circle cx="75.479" cy="3.686" r="2.72" /><circle
							cx="87.514"
							cy="3.686"
							r="2.719"
						/></g
					><g transform="translate(0 49)"
						><circle cx="3.261" cy="2.767" r="2.72" /><circle
							cx="15.296"
							cy="2.767"
							r="2.719"
						/><circle cx="27.333" cy="2.767" r="2.72" /><circle
							cx="39.369"
							cy="2.767"
							r="2.72"
						/><circle cx="51.405" cy="2.767" r="2.72" /><circle
							cx="63.441"
							cy="2.767"
							r="2.72"
						/><circle cx="75.479" cy="2.767" r="2.72" /><circle
							cx="87.514"
							cy="2.767"
							r="2.719"
						/></g
					><g transform="translate(0 61)"
						><circle cx="3.261" cy="2.846" r="2.72" /><circle
							cx="15.296"
							cy="2.846"
							r="2.719"
						/><circle cx="27.333" cy="2.846" r="2.72" /><circle
							cx="39.369"
							cy="2.846"
							r="2.72"
						/><circle cx="51.405" cy="2.846" r="2.72" /><circle
							cx="63.441"
							cy="2.846"
							r="2.72"
						/><circle cx="75.479" cy="2.846" r="2.72" /><circle
							cx="87.514"
							cy="2.846"
							r="2.719"
						/></g
					><g transform="translate(0 73)"
						><circle cx="3.261" cy="2.926" r="2.72" /><circle
							cx="15.296"
							cy="2.926"
							r="2.719"
						/><circle cx="27.333" cy="2.926" r="2.72" /><circle
							cx="39.369"
							cy="2.926"
							r="2.72"
						/><circle cx="51.405" cy="2.926" r="2.72" /><circle
							cx="63.441"
							cy="2.926"
							r="2.72"
						/><circle cx="75.479" cy="2.926" r="2.72" /><circle
							cx="87.514"
							cy="2.926"
							r="2.719"
						/></g
					><g transform="translate(0 85)"
						><circle cx="3.261" cy="3.006" r="2.72" /><circle
							cx="15.296"
							cy="3.006"
							r="2.719"
						/><circle cx="27.333" cy="3.006" r="2.72" /><circle
							cx="39.369"
							cy="3.006"
							r="2.72"
						/><circle cx="51.405" cy="3.006" r="2.72" /><circle
							cx="63.441"
							cy="3.006"
							r="2.72"
						/><circle cx="75.479" cy="3.006" r="2.72" /><circle
							cx="87.514"
							cy="3.006"
							r="2.719"
						/></g
					></g
				></g
			></g
		></svg
	>
	<svg
		viewBox="0 0 91 91"
		class="absolute -bottom-3 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-sky-600
  fill-current"
		><g stroke="none" strokeWidth="1" fillRule="evenodd"
			><g fillRule="nonzero"
				><g
					><g
						><circle cx="3.261" cy="3.445" r="2.72" /><circle
							cx="15.296"
							cy="3.445"
							r="2.719"
						/><circle cx="27.333" cy="3.445" r="2.72" /><circle
							cx="39.369"
							cy="3.445"
							r="2.72"
						/><circle cx="51.405" cy="3.445" r="2.72" /><circle
							cx="63.441"
							cy="3.445"
							r="2.72"
						/><circle cx="75.479" cy="3.445" r="2.72" /><circle
							cx="87.514"
							cy="3.445"
							r="2.719"
						/></g
					><g transform="translate(0 12)"
						><circle cx="3.261" cy="3.525" r="2.72" /><circle
							cx="15.296"
							cy="3.525"
							r="2.719"
						/><circle cx="27.333" cy="3.525" r="2.72" /><circle
							cx="39.369"
							cy="3.525"
							r="2.72"
						/><circle cx="51.405" cy="3.525" r="2.72" /><circle
							cx="63.441"
							cy="3.525"
							r="2.72"
						/><circle cx="75.479" cy="3.525" r="2.72" /><circle
							cx="87.514"
							cy="3.525"
							r="2.719"
						/></g
					><g transform="translate(0 24)"
						><circle cx="3.261" cy="3.605" r="2.72" /><circle
							cx="15.296"
							cy="3.605"
							r="2.719"
						/><circle cx="27.333" cy="3.605" r="2.72" /><circle
							cx="39.369"
							cy="3.605"
							r="2.72"
						/><circle cx="51.405" cy="3.605" r="2.72" /><circle
							cx="63.441"
							cy="3.605"
							r="2.72"
						/><circle cx="75.479" cy="3.605" r="2.72" /><circle
							cx="87.514"
							cy="3.605"
							r="2.719"
						/></g
					><g transform="translate(0 36)"
						><circle cx="3.261" cy="3.686" r="2.72" /><circle
							cx="15.296"
							cy="3.686"
							r="2.719"
						/><circle cx="27.333" cy="3.686" r="2.72" /><circle
							cx="39.369"
							cy="3.686"
							r="2.72"
						/><circle cx="51.405" cy="3.686" r="2.72" /><circle
							cx="63.441"
							cy="3.686"
							r="2.72"
						/><circle cx="75.479" cy="3.686" r="2.72" /><circle
							cx="87.514"
							cy="3.686"
							r="2.719"
						/></g
					><g transform="translate(0 49)"
						><circle cx="3.261" cy="2.767" r="2.72" /><circle
							cx="15.296"
							cy="2.767"
							r="2.719"
						/><circle cx="27.333" cy="2.767" r="2.72" /><circle
							cx="39.369"
							cy="2.767"
							r="2.72"
						/><circle cx="51.405" cy="2.767" r="2.72" /><circle
							cx="63.441"
							cy="2.767"
							r="2.72"
						/><circle cx="75.479" cy="2.767" r="2.72" /><circle
							cx="87.514"
							cy="2.767"
							r="2.719"
						/></g
					><g transform="translate(0 61)"
						><circle cx="3.261" cy="2.846" r="2.72" /><circle
							cx="15.296"
							cy="2.846"
							r="2.719"
						/><circle cx="27.333" cy="2.846" r="2.72" /><circle
							cx="39.369"
							cy="2.846"
							r="2.72"
						/><circle cx="51.405" cy="2.846" r="2.72" /><circle
							cx="63.441"
							cy="2.846"
							r="2.72"
						/><circle cx="75.479" cy="2.846" r="2.72" /><circle
							cx="87.514"
							cy="2.846"
							r="2.719"
						/></g
					><g transform="translate(0 73)"
						><circle cx="3.261" cy="2.926" r="2.72" /><circle
							cx="15.296"
							cy="2.926"
							r="2.719"
						/><circle cx="27.333" cy="2.926" r="2.72" /><circle
							cx="39.369"
							cy="2.926"
							r="2.72"
						/><circle cx="51.405" cy="2.926" r="2.72" /><circle
							cx="63.441"
							cy="2.926"
							r="2.72"
						/><circle cx="75.479" cy="2.926" r="2.72" /><circle
							cx="87.514"
							cy="2.926"
							r="2.719"
						/></g
					><g transform="translate(0 85)"
						><circle cx="3.261" cy="3.006" r="2.72" /><circle
							cx="15.296"
							cy="3.006"
							r="2.719"
						/><circle cx="27.333" cy="3.006" r="2.72" /><circle
							cx="39.369"
							cy="3.006"
							r="2.72"
						/><circle cx="51.405" cy="3.006" r="2.72" /><circle
							cx="63.441"
							cy="3.006"
							r="2.72"
						/><circle cx="75.479" cy="3.006" r="2.72" /><circle
							cx="87.514"
							cy="3.006"
							r="2.719"
						/></g
					></g
				></g
			></g
		></svg
	>
</div>
