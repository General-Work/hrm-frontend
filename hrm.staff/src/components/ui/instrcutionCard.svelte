<script>
	import { Avatar } from 'flowbite-svelte';

	export let number = 0;
	export let text = '';
</script>

<div class="shadow-sm border p-3 shadow-gray-300 bg-white">
	<div class="flex items-center gap-4">
		<Avatar class="bg-pink-100 text-pink-500 shrink-0" size="sm">{number}</Avatar>
		<span class="text-sm 2xl:text-base"> {text} </span>
	</div>
</div>
