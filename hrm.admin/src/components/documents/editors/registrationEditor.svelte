<script lang="ts" context="module">
	export interface IStaffRegistration {
		name: string;
	}
</script>

<script lang="ts">
	export let data: IStaffRegistration;
	export let requestId = '';

	console.log(data, requestId);
</script>

registration
<div>
	{data.name}
</div>
