<script>
	export let label = '';
	export let subLabel = '';
	export let isColumn = true;
</script>

<div class="flex gap-3 flex-col lg:flex-row">
	<span class="text-gray-500">{label} :</span>
	<span>{subLabel}</span>
</div>
