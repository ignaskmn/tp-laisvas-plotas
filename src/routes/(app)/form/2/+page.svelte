<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Select from "$lib/components/forms/Select.svelte";
  import MultiSelect from "$lib/components/forms/MultiSelect.svelte";
  import TextField from "$lib/components/forms/TextField.svelte";
  import { goto } from "$app/navigation";
  import { form, services, pageStates } from "$lib/stores";
  import type { Activity } from "$lib/types";

  export let data: { activities: Activity[] };
  let items: { value: number; label: string }[] = [];

  function handleFilled() {
    if ($form.description != "" && !checkActivities() && !checkServices()) {
      $pageStates[1] = 2;
    } else {
      $pageStates[1] = 1;
    }
  }

  function handleEmptied() {
    $pageStates[1] = 0;
  }

  function checkActivities() {
    if ($form.activity && $form.activity != "") {
      return false;
    } else {
      return true;
    }
  }

  function checkServices() {
    if ($form.services && $form.services.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  function handleClick() {
    goto("/form/3");
  }

  const { activities } = data;
  if (activities) {
    items = activities.map((activity) => ({
      value: activity.activity_id,
      label: activity.label,
    }));
  } else {
    //handle error
    console.log("No objects found");
  }

  $: $form.description === "" && checkActivities() && checkServices()
    ? handleEmptied()
    : handleFilled();
</script>

<section class="layout">
  <div class="input-container">
    <Select
      name="activity"
      label="Numatoma veikla"
      placeholder="Pasirinkite iš sąrašo"
      {items}
      bind:value={$form.activity}
    />
  </div>
  <div class="input-container">
    <TextField
      name="description"
      label="Veiklos aprašymas"
      bind:value={$form.description}
    />
  </div>
  <div class="input-container grow1">
    <MultiSelect
      name="services"
      label="Pridėti paslaugas"
      placeholder="Pasirinkite iš sąrašo"
      items={$services}
      listEmpty={$form.services
        ? $form.services.length >= $services.length
        : false}
      bind:value={$form.services}
    />
  </div>
  <Button label="Toliau" isActive={true} onClick={handleClick} />
</section>

<style>
  .layout {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .grow1 {
    flex-grow: 1;
  }

  .input-container {
    width: 100%;
  }
</style>
