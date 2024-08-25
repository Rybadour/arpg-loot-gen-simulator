import type { Rarity } from "$lib/types";

export interface MonsterLevelConfig {
  minLevel: number,
  maxLevel: number,
  rarityCap: number,
  rarities: Record<Rarity, {
    minItems: number,
    maxItems: number,
  }>,
}

export const monsterLevelConfigs: MonsterLevelConfig[] = [{
  minLevel: 1,
  maxLevel: 5,
  rarityCap: 0.6,
  rarities: {
    normal: {minItems: 0, maxItems: 2},
    magic: {minItems: 0, maxItems: 3},
    rare: {minItems: 1, maxItems: 3},
  }
}, {
  minLevel: 5,
  maxLevel: 10,
  rarityCap: 0.65,
  rarities: {
    normal: {minItems: 0, maxItems: 2},
    magic: {minItems: 0, maxItems: 3},
    rare: {minItems: 1, maxItems: 4},
  }
}];

export function getRarityBonusFromMonsterLevel(monsterLevel: number):number {
  return 1 + (monsterLevel * 0.01);
}