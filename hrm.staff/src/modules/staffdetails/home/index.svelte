<script lang="ts">
	import type { IStaffProfile } from '$svc/staffdetails';

	export let data: IStaffProfile;

	$:console.log(data);
</script>

<div class="w-full h-full">
	Awaiting api that will get details of the below for a staff
	<ul class="list list-disc">
		<li>Current Appointment Details</li>
		<li>Current Posting Details</li>
		<li>Bio details</li>
		<li>Family details</li>
		<li>Children details</li>
		<li>Profession details</li>
		<li>Accomodation details</li>
	</ul>
</div>
