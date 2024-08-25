<script>
	import { getModifierText } from '../config/loot-gen';
	import { numKills, rarityBonus, monsterLevel, monsterRarity, generationSeedIndex, minRarityShown } from '../stores/config';
	import { lootFiltered } from '../stores/loot-gen';

  $: numFilteredOut = $lootFiltered.numTotalLoot - $lootFiltered.loot.length;
</script>

<h1 class="text-center text-xl mb-10">Loot Generation Simulator</h1>

<h2 class="card-title">Config</h2>
<div class="card flex gap-4 justify-around flex-wrap w-[600px] mx-auto">
  <label class="config-field">
    <strong>Monster Rarity</strong>
    <select bind:value={$monsterRarity}>
      <option value="random">Random</option>
      <option value="normal">Normal</option>
      <option value="magic">Magic</option>
      <option value="rare">Rare</option>
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

  <label class="config-field">
    <strong># Kills</strong>
    <input type="number" bind:value={$numKills} class="w-16" />
  </label>
</div>

<div class="card flex gap-4 justify-around flex-wrap mt-2 w-[600px] mx-auto">
  <button on:click={() => generationSeedIndex.update((i) => i + 1)}>Regenerate</button>

  <label class="config-field">
    <strong>Show only</strong>
    <select bind:value={$minRarityShown}>
      <option value="normal">Normal</option>
      <option value="magic">Magic</option>
      <option value="rare">Rare</option>
    </select>
    <strong>and Above</strong>
  </label>
</div>

<h2 class="card-title">
  Results
  {#if numFilteredOut > 0}
    <span class="text-slate-400 text-sm">({numFilteredOut} items not shown)</span>
  {/if}
</h2>
<div class="grid grid-cols-5 gap-5">
  {#each $lootFiltered.loot as item}
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
    @apply text-xl text-slate-200 text-center mt-5 mb-2;
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

  button {
    @apply border-slate-300 bg-slate-200 text-slate-600 p-1 rounded-sm;
  }
</style>