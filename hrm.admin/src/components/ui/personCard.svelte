<script lang="ts">
  import type { IUserInfo } from "$types/appTypes";
  import { Avatar } from "flowbite-svelte";

  export let person: IUserInfo;
</script>

<div class="bg-white h-[500px] shadow-lg">
  <div class="h-80">
    {#if person.profileImage}
      <img
        src={person.profileImage}
        alt="img"
        class="w-full h-72 max-h-72 bg-teal-400"
      />
    {:else}
      <div class="w-full h-72 max-h-72 bg-teal-400">
        <div class="flex justify-center pt-10">
          <Avatar size="xl" class="text-2xl">{person.initials}</Avatar>
        </div>
      </div>
    {/if}
  </div>
  <div class="diagonal-container">
    <div class="flat-content">
      <div class="absolute -top-32 pt-2 w-full">
        <p class="text-center font-medium text-lg">{person.email}</p>
        <p class="text-center text-gray-500 text-sm">{person.role}</p>
        <div class="grid grid-cols-2 px-4 gap-2 pt-2">
          <div class="flex flex-col">
            <p class="font-light text-teal-500">Name</p>
            <p class="font-medium truncate">{person.fullName}</p>
          </div>
          <div class="flex flex-col">
            <p class="font-light text-teal-500">Email</p>
            <p class="font-medium truncate">{person.email}</p>
          </div>
          {#if person.status}
            <div class="flex flex-col">
              <p class="font-light text-teal-500">Admin Status</p>
              <p class="font-medium truncate">{person.status}</p>
            </div>
          {/if}
          <!-- {#if person.}
						<div class="flex flex-col">
							<p class="font-light text-teal-500">Phone Number</p>
							<p class="font-medium truncate">
								{person.phoneNumber}
							</p>
						</div>
					{/if} -->
          <!-- {#if person.district}
						<div class="flex flex-col">
							<p class="font-light text-teal-500">District</p>
							<p class="font-medium truncate">{person.district}</p>
						</div>
					{/if} -->
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .diagonal-container {
    position: relative;
    height: 255px;
    top: -25%;
    overflow: hidden;
  }

  .diagonal-container::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    transform: skewY(-10deg);
    transform-origin: top right;
    top: 0;
    right: 0;
  }

  .flat-content {
    position: absolute;
    width: 100%;
    height: 90px;
    bottom: 0;
    background-color: white;
  }
</style>
