<script lang="ts">
	import { deployedAppURL, showInfo } from '$lib/utils';
	import Divider from './divider.svelte';
	import QrCode from './QrCode.svelte';
	import { copyText } from 'svelte-copy';
	export let route = '';
</script>

<div class="w-full h-full">
	<div class="flex-col flex w-full h-full gap-4">
		<div class="flex items-center gap-3 w-full">
			<p class="bg-gray-100 px-3 py-2 rounded-md flex-grow truncate">
				{deployedAppURL}{route}
			</p>
			<button
				class="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-[5px] text-sm text-white"
				on:click={async () => {
					await copyText(`${deployedAppURL}${route}`);
					showInfo('Copied');
				}}
			>
				Copy
			</button>
		</div>

		<Divider text="QR Code" textClass="bg-orange-300 text-black rounded-[5px] px-3 py-1" />
		<QrCode {route} size={320} />
	</div>
</div>
