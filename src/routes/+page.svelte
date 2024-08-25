<script>
	import { getModifierText } from '../config/loot-gen';
	import { itemType, monsterLevel, rarityBonus, numItems } from '../stores/config';
	import { loot } from '../stores/loot-gen';

</script>

<h1 class="text-center text-xl mb-10">Loot Generation Simulator</h1>

<h2 class="card-title">Config</h2>
<div class="card flex gap-4 justify-around flex-wrap">
  <label class="config-field">
    <strong>Item Type</strong>
    <select bind:value={$itemType}>
      <option value="any">Any</option>
      <option value="boots">Boots</option>
    </select>
  </label>

  <label class="config-field">
    <strong>Monster Lv.</strong>
    <input type="number" bind:value={$monsterLevel} class="w-16" />
  </label>

  <label class="config-field">
    <strong>Rarity Bonus</strong>
    <div>
      <input type="number" bind:value={$rarityBonus} class="w-16" />
      <span>%</span>
    </div>
  </label>
</div>

<div class="card flex gap-4 justify-around flex-wrap mt-2">
  <label class="config-field">
    <strong># Items to Gen</strong>
    <input type="number" bind:value={$numItems} class="w-16" />
  </label>
</div>

<h2 class="card-title">Results</h2>
<div class="grid gap-5 grid-cols-3">
  {#each $loot as item}
  <div class="card flex flex-col items-center text-sm">
    <strong class="rarity-{item.rarity.color}">{item.fullName}</strong>

    {#each item.implicits as [statType, amount]}
      <p>{getModifierText(statType, amount)}</p>
    {/each}

    <hr class="separator" />

    {#each item.prefixes as [statType, amount]}
      <p>{getModifierText(statType, amount)}</p>
    {/each}
    {#each item.suffixes as [statType, amount]}
      <p>{getModifierText(statType, amount)}</p>
    {/each}
  </div>
  {/each}
</div>

<style lang="postcss">
  :global(html) {
    margin: 30px;
    @apply bg-slate-700 text-slate-100;
  }

  .config-field {
    @apply flex gap-2 items-center;
  }

  .config-field select, .config-field input {
    @apply text-slate-800 rounded-sm p-1;
  }

  .card-title {
    @apply text-xl text-slate-200 text-center mt-5;
  }

  .card {
    @apply border-slate-200 rounded-md p-2 shadow-sm shadow-slate-400 bg-slate-600;
  }

  .rarity-white {
    @apply text-white;
  }

  .rarity-blue {
    @apply text-blue-400;
  }

  .rarity-yellow {
    @apply text-yellow-200;
  }

  .separator {
    @apply w-full h-px my-2 bg-gray-400 border-0;
  }
</style>