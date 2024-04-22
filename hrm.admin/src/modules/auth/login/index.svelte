<script>
	import Editor from './editor.svelte';
	import Info from './info.svelte';
</script>

<div
	class="relative h-screen w-screen loginscreen overflow-hidden isolate p-1
"
>
	<div class="lg:flex flex items-center justify-center w-full container mx-auto lg:flex-row h-full">
		<Info />
		<Editor />
	</div>
</div>
