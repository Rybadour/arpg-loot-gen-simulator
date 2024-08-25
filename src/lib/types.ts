export type ItemType = 'boots' | 'helmet' | 'chest' | 'gloves' | 'weapon' | 'amulet' | 'ring';

export type Rarity = 'normal' | 'magic' | 'rare';

export type AffixType = 'prefix' | 'suffix';

export enum SlotType {Weapon, Head, Chest, Amulet, Ring, Gloves, Boots}

export enum StatType {
	PhysicalPower, IncreasedPhysicalPower,
	AttackSpeed, IncreasedAttackSpeed,
	FireDamage, IncreasedFireDamage,
	Health, IncreasedHealth,
	Armor, IncreasedArmor,
	ManaCapacity,
	ChanceToFindItems,
	MovementSpeed,
}

export interface Item {
  name: string,
  slotType: SlotType,
  implicits: Modifier[],
  affixes: Affix[],
  totalWeight: number,
}

export interface RealItem {
  item: Item,
  fullName: string,
  implicits: Map<StatType, number>,
  prefixes: Map<StatType, number>,
  suffixes: Map<StatType, number>,
  rarity: RarityConfig,
}

export interface RarityConfig {
  rarity: Rarity,
  weight: number,
  numAffixes: number,
  color: string,
}

export interface ModifierTier {
  weight: number,
  statMin: number,
  statMax: number,
}

export interface Modifier {
  stat: StatType,
  tiers: ModifierTier[],
  totalWeight: number,
}

export interface Affix {
  type: AffixType,
  stat: StatType,
  tiers: ModifierTier[],
  totalWeight: number,
}