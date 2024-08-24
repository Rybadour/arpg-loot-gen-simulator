import { writable } from 'svelte/store';

import type { ItemType } from '$lib/types';

export const itemType = writable<'any' | ItemType>('any');

export const monsterLevel = writable(1);