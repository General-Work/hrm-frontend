<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$cmps/ui/button.svelte';
	import { extractQueryParam, extractRedirectToRoute, showError, showInfo } from '$lib/utils';
	import { signIn } from '@auth/sveltekit/client';
	import SvelteOtp from '@k4ung/svelte-otp';
	import axios from 'axios';
	import { onMount } from 'svelte';

	let value = '';
	let hasError = false;

	let seconds = 20;
	let countdownInterval: any;
	let busy = false;
	let isLoading = false;

	$: email = extractQueryParam($page.url.search, 'email') || '';
	$: password = extractQueryParam($page.url.search, 'pwd') || '';

	function startCountdown() {
		countdownInterval = setInterval(() => {
			if (seconds > 0) {
				seconds--;
			} else {
				clearInterval(countdownInterval);
			}
		}, 2000);
	}

	const submit = async () => {
		if (!value) {
			hasError = true;
			return;
		}
		try {
			busy = true;
			const ret = await signIn('credentials', {
				email: email,
				otp: value,
				redirect: false
			});

			if (ret) {
				const error = await ret?.json();
				if (error?.url.includes('?error=Configuration')) {
					showError('Failed To Confirm OTP');
					return;
				}
				const { ok } = ret;

				if (ok) {
					const path = extractQueryParam($page.url.search, 'redirectTo');

					// if (path) {
					// 	if (browser) {
					// 		// goto(path);
					// 		// window.location.href = path;
					// 	}
					// } else {
					// 	// goto('/dashboard');
					// }
					if (browser) window.location.reload();
				}
			}
		} catch (e: any) {
			showError(e.message || e);
		} finally {
			busy = false;
		}
	};

	async function resendOtp() {
		try {
			isLoading = true;

			const ret = await axios.patch('/login', { email, password });
			if (!ret.data.success) {
				showError(ret.data.message);
				return;
			}
			showInfo(ret.data.message);
			seconds = 20;
			startCountdown();
		} catch (e: any) {
			showError(e);
		} finally {
			isLoading = false;
		}
	}

	onMount(() => startCountdown());
	$: if (value && value.length === 4 && hasError) {
		hasError = false;
	}
</script>

<div class="flex flex-col gap-8 md:px-12 pt-10">
	<p class="text-gray-500 text-sm items-center flex gap-1 text-center">
		<iconify-icon icon="solar:danger-circle-bold-duotone" class="text-red-600" />
		Enter the digits that were sent to your email
	</p>
	<div class="flex justify-center w-full">
		<div class="flex flex-col gap-3">
			<SvelteOtp
				numberOnly
				bind:value
				separator="-"
				numOfInputs={4}
				inputStyle={`width: 50px; height:50px; border-radius: 5px; ${
					hasError && 'border: 1px solid red;'
				} `}
			/>
			<span class:hidden={!hasError} class="text-red-600 text-sm">OTP value is required</span>
		</div>
	</div>
	<div class="flex items-center gap-2 justify-center">
		<Button
			type="button"
			label="Resend OTP"
			disabled={seconds !== 0 || isLoading}
			busy={isLoading}
			on:click={resendOtp}
		/>
		<p class:hidden={!(seconds !== 0)} class="flex items-center gap-1 text-blue-600 text-sm">
			after
			{seconds} seconds
		</p>
	</div>
	<div class="grid">
		<Button label="Submit" color="primary" {busy} on:click={() => submit()} />
	</div>
</div>
