<script lang="ts">
  import {
    Length,
    Time,
    Measure,
    kilo,
    meters,
    miles,
    minutes,
  } from "safe-units";
  import UnitSelector from "./UnitSelector.svelte";
  import TimeField from "./TimeField.svelte";
  import { SecondFormatter, MinuteFormatter, MeterFormatter } from "./util";

  const Pace = Time.over(Length);
  type Pace = typeof Pace;

  const secondFormatter = new SecondFormatter();
  const minuteFormatter = new MinuteFormatter();
  const meterFormatter = new MeterFormatter();

  const minPerKm: Pace = Measure.of(1, minutes.per(kilo(meters)), "min/km");

  let time: Time = Measure.of(40, minutes);
  let distance: Length = Measure.of(10000, meters);

  $: pace = time.per(distance);
  $: emoji = emojifyPace(pace);

  const distanceUnits: Length[] = [meters, kilo(meters), miles];

  const distances: [string, Length][] = [
    ["100m", Measure.of(100, meters)],
    ["400m track", Measure.of(400, meters)],
    ["1k", Measure.of(1000, meters)],
    ["1 mile", Measure.of(1, miles)],
    ["5k", Measure.of(5, kilo(meters))],
    ["10k", Measure.of(10, kilo(meters))],
    ["HM", Measure.of(21.0975, kilo(meters))],
    ["Marathon", Measure.of(42.195, kilo(meters))],
    ["100k", Measure.of(100, kilo(meters))],
    ["100 miles", Measure.of(100, miles)],
  ];

  function emojifyPace(p: Pace): string {
    const v = p.value / 0.06; // s/m => min/km

    if (v > 20) return "🐢"; // > 20:00
    if (v > 8) return "🚶"; // 8:00 - 20:00 = Person walking
    if (v > 5.5) return "🏃"; // 5:30 - 8:00 = Person running
    if (v > 5) return "🐎"; // 5:00 - 5:30 = Horse
    if (v > 4.5) return "🐆"; // 4:30 - 5:00 = Leopard
    if (v > 4) return "🎽"; // 4:00 - 4:30 = Running Shirt
    if (v > 3.5) return "🔥"; // 3:30 - 4:00 = (On) Fire
    if (v > 3) return "🚀"; // 3:00 - 3:30 = Rocket
    return "🧑‍🚀"; // < 3:00 = Astronaut
  }

  function calcTime(pace: Pace, d: Length) {
    return pace.times(d).toString(secondFormatter);
  }
</script>

<main class="container p-2">
  <h1 class="h4">Jonas' Pace Calculator</h1>

  <div class="columns mb-1">
    <div class="col-8 col-sm-12 p-2">
      <TimeField label="Time" name="time" bind:value={time} />
    </div>
    <div class="col-4 col-sm-12 p-2">
      <UnitSelector
        label="Distance"
        name="distance"
        bind:value={distance}
        units={distanceUnits}
      />
    </div>
  </div>

  <div class="card col-12">
    <div class="card-header">
      <div class="card-title h5">
        {pace.in(minPerKm, minuteFormatter)}
        <span class="float-right">{emoji}</span>
      </div>
    </div>
    <table class="card-body table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Distance</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {#each distances as d, i (i)}
          <tr
            on:click={() => {
              distance = d[1];
              time = pace.times(d[1]);
            }}
          >
            <td>{d[0]}</td>
            <td>{d[1].toString(meterFormatter)}</td>
            <td>{calcTime(pace, d[1])}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
  main {
    max-width: 30rem;
    margin: auto;
  }

  thead {
    text-align: center;
  }

  tbody {
    text-align: right;
  }

  :global(::-webkit-outer-spin-button, input::-webkit-inner-spin-button) {
    -webkit-appearance: none;
    margin: 0;
  }
  :global(input[type="number"]) {
    -moz-appearance: textfield;
  }
</style>
