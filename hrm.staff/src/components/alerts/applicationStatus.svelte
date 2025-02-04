<script>
	import { Avatar } from 'flowbite-svelte';
	export let avatarIcon = 'fluent:phone-lock-24-filled';
	export let label = '';
	export let avatarIconTextColor = 'text-[#993306]';
	export let avatarIconBorderColor = 'border-[#993306]';
	// export let message = '';
</script>

<div class="py-8 space-y-6">
	<div class="space-y-3">
		<div class="flex justify-center">
			<Avatar class=" border rounded-full  w-14 h-14 {avatarIconBorderColor} {avatarIconTextColor}">
				<iconify-icon icon={avatarIcon} style="font-size: 35px;" />
			</Avatar>
		</div>
		<p class="flex justify-center text-3xl text-black font-medium">{label}</p>
	</div>
	<div>
		<slot />
	</div>
</div>
