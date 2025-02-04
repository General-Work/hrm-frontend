<script>
	export let title = '';
	export let start = '';
	export let end = '';
</script>

<div id="info" class="border-l-4 border-blue-600 flex flex-col gap-4 pl-4">
	<div class="flex items-center gap-3">
		<iconify-icon icon="gridicons:nametag" class="text-3xl text-teal-500" />
		<div class="flex flex-col">
			<b>Title :</b>
			{title}
		</div>
	</div>
	<div class="flex items-center gap-3">
		<iconify-icon icon="clarity:date-solid-badged" class="text-3xl text-teal-500" />
		<div class="flex flex-col">
			<b>Start Date :</b>
			{start}
		</div>
	</div>
	<div class="flex items-center gap-3">
		<iconify-icon icon="clarity:date-solid-alerted" class="text-3xl text-teal-500" />
		<div class="flex flex-col">
			<b>End Date :</b>
			{end === 'Invalid Date' ? start : end}
		</div>
	</div>
</div>
