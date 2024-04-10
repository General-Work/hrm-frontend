<script>
	import Logo from '$lib/images/logo_full.png';
	import dayjs from 'dayjs';
</script>

<footer class="bg-white border-t-2 border-gray-200 h-full">
	<div class="lg:container lg:mx-auto lg:px-40">
		<div class="flex items-center justify-center">
			<div class="w-32 ">
				<img src={Logo} alt="logo" class=""/>
			</div>
			<p class="text-gray-500">
				© {dayjs(new Date()).year()} HRM - Employee Services Powered by
				<span class="text-[#993306]">Connect Solutions</span>
			</p>
		</div>
	</div>
</footer>
