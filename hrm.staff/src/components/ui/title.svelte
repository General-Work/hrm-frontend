<script>
	export let label = '';
	export let icon = '';
	export let showButton = false;
</script>

<div
	class="border-b form-section-inscription py-2 text-[#009484] font-medium flex items-center gap-2 w-full"
>
	<iconify-icon {icon} class:hidden={!icon} />
	{label}
	<button
		class:hidden={!showButton}
		type="button"
		class="text-red-500 text-sm rounded-sm gap-1 border border-transparent hover:border-red-500 p-1 grid place-content-center"
		on:click
	>
		<iconify-icon icon="ic:round-close" />
	</button>
</div>

<style>
	.form-section-inscription {
		position: relative;
	}

	.form-section-inscription::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 5%;
		height: 3px;
		background: #009484;
		opacity: 0.5;
	}
</style>
