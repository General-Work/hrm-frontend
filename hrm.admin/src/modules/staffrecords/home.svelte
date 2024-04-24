<script lang="ts">
	import Widget from '$cmps/cards/widget.svelte';
	let isLoading = false;
</script>

<div>
	<div class="grid  md:grid-cols-2 grid-cols-1 gap-8 mb-8">
		<Widget
			label="Leave Balance"
			labelColor="text-black"
			bodyBg="bg-teal-100"
			icon="ic:twotone-browser-updated"
			iconColor="text-teal-500"
			iconBg="bg-teal-500/10"
			borderBg="border-teal-200"
			count={10}
			{isLoading}
		/>
		<Widget
			label="Expected Resumption"
			bodyBg="bg-blue-100"
			icon="fa6-solid:business-time"
			iconColor="text-blue-500"
			iconBg="bg-blue-500/10"
			borderBg="border-blue-200"
			count={5}
			{isLoading}
		/>
		<Widget
			label="Active Staff"
			bodyBg="bg-orange-100"
			icon="mdi:clipboard-text-date"
			iconColor="text-orange-500"
			iconBg="bg-orange-500/10"
			borderBg="border-orange-200"
			count={3000}
			{isLoading}
		/>
	</div>
</div>
