import { derived } from 'svelte/store';
import { generationSeedIndex, monsterLevel, monsterRarity, numKills, rarityBonus } from './config';
import type { Item, ItemType, ModifierTier, Rarity, RarityConfig, RealItem } from '$lib/types';
import { items, rarities, totalRarityWeight } from '../config/loot-gen';
import { getRarityBonusFromMonsterLevel, monsterLevelConfigs, type MonsterLevelConfig } from '../config/monster-loot';

export const loot = derived(
  [monsterLevel, monsterRarity, numKills, rarityBonus, generationSeedIndex],
  ([monsterLevel, monsterRarity, numKills, rarityBonus, generationSeedIndex]) => {
    let items: RealItem[] = [];
    for (let i = 0; i < numKills; i++) {
      if (monsterRarity === 'random') {
        monsterRarity = getRandomFromSet(['normal', 'magic', 'rare']);
      }
      const killItems = generateItemsForKill(monsterLevel, monsterRarity);
      items = items.concat(killItems);
    }
    return items;
  }
);

function generateItemsForKill(monsterLevel: number, monsterRarity: Rarity): RealItem[] {
  const monsterLevelConfig = monsterLevelConfigs.find((config) => monsterLevel < config.maxLevel);
  if (!monsterLevelConfig) {
    return [];
  }

  const rarityConfig = monsterLevelConfig.rarities[monsterRarity];
  const rarityBonus = getRarityBonusFromMonsterLevel(monsterLevel);
  const numItems = randomRangeInt(rarityConfig.minItems, rarityConfig.maxItems);
  const items: RealItem[] = [];
  for (let i = 0; i < numItems; ++i) {
    const item = generateItem(rarityBonus, monsterLevelConfig.rarityCap);
    if (item) {
      items.push(item);
    }
  }
  return items;
}

function generateItem(rarityBonus: number, rarityCap: number): RealItem | null {
	const itemType: ItemType = getRandomFromSet(['weapon', 'helmet', 'chest', 'gloves', 'boots', 'amulet', 'ring']);
	const itemIndex = randomRangeInt(0, items[itemType].length);

	let rarityWeight = randomRange(0, totalRarityWeight - 1) * rarityBonus;
	let chosenRarity: RarityConfig | null = null;
	for (let [r, rarity] of Object.entries(rarities)) {
		if (rarity.weight >= rarityWeight) {
			chosenRarity = rarity;
			break;
    } else {
			rarityWeight -= rarity.weight;
    }
  }
	if (chosenRarity) {
		return generateItemWithStats(items[itemType][itemIndex], chosenRarity, rarityBonus, rarityCap);
  } else {
		return null;
  }
}


function generateItemWithStats(item: Item, rarity: RarityConfig, rarityBonus: number, rarityCap: number): RealItem {
	var realItem: RealItem = {
    fullName: item.name,
    item, rarity,
    implicits: new Map(),
    prefixes: new Map(),
    suffixes: new Map(),
  };
	// Roll Implicits
	for (let implicit of item.implicits) {
		realItem.implicits.set(implicit.stat, generateModifierAmount(implicit.tiers, randomRange(0, implicit.totalWeight)));
  }
	
	var affixesAlreadyFound: string[];
	for (let i = 0; i < rarity.numAffixes; ++i) {
    let roll = randomRange(0, item.totalWeight * rarityCap) * rarityBonus;
		for (let affix of item.affixes) {
			if (roll < affix.totalWeight) {
				var statVal = generateModifierAmount(affix.tiers, roll);
				if (affix.type == 'prefix') {
					realItem.prefixes.set(affix.stat, statVal);
        } else {
					realItem.suffixes.set(affix.stat, statVal);
        }
				break;
      } else {
				roll -= affix.totalWeight;
      }
    }
  }

	return realItem;
}


function generateModifierAmount(tiers: ModifierTier[], relativeRoll: number): number {
	for (let tier of tiers) {
		if (relativeRoll <= tier.weight) {
			return randomRange(tier.statMin, tier.statMax);
    } else {
			relativeRoll -= tier.weight;
    }
  }

  return 0;
}

function getRandomFromSet<T>(set: T[]): T {
  const chosen = randomRangeInt(0, set.length);
  return set[chosen];
}

function randomRange(start: number, end: number) {
  if (start > end) {
    const swap = start;
    start = end;
    end = swap;
  }
  return Math.random() * (end - start) + start;
}

function randomRangeInt(start: number, end: number) {
  return Math.floor(randomRange(start, end));
}