<script lang="ts">
  import { seconds, Time, Measure } from "safe-units";

  export let label: string;
  export let name: string;
  export let value: Time;

  export let internalHours: number;
  export let internalMinutes: number;
  export let internalSeconds: number;

  // value = toTime(internalHours, internalMinutes, internalSeconds);

  $: readTime(value);

  function readTime(t: Time) {
    internalSeconds = Math.floor(value.value % 60);
    internalMinutes = Math.floor(value.value / 60) % 60;
    internalHours = Math.floor(value.value / 3600);
  }

  function writeTime() {
    const sec = internalHours * 3600 + internalMinutes * 60 + internalSeconds;
    console.log(sec);
    value = Measure.of(sec, seconds);
  }
</script>

<div class="input-group">
  <label class="text-assistive" for="hours_{name}">{label} hours</label>
  <input
    type="number"
    class="form-input"
    id="hours_{name}"
    bind:value={internalHours}
    on:change={writeTime}
    step="1"
    min="0"
  />
  <span class="input-group-addon">hours</span>
  <label class="text-assistive" for="minutes_{name}">{label} minutes</label>
  <input
    type="number"
    class="form-input"
    id="minutes_{name}"
    bind:value={internalMinutes}
    on:change={writeTime}
    step="1"
    min="0"
  />
  <span class="input-group-addon">min</span>
  <label class="text-assistive" for="seconds_{name}">{label} seconds</label>
  <input
    type="number"
    class="form-input"
    id="seconds_{name}"
    bind:value={internalSeconds}
    on:change={writeTime}
    step="1"
    min="0"
  />
  <span class="input-group-addon">sec</span>
</div>

<style>
  input {
    text-align: right;
  }
</style>
