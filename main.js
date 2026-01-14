import { world, system, ItemStack } from "@minecraft/server";

const TRANSLATIONS = {
  "pt-br": {
    actionBar: "§6[DropPlyer] §aDrop §e{multiplier}x §a(Nível {level})",
    loadMessage: "§6[DropPlyer] §aPor @zt01.dev"
  },
  "en-us": {
    actionBar: "§6[DropPlyer] §aDrop §e{multiplier}x §a(Level {level})",
    loadMessage: "§6[DropPlyer] §aBy @zt01.dev"
  }
};

let currentLanguage = "pt-br";

function translate(key, params = {}) {
  let text = TRANSLATIONS[currentLanguage][key] || TRANSLATIONS["pt-br"][key];
  Object.keys(params).forEach(param => {
    text = text.replace(`{${param}}`, params[param]);
  });
  return text;
}

function loadLanguageFromSettings() {
  try {
    const packSettings = world.getPackSettings();
    const langSetting = packSettings["dropplyer:language"];
    if (langSetting === 0) {
      currentLanguage = "pt-br";
    } else if (langSetting === 1) {
      currentLanguage = "en-us";
    }
  } catch (e) {
    currentLanguage = "pt-br";
  }
}

const MOB_LOOT_TABLE = {
  "minecraft:zombie": [
    { item: "minecraft:rotten_flesh", min: 0, max: 2 },
    { item: "minecraft:iron_ingot", min: 0, max: 1, chance: 0.025 },
    { item: "minecraft:carrot", min: 0, max: 1, chance: 0.025 },
    { item: "minecraft:potato", min: 0, max: 1, chance: 0.025 }
  ],
  "minecraft:zombie_villager": [
    { item: "minecraft:rotten_flesh", min: 0, max: 2 },
    { item: "minecraft:iron_ingot", min: 0, max: 1, chance: 0.025 },
    { item: "minecraft:carrot", min: 0, max: 1, chance: 0.025 },
    { item: "minecraft:potato", min: 0, max: 1, chance: 0.025 }
  ],
  "minecraft:husk": [
    { item: "minecraft:rotten_flesh", min: 0, max: 2 },
    { item: "minecraft:iron_ingot", min: 0, max: 1, chance: 0.025 }
  ],
  "minecraft:drowned": [
    { item: "minecraft:rotten_flesh", min: 0, max: 2 },
    { item: "minecraft:copper_ingot", min: 0, max: 1, chance: 0.05 },
    { item: "minecraft:nautilus_shell", min: 0, max: 1, chance: 0.03 },
    { item: "minecraft:trident", min: 0, max: 1, chance: 0.0085 }
  ],
  "minecraft:skeleton": [
    { item: "minecraft:bone", min: 0, max: 2 },
    { item: "minecraft:arrow", min: 0, max: 2 }
  ],
  "minecraft:bogged": [
    { item: "minecraft:bone", min: 0, max: 2 },
    { item: "minecraft:arrow", min: 0, max: 2 },
    { item: "minecraft:arrow", min: 0, max: 1, chance: 0.5 }
  ],
  "minecraft:stray": [
    { item: "minecraft:bone", min: 0, max: 2 },
    { item: "minecraft:arrow", min: 0, max: 2 },
    { item: "minecraft:arrow", min: 0, max: 1, chance: 0.5 }
  ],
  "minecraft:creeper": [
    { item: "minecraft:gunpowder", min: 0, max: 2 }
  ],
  "minecraft:spider": [
    { item: "minecraft:string", min: 0, max: 2 },
    { item: "minecraft:spider_eye", min: 0, max: 1, chance: 0.33 }
  ],
  "minecraft:cave_spider": [
    { item: "minecraft:string", min: 0, max: 2 },
    { item: "minecraft:spider_eye", min: 0, max: 1, chance: 0.33 }
  ],
  "minecraft:enderman": [
    { item: "minecraft:ender_pearl", min: 0, max: 1 }
  ],
  "minecraft:blaze": [
    { item: "minecraft:blaze_rod", min: 0, max: 1 }
  ],
  "minecraft:breeze": [
    { item: "minecraft:breeze_rod", min: 1, max: 2 }
  ],
  "minecraft:ghast": [
    { item: "minecraft:ghast_tear", min: 0, max: 1 },
    { item: "minecraft:gunpowder", min: 0, max: 2 }
  ],
  "minecraft:magma_cube": [
    { item: "minecraft:magma_cream", min: 0, max: 1 }
  ],
  "minecraft:slime": [
    { item: "minecraft:slimeball", min: 0, max: 2 }
  ],
  "minecraft:witch": [
    { item: "minecraft:glass_bottle", min: 0, max: 6 },
    { item: "minecraft:glowstone_dust", min: 0, max: 6 },
    { item: "minecraft:gunpowder", min: 0, max: 6 },
    { item: "minecraft:redstone", min: 0, max: 6 },
    { item: "minecraft:sugar", min: 0, max: 6 },
    { item: "minecraft:stick", min: 0, max: 6 }
  ],
  "minecraft:wither_skeleton": [
    { item: "minecraft:bone", min: 0, max: 2 },
    { item: "minecraft:coal", min: 0, max: 1 },
    { item: "minecraft:skull", min: 0, max: 1, chance: 0.025 }
  ],
  "minecraft:piglin": [
    { item: "minecraft:rotten_flesh", min: 0, max: 1 },
    { item: "minecraft:gold_nugget", min: 0, max: 1 }
  ],
  "minecraft:piglin_brute": [
    { item: "minecraft:gold_nugget", min: 0, max: 1 }
  ],
  "minecraft:zombified_piglin": [
    { item: "minecraft:rotten_flesh", min: 0, max: 1 },
    { item: "minecraft:gold_nugget", min: 0, max: 1 },
    { item: "minecraft:gold_ingot", min: 0, max: 1, chance: 0.025 }
  ],
  "minecraft:hoglin": [
    { item: "minecraft:porkchop", min: 2, max: 4 },
    { item: "minecraft:leather", min: 0, max: 1 }
  ],
  "minecraft:zoglin": [
    { item: "minecraft:rotten_flesh", min: 1, max: 3 }
  ],
  "minecraft:endermite": [
    { item: "minecraft:ender_pearl", min: 0, max: 1, chance: 0.05 }
  ],
  "minecraft:silverfish": [
    { item: "minecraft:iron_nugget", min: 0, max: 1, chance: 0.05 }
  ],
  "minecraft:shulker": [
    { item: "minecraft:shulker_shell", min: 0, max: 1 }
  ],
  "minecraft:guardian": [
    { item: "minecraft:prismarine_shard", min: 0, max: 2 },
    { item: "minecraft:prismarine_crystals", min: 0, max: 1, chance: 0.4 },
    { item: "minecraft:fish", min: 0, max: 1, chance: 0.025 }
  ],
  "minecraft:elder_guardian": [
    { item: "minecraft:prismarine_shard", min: 0, max: 2 },
    { item: "minecraft:prismarine_crystals", min: 0, max: 1 },
    { item: "minecraft:fish", min: 0, max: 1 },
    { item: "minecraft:sponge", min: 1, max: 1 }
  ],
  "minecraft:phantom": [
    { item: "minecraft:phantom_membrane", min: 0, max: 1 }
  ],
  "minecraft:vindicator": [
    { item: "minecraft:emerald", min: 0, max: 1, chance: 0.2 }
  ],
  "minecraft:evoker": [
    { item: "minecraft:emerald", min: 0, max: 1 },
    { item: "minecraft:totem_of_undying", min: 1, max: 1 }
  ],
  "minecraft:evoker_fangs": [
    { item: "minecraft:bone", min: 0, max: 1, chance: 0.1 }
  ],
  "minecraft:pillager": [
    { item: "minecraft:arrow", min: 0, max: 2 },
    { item: "minecraft:emerald", min: 0, max: 1, chance: 0.065 }
  ],
  "minecraft:ravager": [
    { item: "minecraft:saddle", min: 0, max: 1 }
  ],
  "minecraft:vex": [
    { item: "minecraft:iron_sword", min: 0, max: 1, chance: 0.05 }
  ],
  "minecraft:cow": [
    { item: "minecraft:leather", min: 0, max: 2 },
    { item: "minecraft:beef", min: 1, max: 3 }
  ],
  "minecraft:mooshroom": [
    { item: "minecraft:leather", min: 0, max: 2 },
    { item: "minecraft:beef", min: 1, max: 3 }
  ],
  "minecraft:pig": [
    { item: "minecraft:porkchop", min: 1, max: 3 }
  ],
  "minecraft:chicken": [
    { item: "minecraft:feather", min: 0, max: 2 },
    { item: "minecraft:chicken", min: 1, max: 1 }
  ],
  "minecraft:sheep": [
    { item: "minecraft:mutton", min: 1, max: 2 }
  ],
  "minecraft:rabbit": [
    { item: "minecraft:rabbit", min: 0, max: 1 },
    { item: "minecraft:rabbit_hide", min: 0, max: 1 },
    { item: "minecraft:rabbit_foot", min: 0, max: 1, chance: 0.1 }
  ],
  "minecraft:llama": [
    { item: "minecraft:leather", min: 0, max: 2 }
  ],
  "minecraft:horse": [
    { item: "minecraft:leather", min: 0, max: 2 }
  ],
  "minecraft:donkey": [
    { item: "minecraft:leather", min: 0, max: 2 }
  ],
  "minecraft:mule": [
    { item: "minecraft:leather", min: 0, max: 2 }
  ],
  "minecraft:polar_bear": [
    { item: "minecraft:fish", min: 0, max: 2 }
  ],
  "minecraft:panda": [
    { item: "minecraft:bamboo", min: 0, max: 2 }
  ],
  "minecraft:fox": [
    { item: "minecraft:feather", min: 0, max: 1 },
    { item: "minecraft:leather", min: 0, max: 1 },
    { item: "minecraft:rabbit_hide", min: 0, max: 1 },
    { item: "minecraft:rabbit_foot", min: 0, max: 1, chance: 0.1 }
  ],
  "minecraft:wolf": [
    { item: "minecraft:bone", min: 0, max: 1 }
  ],
  "minecraft:ocelot": [
    { item: "minecraft:string", min: 0, max: 2 }
  ],
  "minecraft:cat": [
    { item: "minecraft:string", min: 0, max: 2 }
  ],
  "minecraft:parrot": [
    { item: "minecraft:feather", min: 1, max: 2 }
  ],
  "minecraft:bat": [
    { item: "minecraft:leather", min: 0, max: 1, chance: 0.1 }
  ],
  "minecraft:squid": [
    { item: "minecraft:ink_sac", min: 1, max: 3 }
  ],
  "minecraft:glow_squid": [
    { item: "minecraft:glow_ink_sac", min: 1, max: 3 }
  ],
  "minecraft:dolphin": [
    { item: "minecraft:fish", min: 0, max: 1 }
  ],
  "minecraft:cod": [
    { item: "minecraft:cod", min: 1, max: 1 },
    { item: "minecraft:bone_meal", min: 1, max: 1, chance: 0.05 }
  ],
  "minecraft:salmon": [
    { item: "minecraft:salmon", min: 1, max: 1 },
    { item: "minecraft:bone_meal", min: 1, max: 1, chance: 0.05 }
  ],
  "minecraft:tropical_fish": [
    { item: "minecraft:tropical_fish", min: 1, max: 1 },
    { item: "minecraft:bone_meal", min: 1, max: 1, chance: 0.05 }
  ],
  "minecraft:pufferfish": [
    { item: "minecraft:pufferfish", min: 1, max: 1 },
    { item: "minecraft:bone_meal", min: 1, max: 1, chance: 0.05 }
  ],
  "minecraft:turtle": [
    { item: "minecraft:seagrass", min: 0, max: 2 }
  ],
  "minecraft:iron_golem": [
    { item: "minecraft:iron_ingot", min: 3, max: 5 },
    { item: "minecraft:poppy", min: 0, max: 2 }
  ],
  "minecraft:snow_golem": [
    { item: "minecraft:snowball", min: 0, max: 15 }
  ],
  "minecraft:strider": [
    { item: "minecraft:string", min: 2, max: 5 }
  ],
  "minecraft:goat": [
    { item: "minecraft:mutton", min: 1, max: 2 }
  ],
  "minecraft:axolotl": [
    { item: "minecraft:tropical_fish", min: 0, max: 1, chance: 0.1 }
  ],
  "minecraft:frog": [
    { item: "minecraft:slimeball", min: 0, max: 1, chance: 0.2 }
  ],
  "minecraft:warden": [
    { item: "minecraft:echo_shard", min: 1, max: 2 },
    { item: "minecraft:sculk_catalyst", min: 1, max: 1 }
  ],
  "minecraft:ender_dragon": [
    { item: "minecraft:dragon_breath", min: 1, max: 3 },
    { item: "minecraft:dragon_egg", min: 0, max: 1, chance: 0.1 }
  ],
  "minecraft:wither": [
    { item: "minecraft:nether_star", min: 1, max: 1 },
    { item: "minecraft:bone", min: 0, max: 3 }
  ],
  "minecraft:allay": [
    { item: "minecraft:cookie", min: 0, max: 1, chance: 0.05 }
  ],
  "minecraft:trader_llama": [
    { item: "minecraft:leather", min: 0, max: 2 }
  ],
  "minecraft:bee": [
    { item: "minecraft:honeycomb", min: 0, max: 1, chance: 0.3 }
  ]
};

