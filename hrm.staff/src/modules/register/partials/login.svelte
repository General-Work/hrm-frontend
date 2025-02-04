<script>
	import { Avatar } from 'flowbite-svelte';
	import OtpPage from './otpPage.svelte';
	import PhoneNumberPage from './phoneNumberPage.svelte';

	let activeStep = 0;
	let phoneNumber = '';
</script>

<div class="py-8 space-y-6">
	<div class="space-y-3">
		<div class="flex justify-center">
			<Avatar class="text-[#993306] border rounded-full border-[#993306] w-14 h-14 ">
				<iconify-icon icon="fluent:phone-lock-24-filled" style="font-size: 35px;" />
			</Avatar>
		</div>
		<p class="flex justify-center text-3xl text-black font-medium">Login with OTP</p>
	</div>

	{#if activeStep === 0}
		<PhoneNumberPage bind:activeStep bind:phoneNumber />
	{:else}
		<OtpPage {phoneNumber} />
	{/if}
</div>
