<!-- <script lang="ts">
	import { onMount, afterUpdate, onDestroy } from 'svelte';
	import * as echarts from 'echarts';

	export let options: echarts.EChartsOption;
	export let height = 200;
	export let width = 100;
	let chart: echarts.ECharts;

	let chartElement: any;

	onMount(() => {
		chart = echarts.init(chartElement);
		updateChart();

		const resizeObserver = new ResizeObserver(() => {
			chart.resize();
		});

		resizeObserver.observe(chartElement);
	});

	afterUpdate(() => {
		updateChart();
	});

	function updateChart() {
		if (chart && options) {
			chart.setOption(options);
		}
	}

	onDestroy(() => {
		if (chart) {
			chart.dispose();
		}
	});
</script>

<div bind:this={chartElement} style="width: {width}%; height: {height}px;" />

<style>
	/* :global(.chart-container) {
		width: 100%;
		height: 100%;
	} */
</style> -->

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as echarts from 'echarts';

	export let chartOptions: echarts.EChartsOption;
	export let eventListeners: { event: string; handler: (params?: any) => void }[] = [];

	let chartContainer: HTMLDivElement | null = null;
	let chartInstance: echarts.ECharts | undefined;

	onMount(() => {
		if (chartContainer) {
			chartInstance = echarts.init(chartContainer);
			chartInstance.setOption(chartOptions);

			// Add event listeners
			eventListeners.forEach(({ event, handler }) => {
				chartInstance?.on(event, handler);
			});
		}

		return () => {
			// Remove event listeners
			eventListeners.forEach(({ event, handler }) => {
				chartInstance?.off(event, handler);
			});
			chartInstance?.dispose();
		};
	});

	// React to changes in chartOptions or eventListeners
	$: {
		if (chartInstance) {
			chartInstance.setOption(chartOptions);
			eventListeners.forEach(({ event, handler }) => {
				chartInstance?.off(event); // Remove existing listeners to avoid duplication
				chartInstance?.on(event, handler);
			});
		}
	}
</script>

<div bind:this={chartContainer} class="chart"></div>

<style>
	.chart {
		width: 100%;
		height: 100%;
	}
</style>
