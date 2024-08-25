import { derived, writable } from 'svelte/store';
import { itemType, monsterLevel, numItems } from './config';
import type { Item, ItemType, ModifierTier, RarityConfig, RealItem } from '$lib/types';
import { items, rarities, totalRarityWeight } from '../config/loot-gen';

export const loot = derived(
  [itemType, monsterLevel, numItems],
  ([itemType, monsterLevel, numItems]) => {
    const items: RealItem[] = [];
    for (let i = 0; i < numItems; i++) {
      const item = generateItem();
      if (item) {
        items.push(item);
      }
    }
    return items;
  }
);

function generateItem(): RealItem | null {
	const itemType: ItemType = getRandomFromSet(['helmet']);
	const itemIndex = randomRangeInt(0, items[itemType].length);

	let rarityWeight = randomRange(0, totalRarityWeight - 1);
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
		return generateItemWithStats(items[itemType][itemIndex], chosenRarity);
  } else {
		return null;
  }
}


function generateItemWithStats(item: Item, rarity: RarityConfig): RealItem {
	var realItem: RealItem = {
    fullName: 'REally cool item',
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
		var roll = randomRange(0, item.totalWeight);
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
  return set[0];
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