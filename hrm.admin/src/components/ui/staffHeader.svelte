<script>
	import { Avatar, Badge } from 'flowbite-svelte';
	import Box from './box.svelte';
</script>

<Box bgWhite rounded otherClasses="p-4">
	<div class="flex flex-col lg:flex-row lg:items-center gap-4">
		<div class="flex justify-center lg:justify-start">
			<Avatar
				src="https://t3.ftcdn.net/jpg/03/73/52/24/360_F_373522464_UzkM3IvqgqpS0qIy2kpkB5QiV7Bw7NyS.jpg"
				class="w-24 h-24"
			/>
		</div>
		<div class="flex flex-col gap-2">
			<div class="flex justify-center lg:justify-start items-center gap-5">
				<p class="text-2xl uppercase">Yaw Marfo</p>
				<Badge border color="green">Active</Badge>
			</div>

			<div class="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 text-[15px]">
				<div>
					<p><b>Staff ID: </b> <span>MS000012</span></p>
					<p><b>Directorate:</b> <span>Operations</span></p>
				</div>
				<div>
					<p><b>Department:</b> <span>IT</span></p>
					<p><b>Unit:</b> <span>Networking and Security</span></p>
				</div>
				<div>
					<p><b>Phone:</b> <span>0123456789</span></p>
					<p><b>Email:</b> <span>ymarfo@outlook.com</span></p>
				</div>
			</div>
		</div>
	</div>
</Box>
