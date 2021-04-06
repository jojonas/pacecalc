<script lang="ts">
  import { GenericMeasure, Measure } from "safe-units";
  import { stripUnit, formatNumber } from "./util";

  type T = any;
  export let label: string;
  export let name: string;
  export let units: GenericMeasure<number, T>[];
  export let value: Measure<T>;

  let textValue: string = "";

  function importToTextValue(v: Measure<T>, u: GenericMeasure<number, T>) {
    textValue = Math.floor(stripUnit(v, u)).toString();
  }

  function exportTextValue() {
    value = Measure.of(parseFloat(textValue), selectedUnit);
  }

  let selectedUnit: Measure<T> = Measure.dimensionless(1);

  $: importToTextValue(value, selectedUnit);
</script>

<div class="input-group">
  <label class="text-assistive" for={name}>{label} value</label>
  <input
    type="number"
    pattern="[0-9]+"
    id={name}
    bind:value={textValue}
    on:change={exportTextValue}
    min="0"
    class="form-input value"
  />
  <label class="text-assistive" for="unit_{name}">{label} unit</label>
  <select
    bind:value={selectedUnit}
    on:blur={exportTextValue}
    id="unit_{name}"
    class="form-select unit"
  >
    {#each units as unit}
      <option value={unit}>{unit.symbol}</option>
    {/each}
  </select>
</div>

<style>
  select.form-select {
    flex-basis: 5em;
    flex-grow: 0;
  }

  .value {
    text-align: right;
  }

  .unit {
    text-align: left;
  }
</style>
