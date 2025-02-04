<script lang="ts" context="module">
	export interface IAnnualLeavePlan {
		name: string;
	}
</script>

<script lang="ts">
	export let data: IAnnualLeavePlan;
	export let requestId = '';

	console.log(data, requestId);
</script>

Leave Plan
<div>
	{data.name}
</div>
