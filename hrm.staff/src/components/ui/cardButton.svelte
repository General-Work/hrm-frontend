<script lang="ts" context="module">
	export interface IButtonConfig {
		kind: 'accept' | 'generic' | 'file' | 'form' | 'rejection' | 'approve';
		icon?: string;
		iconColor?: string;
		iconBgColor?: string;
		label: string;
		subLabel: string;
		path?: string;
		onClick?: () => void;
	}
	const kinds = {
		generic: {
			icon: 'solar:verified-check-bold',
			iconBgColor: 'bg-green-300',
			iconSize: 25,
			iconColor: 'text-gray-800',
			label: '',
			subLabel: '',
			showBg: true,
			showArrow: false,
			showIconHover: true,
			moreHeight: false
		},
		accept: {
			icon: 'ph:check-circle',
			iconBgColor: 'bg-green-300',
			iconSize: 25,
			iconColor: 'text-gray-800',
			label: '',
			subLabel: '',
			showBg: true,
			showArrow: false,
			showIconHover: true,
			moreHeight: false
		},
		approve: {
			icon: 'ph:check-circle',
			iconBgColor: 'bg-green-300',
			iconSize: 25,
			iconColor: 'text-gray-800',
			label: '',
			subLabel: '',
			showBg: true,
			showArrow: false,
			showIconHover: true,
			moreHeight: false
		},
		reject: {
			icon: 'ph:x-circle',
			iconBgColor: 'bg-red-400',
			iconSize: 25,
			iconColor: 'text-white',
			label: '',
			subLabel: '',
			showBg: true,
			showArrow: false,
			showIconHover: true,
			moreHeight: false
		},

		file: {
			icon: 'ph:file-text',
			iconBgColor: 'bg-gray-200',
			iconSize: 25,
			iconColor: 'text-gray-800',
			label: '',
			subLabel: '',
			showBg: true,
			showArrow: false,
			showIconHover: true,
			moreHeight: false
		},
		form: {
			icon: 'game-icons:archive-register',
			iconBgColor: 'bg-teal-100',
			iconSize: 25,
			iconColor: 'text-blue-800',
			label: '',
			subLabel: '',
			showBg: true,
			showArrow: false,
			showIconHover: true,
			moreHeight: false
		}
	};
</script>

<script lang="ts">
	export let icon = '';
	export let iconBgColor = '';
	export let iconSize = 0;
	export let iconColor = '';
	export let label = '';
	export let subLabel = '';
	export let showBg: boolean | null = null;
	export let showArrow = false;
	export let showIconHover = false;
	export let moreHeight = false;
	export let showShadow = false;
	export let kind = 'generic';
	export let active = false;
	export let href = '';
	// when kind is set, use the defaults from the kind
	$: if (kind) {
		const config = (kinds as any)[kind] ?? kinds.generic;
		icon ||= config.icon;
		iconBgColor ||= config.iconBgColor;
		iconSize ||= config.iconSize;
		iconColor ||= config.iconColor;
		label ||= config.label;
		subLabel ||= config.subLabel;
		showBg = showBg === null || showBg === undefined ? config.showBg : false;
		showArrow ||= config.showArrow;
		showIconHover ||= config.showIconHover;
		moreHeight ||= config.moreHeight;
	}
</script>

<a
	class="border rounded-[6px] border-gray-400/20 pl-4 py-2.5 w-full cursor-pointer flex items-center"
	class:bg-white={showBg}
	class:shadow-sm={showBg}
	class:shadow={showShadow}
	class:shadow-gray-500={showBg}
	class:shadow-gray-100={showShadow}
	class:hover:scale-95={showBg}
	class:h-20={moreHeight}
	class:isActive={active}
	class:isNotActive={!active}
	on:click
	{href}
>
	<div class="flex justify-between items-center w-full">
		<div class="flex justify-start items-center gap-3">
			<div class="bg-white grid place-content-center p-2.5 w-12 h-12 rounded-full loginbox">
				<iconify-icon {icon} style="font-size: {iconSize}px;" class={iconColor} />
			</div>
			<div class="flex flex-col text-left">
				<span class="font-medium truncate">{label}</span>
				<span class="text-sm text-gray-500 truncate">{subLabel}</span>
			</div>
		</div>
		<!-- {#if showArrow}
			<p class=" rounded-full w-9 h-9 grid place-content-center">
				<iconify-icon icon="iconamoon:arrow-right-2-light" style="font-size: 25px;" />
			</p>
		{/if} -->
	</div>
</a>

<style>
	.isActive {
		@apply border-pink-400 bg-pink-50/80;
	}
	.isNotActive {
		@apply border-transparent hover:border-pink-400;
	}
</style>
