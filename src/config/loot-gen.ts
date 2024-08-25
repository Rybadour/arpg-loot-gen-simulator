import { SlotType, StatType, type Affix, type AffixType, type Item, type ItemType, type ModifierTier, type Rarity, type RarityConfig } from "$lib/types";

export const commonAffixes: Affix[] = [
	generateAffixTiers('prefix', StatType.Health, 4, 1000, 5, 20, 5),
	generateAffixTiers('prefix', StatType.IncreasedHealth, 4, 1000, 5, 20, 5),
	generateAffixTiers('prefix', StatType.IncreasedPhysicalPower, 4, 1000, 5, 20, 5),
	generateAffixTiers('prefix', StatType.IncreasedAttackSpeed, 4, 1000, 5, 5, 5),
	generateAffixTiers('prefix', StatType.FireDamage, 4, 1000, 5, 2, 3),
	generateAffixTiers('prefix', StatType.IncreasedFireDamage, 4, 1000, 5, 20, 5),
];

var weaponItems: Item[] = [
  generateCommonItem("Rusty Chisel", SlotType.Weapon, StatType.PhysicalPower, 5, 10),
];

var helmetItems: Item[] = [
  generateCommonItem("Baseball Cap", SlotType.Head, StatType.ManaCapacity, 20, 40),
];

var chestItems: Item[] = [
  generateCommonItem("Safety Vest", SlotType.Chest, StatType.ManaCapacity, 20, 40),
];

var glovesItems: Item[] = [
  generateCommonItem("Fingerless Gloves", SlotType.Gloves, StatType.IncreasedAttackSpeed, 20, 40),
];

var bootsItems: Item[] = [
  generateCommonItem("Sneakers", SlotType.Boots, StatType.MovementSpeed, 10, 50),
];

var amuletItems: Item[] = [
  generateCommonItem("Stinky Lanyard", SlotType.Amulet, StatType.FireDamage, 5, 10),
];

var ringItems: Item[] = [
  generateCommonItem("Plastic Ring", SlotType.Ring, StatType.FireDamage, 5, 10),
];

export const items: Record<ItemType, Item[]> = {
  weapon: weaponItems,
  helmet: helmetItems,
  chest: chestItems,
  gloves: glovesItems,
  boots: bootsItems,
  amulet: amuletItems,
  ring: ringItems,
}

function generateCommonItem(name: string, slotType: SlotType, implicitStat: StatType, implicitMin: number, implicitMax: number): Item {
  return {
		name,
		slotType,
    implicits: [{
      stat: implicitStat,
      tiers: [{
        weight: 10,
        statMin: implicitMin,
        statMax: implicitMax,
      }],
      totalWeight: 10,
    }],
    affixes: commonAffixes,
    totalWeight: commonAffixes.reduce((sum, affix) => sum + affix.totalWeight, 0),
  }
}

function generateAffixTiers(type: AffixType, stat: StatType, numTiers: number, startWeight: number, weightScaling: number, statStart: number, statChange: number) {
  const affix: Affix = {
    type, stat, tiers: [], totalWeight: 0,
  };
	for (let i = 0; i < numTiers; ++i) {
    affix.totalWeight += startWeight;
		affix.tiers.push({
      weight: startWeight,
      statMin: statStart,
      statMax: statStart + statChange
    });
		startWeight /= weightScaling;
		statStart += statChange;
  }
	return affix;
}

export const rarities: Record<Rarity, RarityConfig> = {
	normal: {
    rarity: 'normal',
    weight: 200,
    numAffixes: 0,
    color: 'white',
  },
	magic: {
    rarity: 'magic',
    weight: 75,
    numAffixes: 2,
    color: 'blue',
  },
	rare: {
    rarity: 'rare',
    weight: 30,
    numAffixes: 4,
    color: 'yellow',
  },
};
export const totalRarityWeight = Object.values(rarities).reduce((sum, r) => sum + r.weight, 0);

export function getModifierText(stat: StatType, value: number): string {
	var text = '';
	if (stat == StatType.PhysicalPower)
		text = value.toFixed(0) + ' Physical Damage';
	else if (stat == StatType.IncreasedPhysicalPower)
		text = '+' + value.toFixed(0) + '% Physical Damage';
	else if (stat == StatType.AttackSpeed)
		text = value.toFixed(2) + ' Attack Speed';
	else if (stat == StatType.IncreasedAttackSpeed)
		text = '+' + value.toFixed(0) + '% Attack Speed';
	else if (stat == StatType.Health)
		text = '+' + value.toFixed(0)+ ' Health';
	else if (stat == StatType.IncreasedHealth)
		text = '+' + value.toFixed(0) + '% Health';
	else if (stat == StatType.FireDamage)
		text = '+' + value.toFixed(0) + ' Fire Damage';
	else if (stat == StatType.IncreasedFireDamage)
		text = '+' + value.toFixed(0) + '% Fire Damage';
	else if (stat == StatType.ManaCapacity)
		text = '+' + value.toFixed(0) + ' Mana Capacity';
	else if (stat == StatType.MovementSpeed)
		text = '+' + value.toFixed(0) + '% Move Speed';
	return text;
}