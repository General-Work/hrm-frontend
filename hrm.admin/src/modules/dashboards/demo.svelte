<script lang="ts" context="module">
	const distributionOption: echarts.EChartsOption = {
		xAxis: {
			type: 'category',
			data: ['Operations ', 'Nursing', 'Technical', 'HR']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: [120, 200, 150, 80, 70],
				type: 'bar'
			}
		]
	};
	const atrritionoption: echarts.EChartsOption = {
		// title: {
		// 	text: 'Male Vs Female',
		// 	subtext: 'Fake Data'
		// },
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['Male', 'Female']
		},
		// toolbox: {
		// 	show: true,
		// 	feature: {
		// 		dataView: { show: true, readOnly: false },
		// 		magicType: { show: true, type: ['line', 'bar'] },
		// 		restore: { show: true },
		// 		saveAsImage: { show: true }
		// 	}
		// },
		calculable: true,
		xAxis: [
			{
				type: 'category',
				// prettier-ignore
				data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			}
		],
		yAxis: [
			{
				type: 'value'
			}
		],
		series: [
			{
				name: 'Male',
				type: 'bar',
				data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
				markPoint: {
					data: [
						{ type: 'max', name: 'Max' },
						{ type: 'min', name: 'Min' }
					]
				},
				markLine: {
					data: [{ type: 'average', name: 'Avg' }]
				}
			},
			{
				name: 'Female',
				type: 'bar',
				data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
				markPoint: {
					data: [
						{ name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
						{ name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
					]
				},
				markLine: {
					data: [{ type: 'average', name: 'Avg' }]
				}
			}
		]
	};

	const genderoption: echarts.EChartsOption = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '5%',
			left: 'center'
		},
		series: [
			{
				name: 'Gender Share',
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2
				},
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 40,
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				data: [
					{ value: 735, name: 'Male' },
					{ value: 1048, name: 'Female' }
				]
			}
		]
	};

	const events: IActivity[] = [{ name: 'Staff Durbar', start: new Date(), end: new Date() }];

	const secondEventDate = new Date(events[0].start);
	secondEventDate.setDate(secondEventDate.getDate() + 2); // Add 2 days
	const thirdEventDate = new Date(events[0].start);
	thirdEventDate.setDate(thirdEventDate.getDate() + 4); // Add 4 days

	events.push({ name: 'Second Event', start: secondEventDate, end: secondEventDate });
	events.push({ name: 'Third Event', start: thirdEventDate, end: thirdEventDate });
</script>

<script lang="ts">
	import UpcomingEvents, { type IActivity } from '$cmps/cards/upcomingEvents.svelte';

	import Widget from '$cmps/cards/widget.svelte';
	import Echart from '$cmps/layout/echart.svelte';

	let isLoading = false;
</script>

<div class="pt-6">
	<div class="2xl:flex 2xl:grid-cols-2 md:grid-cols-2 gap-8">
		<div class="2xl:w-2/3 w-full mb-4">
			<div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mb-8">
				<Widget
					label="Staff on leave"
					labelColor="text-black"
					bodyBg="bg-teal-100"
					icon="ic:twotone-browser-updated"
					iconColor="text-teal-500"
					iconBg="bg-teal-500/10"
					borderBg="border-teal-200"
					count={50}
					{isLoading}
				/>
				<Widget
					label="Expected Resumption"
					bodyBg="bg-blue-100"
					icon="fa6-solid:business-time"
					iconColor="text-blue-500"
					iconBg="bg-blue-500/10"
					borderBg="border-blue-200"
					count={5}
					{isLoading}
				/>
				<Widget
					label="Active Staff"
					bodyBg="bg-orange-100"
					icon="mdi:clipboard-text-date"
					iconColor="text-orange-500"
					iconBg="bg-orange-500/10"
					borderBg="border-orange-200"
					count={3000}
					{isLoading}
				/>
			</div>
			<div class="flex-auto w-full">
				<div
					class="flex flex-col bg-white rounded-lg shadow dark:bg-dark-card mb-8 overflow-hidden"
				>
					<div>
						<div class="flex flex-wrap">
							<div
								class="relative flex flex-col w-full min-w-0 mb-3 break-words bg-white dark:bg-dark-card"
							>
								<div class="flex-auto">
									<div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
										<div class="">
											<p class=" text-lg p-3 bg-teal-100">Staff distribution per directorate</p>

											<Echart options={distributionOption} height={400} />
										</div>
										<div>
											<p class="p-3 text-lg bg-blue-100">Attrition Rate per month</p>
											<Echart options={atrritionoption} height={400} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full 2xl:w-1/3 pt-8 h-full">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 2xl:grid-cols-1 2xl:gap-6 h-full">
				<div class="w-full h-full bg-white rounded-lg shadow dark:bg-dark-card">
					<div class="flex-auto w-full h-full">
						<div class="p-4 mb-8 overflow-hidden text-black dark:text-secondary-600 h-full">
							<div class="">
								<h4 class="text-2xl font-medium">Gender Share</h4>
							</div>

							<div class="lg:flex lg:grid-cols-2 mx-auto max-w-sm h-full">
								<div class="flex-auto">
									<Echart options={genderoption} height={300} />
								</div>
								<div>
									<div class="flex justify-center gap-4 lg:flex-col lg:justify-start pt-10 lg:pr-2">
										<!-- <ChartLabel blue label="Male" count={getPercentage('male')} />
										<ChartLabel green label="Female" count={getPercentage('female')} /> -->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="h-full bg-white rounded-lg shadow dark:bg-dark-card">
					<div class="flex-auto w-full">
						<div class="flex flex-col mb-10 overflow-hidden">
							<div class="flex flex-wrap justify-between p-4 pb-0">
								<div class="header-title">
									<h4 class="font-medium pb-0">Upcoming events</h4>
								</div>
							</div>
							<div class="flex flex-col p-8 pt-4">
								<UpcomingEvents activities={events} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
