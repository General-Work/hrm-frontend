<script lang="ts">
	import Helper from '$cmps/ui/helper.svelte';
	import { Avatar } from 'flowbite-svelte';
</script>

<div class="w-full h-full justify-center md:items-center flex">
	<div
		class=" h-[500px] md:w-full lg:w-[900px] md:border border-blue-300 rounded-[5px] flex flex-col md:items-center lg:px-6 xl:px-10 2xl:px-14"
	>
		<div class="hidden md:block py-10">
			<Helper>
				<span>Click on a request type to continue with the process..</span>
			</Helper>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 p-6 gap-6 w-full">
			<a
				href="/approvals/plan"
				class="bg-white hover:bg-pink-50 p-6 border border-pink-100 rounded-[5px] shadow hover:shadow-md"
			>
				<div class="flex flex-col justify-center items-center gap-6">
					<Avatar size="lg" class="text-xl bg-red-50 border-red-300 text-red-500 border">4</Avatar>
					<span class="text-lg">Annual Leave Plan</span>
				</div>
			</a>
			<a
				href="/approvals/request"
				class="bg-white hover:bg-pink-50 p-6 border border-pink-100 rounded-[5px] shadow hover:shadow-md"
			>
				<div class="flex flex-col justify-center items-center gap-6">
					<Avatar size="lg" class="text-xl bg-red-50 border-red-300 text-red-500 border">5</Avatar>
					<span class="text-lg">Leave Request</span>
				</div>
			</a>
			<a
				href="/approvals/excuseduty"
				class="bg-white hover:bg-pink-50 p-6 border border-pink-100 rounded-[5px] shadow hover:shadow-md"
			>
				<div class="flex flex-col justify-center items-center gap-6">
					<Avatar size="lg" class="text-xl bg-red-50 border-red-300 text-red-500 border">1</Avatar>
					<span class="text-lg">Excuse duty</span>
				</div>
			</a>
		</div>
	</div>
</div>
