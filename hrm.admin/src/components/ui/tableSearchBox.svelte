<script lang="ts">
	export let placeholder = '';
	export let value = '';
	export let readonly = false
</script>

<section class="bg-gray-200/70 rounded-md flex items-center  p-2  border border-gray-300">
	<iconify-icon icon="eva:search-outline" class="text-xl text-gray-500" />
	<input
		bind:value
		class="outline-none px-2 border-none bg-transparent placeholder:text-sm text-sm w-full"
		{placeholder}
		{readonly}
	/>
</section>
