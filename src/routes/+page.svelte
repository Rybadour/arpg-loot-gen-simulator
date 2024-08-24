<script>
	import { derived } from 'svelte/store';
	import { itemType, monsterLevel } from '../stores/config';
	import { loot } from '../stores/loot-gen';

</script>

<h1 class="text-center text-xl mb-10">Loot Generation Simulator</h1>

<h2 class="card-title">Config</h2>
<div class="card flex gap-4">
  <label class="config-field">
    <strong>Item Type</strong>
    <select bind:value={$itemType}>
      <option value="any">Any</option>
      <option value="boots">Boots</option>
    </select>
  </label>

  <label class="config-field">
    <strong>Monster Lv.</strong>
    <input type="number" bind:value={$monsterLevel} />
  </label>
</div>

<h2 class="card-title">Results</h2>
<div class="card">
  Result = {$loot}
</div>

<style lang="postcss">
  :global(html) {
    margin: 30px;
    @apply bg-slate-700 text-slate-100;
  }

  .config-field {
    @apply flex gap-2;
  }

  .config-field select {
    @apply text-slate-800 rounded-sm;
  }

  .card-title {
    @apply text-xl text-slate-200 text-center mt-5;
  }

  .card {
    @apply border-slate-200 rounded-md p-2 shadow-sm shadow-slate-400 bg-slate-600;
  }
</style>