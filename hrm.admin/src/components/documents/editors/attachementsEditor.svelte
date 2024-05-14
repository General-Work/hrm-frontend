<script lang="ts">
	import ShowFile from '$cmps/ui/showFile.svelte';

	export let generalSRC = '';
	export let generalLabel = '';
	export let passportPicture = '';
	export let schoolCertificate = '';
	export let birthCertificate = '';
	export let nssCertificate = '';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pt-4">
	{#if passportPicture}
		<div>
			<ShowFile src={passportPicture} imageName="Passport Picture" />
		</div>
	{/if}
	{#if schoolCertificate}
		<div>
			<ShowFile src={schoolCertificate} imageName="Institution Certificate" />
		</div>
	{/if}
	{#if birthCertificate}
		<div>
			<ShowFile src={birthCertificate} imageName="Birth Certificate" />
		</div>
	{/if}
	{#if nssCertificate}
		<div>
			<ShowFile src={birthCertificate} imageName="NSS Certificate" />
		</div>
	{/if}
	{#if generalSRC}
		<div>
			<ShowFile src={generalSRC} imageName={generalLabel} />
		</div>
	{/if}
</div>
