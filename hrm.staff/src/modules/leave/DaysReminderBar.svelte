<script>
	import { Avatar } from 'flowbite-svelte';

	export let daysEntitled = 0;
	export let daysRemaining = 0;
	export let daysPlanned = 0;
</script>

<div class="grid lg:grid-cols-3 gap-2 bg-purple-50 p-4">
	<div class:hidden={!Boolean(daysEntitled)} class="flex items-center gap-4">
		<Avatar class="grid place-content-center shrink-0 bg-sky-200">
			<iconify-icon icon="clarity:date-solid-alerted" style="font-size: 18px;" />
		</Avatar>
		<div class="flex flex-col">
			<span class="font-medium text-gray-600">Days Entitled :</span>
			<span>{daysEntitled}</span>
		</div>
	</div>
	<div  class="flex items-center gap-4">
		<Avatar class="grid place-content-center shrink-0 bg-sky-200">
			<iconify-icon icon="clarity:date-solid-alerted" style="font-size: 18px;" />
		</Avatar>
		<div class="flex flex-col">
			<span class="font-medium text-gray-600">Days Planned :</span>
			<span>{daysPlanned}</span>
		</div>
	</div>
	<div class:hidden={!Boolean(daysRemaining)} class="flex items-center gap-4">
		<Avatar class="grid place-content-center shrink-0 bg-sky-200">
			<iconify-icon icon="clarity:date-solid-alerted" style="font-size: 18px;" />
		</Avatar>
		<div class="flex flex-col">
			<span class="font-medium text-gray-600">Days Remaining :</span>
			<span>{daysRemaining}</span>
		</div>
	</div>
</div>
