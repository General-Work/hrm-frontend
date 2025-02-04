<script lang="ts" context="module">
  export interface IStep {
    id: string;
    title: string;
    view: any;
    props: any;
  }

  export interface IHasProps {
    props: any;
  }
  export function instanceOfHasProps(obj: any): obj is IHasProps {
    return obj && "props" in obj && obj.props;
  }
</script>

<script lang="ts">
  import { Timeline, TimelineItem } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import { any } from "zod";
  import Button from "./button.svelte";

  export let activeStep = 0;
  export let steps: IStep[] = [];
  export let showInactiveSteps = true;
  export let nextText = "Next";

  const dispatch = createEventDispatcher();
  let onMessage = (step: IStep, message: any) => {
    if (instanceOfHasProps(message)) {
      props[step.id] = message.props;
    }
    dispatch("message", { step, message });
  };

  let props: Record<string, any> = {};
</script>

<Timeline>
  {#each steps as step, index (step.id)}
    {#if index < activeStep}
      <TimelineItem date={step.title} classLi="ml-3 mb-3">
        <!-- <svelte:component this={step.view} active={false} {...props[step.id]} /> -->
      </TimelineItem>
    {:else if index === activeStep}
      <TimelineItem title={step.title}>
        <p class="mt-3">
          <svelte:component
            this={step.view}
            active={true}
            {...props[step.id]}
            on:message={(e) => onMessage(step, e.detail)}
            let:isValid
            let:busy
          >
            <div class="buttons">
              {#if activeStep > 0}
                <Button color="default" on:click={() => activeStep--}
                  >Prev</Button
                >
              {/if}
              <Button
                color="primary"
                type="submit"
                disabled={isValid === false || busy}
              >
                {nextText}
                <iconify-icon
                  icon={busy
                    ? "svg-spinners:180-ring-with-bg"
                    : "cil:arrow-right"}
                  class="ml-3"
                />
              </Button>
            </div>
          </svelte:component>
        </p>
      </TimelineItem>
    {:else if showInactiveSteps}
      <TimelineItem
        date={step.title}
        classLi="mb-3"
        classTime="text-gray-300"
      />
    {/if}
  {/each}
</Timeline>
