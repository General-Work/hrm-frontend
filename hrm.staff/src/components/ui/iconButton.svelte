<script lang="ts" context="module">
	const kind = {
		success: 'bg-green-400 hover:bg-green-500 text-white',
		primary: 'bg-blue-500 hover:bg-blue-600 text-white',
		ghost: ' hover:bg-gray-100',
		default: ' hover:bg-gray-100',
		warning: 'bg-yellow-300  hover:bg-yellow-400',
		pink: 'hover:bg-pink-100 hover:text-pink-600'
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	export let icon: string;
	export let color: 'success' | 'primary' | 'ghost' | 'warning' | 'default' | 'pink' = 'default';
	export let size = 20;
	export let otherClasses = '';
</script>

<button
	class={cn(`p-2 grid place-content-center rounded-full ${kind[color]}`, otherClasses)}
	on:click
	type="button"
>
	<iconify-icon {icon} style="font-size: {size}px;" />
</button>
