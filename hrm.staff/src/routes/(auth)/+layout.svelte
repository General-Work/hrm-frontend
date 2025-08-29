<script lang="ts">
	import { authInit, refreshToken } from '$svc/auth';
	import { onMount, onDestroy } from 'svelte';

	let interval = undefined;
	onMount(async () => {
		// console.log("init layout")
		interval = setInterval(() => {
			refreshToken('STAFF');
		}, 30000);
		authInit('STAFF', '/login');
	});

	onDestroy(() => clearInterval(interval as any));
</script>

<slot />
