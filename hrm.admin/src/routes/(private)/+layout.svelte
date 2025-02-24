<script lang="ts">
	import { page } from '$app/stores';
	import axios from '$lib/axios';
	import { showError } from '$lib/utils';
	import { readAuthUser, userInfo } from '$svc/auth';

	async function fetchData() {
		try {
			const ret = await readAuthUser();
			if (ret.success) {
				userInfo.set(ret.data);
			}
		} catch (error: any) {
			showError(error.message || error);
		}
	}

	$: if ($page.data.session) {
		fetchData();
	}
</script>

<slot />
