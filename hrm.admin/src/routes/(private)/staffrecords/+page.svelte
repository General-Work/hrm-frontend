<script lang="ts">
	import MemberSearchBox from '$cmps/layout/memberSearchBox.svelte';
	import { activePage } from '$data/appStore';
	import { readStaffWithStaffID } from '$svc/staffrecords';
	$activePage = {
		title: 'Staff Records',
		showBreadCrumb: false
	};
</script>

<MemberSearchBox fetchFunction={readStaffWithStaffID} showAvatar href="/staffrecords" />
