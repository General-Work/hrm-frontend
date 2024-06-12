<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	export let placeholder = '';
	export let value = '';
	export let readonly = false;
	export let addParams = true;

	$: ({ searchParams, pathname } = $page.url);

	const onSearchKeyChange = (event: Event) => {
		if (!addParams) return;
		const input = event.target as HTMLInputElement;
		const current = new URLSearchParams(Array.from(searchParams.entries()));
		const value = input.value.trim();

		if (!value) {
			current.delete('search');
		} else {
			current.set('search', value);
		}

		const search = current.toString();
		const query = search ? `?${search}` : '';
		goto(`${pathname}${query}`);
	};
</script>

<section class="bg-gray-50/70 rounded-md flex items-center p-2 border border-gray-300">
	<iconify-icon icon="eva:search-outline" class="text-xl text-gray-500" />
	<input
		{value}
		class="outline-none px-2 border-none bg-transparent placeholder:text-sm text-sm w-full"
		{placeholder}
		{readonly}
		on:change={(e) => {
			onSearchKeyChange(e);
		}}
	/>
	<button
		on:click={() => {
			value = '';
			if (!addParams) return;
			const current = new URLSearchParams(Array.from(searchParams.entries()));
			current.delete('search');
			const search = current.toString();
			const query = search ? `?${search}` : '';
			goto(`${pathname}${query}`);
		}}
		class="grid hover:text-red-500"
		class:hidden={!value.length}><iconify-icon icon="iconamoon:close-thin" /></button
	>
</section>
