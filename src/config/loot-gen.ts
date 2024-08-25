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
  {
		name: "Rusty Chisel",
		slotType: SlotType.Weapon,
    implicits: [{
      stat: StatType.PhysicalPower,
      tiers: [{
        weight: 10,
        statMin: 5,
        statMax: 10,
      }],
      totalWeight: 10,
    }],
    affixes: commonAffixes,
    totalWeight: commonAffixes.reduce((sum, affix) => sum + affix.totalWeight, 0),
  }
];

/* *
var helmetItems: Array[Item] = [
	Item.new(
		"Baseball Cap",
		Globals.SlotType.Head, [
			Modifier.new(Globals.StatType.ManaCapacity, [
				ModifierTier.new(1, 20, 40),
			])
		],
		commonAffixes
	)
];

var chestItems: Array[Item] = [
	Item.new(
		"Safety Vest",
		Globals.SlotType.Chest, [
			Modifier.new(Globals.StatType.ManaCapacity, [
				ModifierTier.new(1, 20, 40),
			])
		],
		commonAffixes
	)
];

var glovesItems: Array[Item] = [
	Item.new(
		"Fingerless Gloves",
		Globals.SlotType.Gloves, [
			Modifier.new(Globals.StatType.IncreasedAttackSpeed, [
				ModifierTier.new(1, 20, 40),
			])
		],
		commonAffixes
	)
];

var amuletItems: Array[Item] = [
	Item.new(
		"Stinky Lanyard",
		Globals.SlotType.Amulet, [
			Modifier.new(Globals.StatType.FireDamage, [
				ModifierTier.new(1, 5, 10),
			])
		],
		commonAffixes
	)
];

var ringItems: Array[Item] = [
	Item.new(
		"Plastic Ring",
		Globals.SlotType.Ring, [
			Modifier.new(Globals.StatType.FireDamage, [
				ModifierTier.new(1, 5, 10),
			])
		],
		commonAffixes
	)
];

var bootsItems: Array[Item] = [
	Item.new(
		"Sneakers",
		Globals.SlotType.Boots, [
			Modifier.new(Globals.StatType.MovementSpeed, [
				ModifierTier.new(1, 10, 50),
			])
		],
		commonAffixes
	)
];
/* */

export const items: Record<ItemType, Item[]> = {
  weapon: weaponItems,
  helmet: weaponItems,
  chest: weaponItems,
  gloves: weaponItems,
  boots: weaponItems,
  amulet: weaponItems,
  ring: weaponItems,
  /* *
  helmet: helmetItems,
  chest: chestItems,
  gloves: glovesItems,
  boots: bootsItems,
  amulet: amuletItems,
  ring: ringItems,
  /* */
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
    weight: 100,
    numAffixes: 0,
    color: 'white',
  },
	magic: {
    weight: 30,
    numAffixes: 2,
    color: 'blue',
  },
	rare: {
    weight: 10,
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