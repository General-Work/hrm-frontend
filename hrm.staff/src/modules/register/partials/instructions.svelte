<script>
	import Logo from '$lib/images/logo_full.png';

	const bgImageUrl = 'https://citinewsroom.com/wp-content/uploads/2018/06/Korle-Bu.jpg';
</script>

<div class="w-full h-full flex flex-col">
	<div class="bg-gray-400 flex-grow text-white px-4">
		<div class="flex flex-col gap-4">
			<div class="flex justify-center">
				<img src={Logo} alt="logo" class=" w-60" />
			</div>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ipsum dolorum libero aliquid
				possimus provident, incidunt dolores maiores nesciunt labore optio nobis quam at voluptas
				molestias saepe adipisci iste reprehenderit.
			</p>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ipsum dolorum libero aliquid
				possimus provident, incidunt dolores maiores nesciunt labore optio nobis quam at voluptas
				molestias saepe adipisci iste reprehenderit.
			</p>
		</div>
	</div>
	<img src={bgImageUrl} alt="bg" class="xl:h-72 2xl:h-96" />
</div>
