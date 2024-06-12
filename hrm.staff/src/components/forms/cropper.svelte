<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Cropper from 'cropperjs';
	import 'cropperjs/dist/cropper.css';
	import { fade } from 'svelte/transition';
	import { cubicIn, elasticInOut } from 'svelte/easing';

	export let image = '';
	export let selectedImageName = '';
	let cropper: Cropper;
	let imageElement: HTMLImageElement | null = null;

	const dispatch = createEventDispatcher();

	onMount(() => {
		if (imageElement) {
			cropper = new Cropper(imageElement, {
				// aspectRatio: 16 / 9,
				viewMode: 1,
				crop(event) {
				
				}
			});
		}
	});

	function destroyCropper() {
		if (cropper) {
			cropper.destroy();
		}
	}

	async function getCroppedCanvas() {
		if (cropper) {
			const croppedCanvas = cropper.getCroppedCanvas();
			const croppedImageURL = croppedCanvas.toDataURL('image/png');
			const response = await fetch(croppedImageURL as string);
			const blob = await response.blob();
			const newFIle = new File([blob], selectedImageName, { type: 'image/png' });
			// console.log(croppedImageURL);
			dispatch('save', { file: newFIle, url: croppedImageURL });
		}
	}
</script>

<div class="fixed z-[1000] inset-0 w-screen h-screen">
	<div
		class="fixed inset-0 flex-grow z-[1000] bg-gray-900  shadow-sm shadow-gray-50 h-12 overflow-y-auto"
	>
		<div class="p-2 mx-4 flex justify-between items-center h-full">
			<span class="font-semiblod text-white tracking-tighter flex items-center gap-2">
				<iconify-icon icon="fluent:image-edit-16-filled" style="font-size: 20px;" />
				Image Editor - Crop and Resize images with ease.</span
			>
			<div class="flex gap-4 text-white items-center">
				<button
					on:click={getCroppedCanvas}
					type="button"
					class="grid tracking-tighter antialiased place-content-center rounded-[5px] bg-purple-500 px-3 py-2 text-sm hover:bg-purple-600"
				>
					Save Cropped Image
				</button>
				<button
					type="button"
					class="grid place-content-center rounded-[5px] bg-blue-500 px-3 py-2 text-sm hover:bg-blue-600 tracking-tighter"
					on:click={() => {
						dispatch('cancel');
						destroyCropper();
					}}
				>
					Save Original Image
				</button>
			</div>
		</div>
	</div>
	<div
		aria-live="assertive"
		class="pointer-events-none fixed inset-0 flex items-center place-content-center sm:items-start z-[1001]"
	>
		<div
			class="flex flex-col flex-grow pointer-events-none h-full"
			in:fade={{ duration: 300, easing: cubicIn }}
			out:fade={{ duration: 200, easing: elasticInOut }}
		>
			<div class="h-12" style="line-height: 4rem">&nbsp;</div>
			<div class=" bg-opacity-75 transition-opacity border-gray-200 flex-grow pointer-events-auto">
				<div class=" grid h-full w-full">
					<div class=" overflow-hidden transform transition-all w-full">
						<img bind:this={imageElement} src={image} alt="Image to crop" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	img {
		max-width: 100%;
	}
</style>
