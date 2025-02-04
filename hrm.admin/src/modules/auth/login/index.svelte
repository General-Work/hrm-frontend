<script>
	import Info from './info.svelte';
	import PageLayout from './pageLayout.svelte';
</script>

<div
	class="relative h-screen w-screen loginscreen overflow-hidden isolate p-1
"
>
	<div class="lg:flex flex items-center justify-center w-full container mx-auto lg:flex-row h-full">
		<Info />
		<PageLayout>
			<slot />
		</PageLayout>
	</div>
</div>
