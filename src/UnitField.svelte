<script lang="ts">
  import { GenericMeasure, Measure } from "safe-units";
  import { stripUnit } from "./util";

  type T = any;
  export let unit: GenericMeasure<number, T>;
  export let value: Measure<T>;

  let textValue: string = "";

  function importToTextValue(v: Measure<T>, u: GenericMeasure<number, T>) {
    textValue = stripUnit(v, u).toString();
  }

  function exportTextValue() {
    value = Measure.of(parseFloat(textValue), unit);
  }

  $: importToTextValue(value, unit);
</script>

<div class="input-group">
  <input
    type="number"
    bind:value={textValue}
    on:change={exportTextValue}
    class="form-input"
  />
  <span class="input-group-addon">{unit.symbol}</span>
</div>
