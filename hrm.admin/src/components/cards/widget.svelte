
<script>
	import { cn } from '$lib/utils';

	export let bodyBg = '';
	export let iconColor = '';
	export let iconBg = '';
	export let borderBg = '';
	export let icon = '';
	export let hideLabel = true;
	export let isLoading = false;
	export let count = 0;
	export let label = '';
	export let labelColor = '';
</script>

<div class="w-full">
	<div class="relative h-full flex flex-col bg-white shadow rounded-lg dark:bg-dark-card">
		<div class={cn(`flex-auto p-6 rounded-lg`, bodyBg)}>
			<div class="flex items-center justify-between">
				<div
					class={cn(`p-4 grid place-content-center shrink-0  rounded`, iconColor, iconBg, borderBg)}
				>
					<iconify-icon {icon} fontSize={25} />
				</div>
				<div class="flex flex-col justify-items-end" class:hidden={!hideLabel}>
					<div class="flex flex-col gap-2 animate-pulse my-4" class:hidden={!isLoading}>
						<span class="bg-gray-300 h-4 w-8 rounded-full" />
						<div class="bg-gray-300 w-20 h-4 rounded-full" />
					</div>

					<div
						class="font-sans text-4xl font-medium text-right text-black dark:text-secondary-600 counter mt-0 mb-2"
						class:hidden={isLoading}
					>
						<p class="flex flex-col">
							<span>
								{count}
							</span>
							<span class={cn(`text-lg text-right font-light`, labelColor)}>
								{label}
							</span>
						</p>
					</div>
				</div>
				<slot />
			</div>
		</div>
	</div>
</div>
