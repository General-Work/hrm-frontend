<script lang="ts">
	import { deployedAppURL, showError } from '$lib/utils';
	import { onMount, tick } from 'svelte';
	import QRCode from 'qrcode';

	export let route: any;
	export let size = 400;
	const deployed = deployedAppURL;
	let dataUrl = '';
	let qrCodeCanvas: HTMLCanvasElement | null = null;

	async function getLink(x: string) {
		if (!x) return;
		try {
			dataUrl = `${deployed}/${x}`;
			await tick(); // Wait for DOM to update before generating QR code
			generateQrCode(dataUrl);
		} catch (error: any) {
			showError(error?.message || error);
		}
	}

	async function generateQrCode(url: string) {
		if (qrCodeCanvas) {
			await QRCode.toCanvas(qrCodeCanvas, url, { width: size, height: size });
		} else {
			console.error('qrCodeCanvas is not defined');
		}
	}

	function downloadQrCode() {
		if (qrCodeCanvas) {
			const link = document.createElement('a');
			link.href = qrCodeCanvas.toDataURL('image/png');
			link.download = 'qrcode.png';
			link.click();
		}
	}

	onMount(() => {
		getLink(route);
	});
</script>

<div class="h-full w-full">
	{#if dataUrl}
		<div>
			<div class="flex h-full w-full items-center justify-center">
				<canvas bind:this={qrCodeCanvas}></canvas>
			</div>
			<div class="flex h-full w-full items-center justify-center">
				<button class="px-3 py-2 rounded-[5px] text-sm hover:bg-gray-100" on:click={downloadQrCode}>
					Download
				</button>
			</div>
		</div>
	{:else}
		<p>Failed to generate payment QR code</p>
	{/if}
</div>
