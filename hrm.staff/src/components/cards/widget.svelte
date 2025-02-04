<script lang="ts">
	export let blue: boolean = false;
	export let green: boolean = false;
	export let yellow: boolean = false;
	export let red: boolean = false;
	export let label: string = '';
	export let date: boolean = false;
	export let approval: boolean = false;
	export let count: number = 0;
	export let isLoading: boolean = false;
	export let showLink: boolean = false;
	export let day: boolean = false;
	export let href: null | string = '';
</script>

<div
	class="relative {blue && 'bg-[#B79BFF]'} {green && 'bg-[#A6F7E2]'} {yellow &&
		'bg-[#FFE5A5]'} {red && 'bg-[#ffa5c0]'} pl-6 pr-8 py-6 rounded-lg loginbox"
>
	<div class="flex items-center gap-4 justify-between">
		<div class="flex flex-col gap-1">
			{#if isLoading}
				<div class="animate-pulse flex flex-col gap-2 py-2">
					<div class="w-32 h-4 bg-gray-300 rounded-md"></div>
					<div class="w-20 h-4 bg-gray-300 rounded-md"></div>
				</div>
			{:else}
				<span class="text-black font">{label}</span>
				<p class="text-black text-2xl font-semibold">{count || 0}</p>
			{/if}
		</div>
		<div class="relative">
			<div class="absolute -right-8 -top-[34px]">
				<div class="opacity-5 text-gray-700">
					{#if date}
						<iconify-icon icon="clarity:date-solid" style="font-size: 120px;" />
					{/if}
					{#if approval}
						<iconify-icon icon="wpf:approval"  style="font-size: 110px;" />
					{/if}
					{#if day}
						<iconify-icon icon="clarity:date-solid-badged"  style="font-size: 120px;"  />
					{/if}
				</div>
			</div>
			<div
				class="relative {green && 'text-[#79b1a2]'} {blue && 'text-[#B79BFF]'} {yellow &&
					'text-[#ccb887]'} {red &&
					'text-[#ffa5c0]'} bg-white p-2 rounded-md grid place-content-center shrink-0"
			>
				{#if approval}
					<iconify-icon icon="wpf:approval"  style="font-size: 28px;"  />
				{/if}
				{#if date}
					<iconify-icon icon="bi:calendar-date-fill" style="font-size: 28px;"/>
				{/if}
				{#if day}
					<iconify-icon icon="clarity:date-solid-badged" style="font-size: 28px;"/>
				{/if}
			</div>
		</div>
	</div>
	{#if showLink && !isLoading}
		<div class="relative">
			<a class="absolute text-sm flex items-center gap-1 text-blue-600 hover:text-blue-800" {href}>
				View details
				<iconify-icon icon="ion:arrow-redo-circle-outline" style="font-size: 18px;" />
			</a>
		</div>
	{/if}
</div>