const processedEntities = new Set();
const playerMessageCooldown = new Map();

function getDropMultiplier(playerLevel) {
  return Math.floor(playerLevel / 30) + 1;
}

function spawnExtraDrops(mob, killer) {
  if (!killer || killer.typeId !== "minecraft:player") return;

  if (!killer.isValid()) return;

  const entityId = mob.id;
  if (processedEntities.has(entityId)) return;
  processedEntities.add(entityId);

  const playerLevel = killer.level;
  const multiplier = getDropMultiplier(playerLevel);

  if (multiplier <= 1) return;

  const mobType = mob.typeId;
  const lootTable = MOB_LOOT_TABLE[mobType];

  if (!lootTable) return;

  const mobLocation = mob.location;
  const dimension = mob.dimension;
  let extraDrops = multiplier - 1;

  if (mobType === "minecraft:ender_dragon") {
    extraDrops = Math.min(extraDrops, 2);
  } else if (mobType === "minecraft:wither") {
    extraDrops = Math.min(extraDrops, 3);
  }

  for (let i = 0; i < extraDrops; i++) {
    for (const drop of lootTable) {
      if (drop.chance && Math.random() > drop.chance) continue;

      const amount = Math.floor(Math.random() * (drop.max - drop.min + 1)) + drop.min;

      if (amount > 0) {
        try {
          const itemStack = new ItemStack(drop.item, amount);
          dimension.spawnItem(itemStack, mobLocation);
        } catch (e) {
          console.warn(`Erro ao spawnar item ${drop.item}: ${e}`);
        }
      }
    }
  }

  const playerName = killer.name;
  const now = Date.now();
  const lastMessage = playerMessageCooldown.get(playerName) || 0;

  if (now - lastMessage > 3000) {
    try {

      if (killer.isValid()) {
        killer.onScreenDisplay.setActionBar(translate("actionBar", {
          multiplier: multiplier,
          level: playerLevel
        }));
        playerMessageCooldown.set(playerName, now);
      }
    } catch (e) {
      console.warn(`Erro ao mostrar mensagem para ${playerName}: ${e}`);
    }
  }
}

world.afterEvents.entityDie.subscribe((event) => {
  try {
    const deadEntity = event.deadEntity;
    const damageSource = event.damageSource;

    if (damageSource && damageSource.damagingEntity) {
      const killer = damageSource.damagingEntity;
      spawnExtraDrops(deadEntity, killer);
    }
  } catch (e) {
    console.error(`Erro no evento entityDie: ${e}`);
  }
});

system.runInterval(() => {
  if (processedEntities.size > 1000) {
    processedEntities.clear();
  }
}, 6000);

system.runInterval(() => {
  const now = Date.now();
  const activePlayers = new Set(world.getAllPlayers().map(p => p.name));

  for (const [playerName, timestamp] of playerMessageCooldown.entries()) {

    if (!activePlayers.has(playerName) || (now - timestamp) > 300000) {
      playerMessageCooldown.delete(playerName);
    }
  }
}, 60000); 

system.runTimeout(() => {
  loadLanguageFromSettings();
  world.sendMessage(translate("loadMessage"));
}, 20);