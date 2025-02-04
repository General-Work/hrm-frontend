<script lang="ts" context="module">
	import { registerPlugin } from 'svelte-filepond';
	import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
	import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
	// import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
	// import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
	registerPlugin(
		FilePondPluginImageExifOrientation,
		FilePondPluginImagePreview,
		FilePondPluginFileValidateType
		// FilePondPluginImageCrop,
		// FilePondPluginImageTransform
	);
</script>

<script lang="ts">
	import { createEventDispatcher, onMount, getContext } from 'svelte';
	import FilePond from 'svelte-filepond';
	import { nanoid } from 'nanoid';
	import { key } from './form';
	import { fade } from 'svelte/transition';
	import FileDisplay from './fileDisplay.svelte';
	import Cropper from './cropper.svelte';

	export let title = 'Click Browse or drop the file to upload';
	export let subTitle = '';
	export let url = '';
	export let name = 'file';
	export let allowMultiple = false;
	export let acceptedFileTypes = ['image/png', 'image/jpeg', 'application/pdf'];
	export let files: any[] = [];
	export let label = '';
	export let required = false;
	export let showError = false;
	export let imageOnly = false; // when set, will restrict type to png and jpeg only
	export let existingFileUrl = ''; // when set, will display the existing image.
	export let allowCrop = false;

	const dispatch = createEventDispatcher();
	let loaded = false;
	let busy = false;
	let renderId = 0;

	const { touched, errors, data, setData }: any = getContext(key);
	let id = nanoid();

	function onChange(err: any, fileItem: any) {
		// console.log(fileItem);
		const { file } = fileItem;

		setData({ ...$data, [name]: file });
		dispatch('change', { name, value: file });
	}

	$: if (imageOnly && acceptedFileTypes?.length === 3) {
		acceptedFileTypes = ['image/png', 'image/jpeg'];
	}
	$: hasError = $touched[name] && $errors[name]?.length;
	$: error = $errors[name]?.join(', ');

	let pond: any;
	let uploadOk;
	let selectedFiles: File[] = [];
	const uploadServerConfig = {};

	onMount(async () => {
		loaded = true;
	});

	let selectedImage = '';
	let selectedImageName = '';
	let allowInit = true;

	function checkFiles(files: any) {
		if (files.length > 1) {
			const newFiles = files.map((x: any) => x.file);
			setData({ ...$data, [name]: newFiles });
			dispatch('change', { name, value: newFiles });
		} else if (files.length === 1) {
			const { file } = files[0];
			if (file.type !== 'application/pdf' && allowCrop) {
				selectedImageName = file.name;
				selectedImage = URL.createObjectURL(file);
				selectedFiles = [file];
			} else {
				setData({ ...$data, [name]: file });
				dispatch('change', { name, value: file });
			}
		}
	}

	function clearFileUrl() {
		// console.log("clearing... ", name)
		// existingFileUrl = ""
		dispatch('clearFileUrl');
	}

	function handleEditCancel() {
		setData({ ...$data, [name]: selectedFiles[0] });
		dispatch('change', { name, value: selectedFiles[0] });
		selectedImage = '';
		existingFileUrl = URL.createObjectURL(selectedFiles[0]);
	}

	async function handleEditSave({ detail }: any) {
		const { file, url } = detail;
		setData({ ...$data, [name]: file });
		dispatch('change', { name, value: file });
		selectedImage = '';
		existingFileUrl = url;
	}
</script>

<div class="flex flex-col flex-grow my-2 h-full w-full">
	<!-- {#if busy}
		<Progress step={1} />
	{/if} -->
	<!-- {#key renderId} -->
	<label for={id} class="font-medium">
		{label}
		{#if required}
			<span class="text-red-500 pl-1">*</span>
		{/if}
	</label>

	{#if existingFileUrl}
		<FileDisplay url={existingFileUrl} on:clearFileUrl={clearFileUrl} />
	{:else if selectedImage}
		<Cropper
			image={selectedImage}
			on:cancel={handleEditCancel}
			on:save={handleEditSave}
			{selectedImageName}
		/>
	{:else}
		<FilePond
			{name}
			required={true}
			allowReplace={true}
			instantUpload={false}
			server={uploadServerConfig}
			{allowMultiple}
			allowRevert={true}
			allowImagePreview={true}
			allowImageResize={true}
			bind:this={pond}
			onupdatefiles={checkFiles}
			{files}
			{acceptedFileTypes}
			allowImageCrop
		/>
	{/if}
	{#if hasError && showError}
		<label
			for={id}
			transition:fade
			class="flex items-center gap-1 pt-1 text-sm"
			class:text-red-600={hasError}
		>
			<iconify-icon icon="solar:danger-circle-bold-duotone" />
			{error}
		</label>
	{/if}
</div>
