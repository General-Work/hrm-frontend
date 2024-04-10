<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import Login from '$modules/register/partials/login.svelte';

	export let data;
</script>

<Modal
	open={!data.isAuthencticated}
	backdropClass="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 backdrop-blur-md dark:bg-opacity-80"
	dismissable={false}
>
	<Login />
</Modal>
<slot />
