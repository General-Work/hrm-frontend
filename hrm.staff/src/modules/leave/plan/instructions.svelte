<script lang="ts">
	import Helper from '$cmps/ui/helper.svelte';
	import InstrcutionCard from '$cmps/ui/instrcutionCard.svelte';
	import { Avatar } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleSubmit() {
		dispatch('message', { type: 'instructions', data: {} });
	}
</script>

<div class="w-full h-full">
	<form
		on:submit|preventDefault={handleSubmit}
		class="w-full h-full flex flex-col gap-3 2xl:gap-6 p-4 pt-0"
	>
		<Helper
			><span class="text-sm 2xl:text-base"
				>Kindly go through these before you start your planning</span
			></Helper
		>
		<div class="space-y-3 2xl:space-y-5 bg-purple-50 p-4">
			<InstrcutionCard number={1} text="You can break your leave plan into three distinct parts." />
			<InstrcutionCard
				number={2}
				text="Your total planned days should align with your entitled leave days."
			/>
			<InstrcutionCard
				number={3}
				text="Your leave plan will undergo approval by your supervisor, fostering collaboration and
      ensuring alignment with institutions objectives."
			/>
			<InstrcutionCard
				number={4}
				text="Both your supervisor and the HR department have the opportunity to provide input and
        adjustments to your plan before final approval, ensuring it meets both your needs and
        the needs of the organization."
			/>
			<InstrcutionCard
				number={5}
				text="Once finalized and approved, your leave plan will be promptly communicated to you via
        email, ensuring seamless coordination and peace of mind."
			/>
		</div>
		<div class="grid lg:grid-cols-3 gap-2 bg-purple-50 p-4">
			<div class="flex items-center gap-4">
				<Avatar class="grid place-content-center shrink-0 bg-sky-200">
					<iconify-icon icon="clarity:date-solid-alerted" style="font-size: 18px;" />
				</Avatar>
				<div class="flex flex-col">
					<span class="font-medium text-gray-600">Days Entitled :</span>
					<span>46</span>
				</div>
			</div>
			<div class="flex items-center gap-4">
				<Avatar class="grid place-content-center shrink-0 bg-sky-200">
					<iconify-icon icon="clarity:date-solid-alerted" style="font-size: 18px;" />
				</Avatar>
				<div class="flex flex-col">
					<span class="font-medium text-gray-600">Days Planned :</span>
					<span>0</span>
				</div>
			</div>
			<div class="flex items-center gap-4">
				<Avatar class="grid place-content-center shrink-0 bg-sky-200">
					<iconify-icon icon="clarity:date-solid-alerted" style="font-size: 18px;" />
				</Avatar>
				<div class="flex flex-col">
					<span class="font-medium text-gray-600">Days Remaining :</span>
					<span>46</span>
				</div>
			</div>
		</div>
		<slot isValid={true} />
	</form>
</div>
