import { derived, writable } from 'svelte/store';
import { itemType, monsterLevel } from './config';


export const loot = derived(
  [itemType, monsterLevel],
  ([itemType, monsterLevel]) => itemType.length + monsterLevel
);

