import { writable } from 'svelte/store';

import type { Rarity } from '$lib/types';

export const monsterLevel = writable(1);
export const monsterRarity = writable<'random' | Rarity>('random');
export const rarityBonus = writable(0);
export const numKills = writable(10);

export const minRarityShown = writable<Rarity>('normal');

export const generationSeedIndex = writable(0);
