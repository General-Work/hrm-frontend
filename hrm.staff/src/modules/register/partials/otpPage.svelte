<script lang="ts">
	import { browser } from '$app/environment';
	import { goto, replaceState } from '$app/navigation';
	import Button from '$cmps/ui/button.svelte';
	import { loginNewStaff } from '$svc/auth';
	import { showError } from '$types/utils';
	import SvelteOtp from '@k4ung/svelte-otp';
	import { onMount } from 'svelte';

	export let phoneNumber = '';
	let value = '';
	let hasError = false;

	let seconds = 20;
	let countdownInterval: any;
	let busy = false;

	function startCountdown() {
		countdownInterval = setInterval(() => {
			if (seconds > 0) {
				seconds--;
			} else {
				clearInterval(countdownInterval);
			}
		}, 1000);
	}

	const submit = async () => {
		if (!value) {
			hasError = true;
			return;
		}
		try {
			busy = true;
			const ret = await loginNewStaff({ phoneNumber, otp: value });
			if(browser) location.reload()
		} catch (e: any) {
			showError(e.message || e);
		} finally {
			busy = false;
		}
	};

	onMount(() => startCountdown());
	$: if (value && value.length === 6 && hasError) {
		hasError = false;
	}
</script>

<div class="flex flex-col gap-8 px-12">
	<p class="text-gray-500 text-sm items-center flex gap-1 justify-center">
		<iconify-icon icon="solar:danger-circle-bold-duotone" class="text-red-600" />
		Enter the digits that were sent to your phone number
	</p>
	<div class="flex justify-center">
		<div class="flex flex-col gap-3">
			<SvelteOtp
				numberOnly
				bind:value
				separator="-"
				numOfInputs={6}
				inputStyle={`width: 50px; height:50px; border-radius: 5px; ${
					hasError && 'border: 1px solid red;'
				} `}
			/>
			<span class:hidden={!hasError} class="text-red-600 text-sm">OTP value is required</span>
		</div>
	</div>
	<div class="flex items-center gap-2 justify-center">
		<Button label="Resend OTP" color="goldOutline" disabled={seconds !== 0} />
		<p class:hidden={!(seconds !== 0)} class="flex items-center gap-1 text-blue-600 text-sm">
			after
			{seconds} seconds
		</p>
	</div>
	<Button label="Submit" color="darkBlue" {busy} otherClasses="mx-20" on:click={() => submit()} />
</div>
