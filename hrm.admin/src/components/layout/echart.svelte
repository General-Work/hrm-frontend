<script lang="ts">
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
</style>
