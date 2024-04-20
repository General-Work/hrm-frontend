<script>
	export let label = '';
	export let icon = '';
</script>

<div
	class="border-b form-section-inscription py-2 text-[#009484] font-medium flex items-center gap-2"
>
	<iconify-icon {icon} class:hidden={!icon} />
	{label}
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
