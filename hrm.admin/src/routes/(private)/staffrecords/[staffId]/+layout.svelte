<script>
	import Box from '$cmps/ui/box.svelte';
	import RightPanel from '$cmps/ui/rightPanel.svelte';
	import StaffHeader from '$cmps/ui/staffHeader.svelte';
	export let data;
</script>

<div class=" w-full h-full flex gap-4 overflow-hidden">
	<section class=" flex-grow flex flex-col gap-3 h-full">
		<div>
			<StaffHeader />
		</div>
		<Box otherClasses="p-4 " rounded bgWhite>
			<slot />
		</Box>
	</section>
	<div class="h-full bg-gray-200 w-0.5 pb-10 hidden md:block" />
	<aside class="hidden w-[19rem] shrink-0" class:md:block={true}>
		<RightPanel showActionLabel buttons={data.pages} />
	</aside>
</div>
