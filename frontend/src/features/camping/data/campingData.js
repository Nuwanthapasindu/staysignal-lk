export const campingStats = {
  registeredSites: 18,
  registeredSitesSub: 'Monitored wilderness pitches',
  operationalStatus: 14,
  operationalStatusSub: 'Currently open & accessible',
  weatherSuspensions: 2,
  weatherSuspensionsSub: 'Monsoonal / gale closure orders',
  permitsCleared: 89,
  permitsClearedSub: 'Active permits issued this week'
};

export const campsitesList = [
  {
    id: 'knuckles-03',
    slug: 'knuckles-01',
    name: 'Knuckles High Ridge Campsite #03',
    location: 'Meemure / Knuckles Range (Matale)',
    elevation: '1,420m',
    featureBadge: 'Perennial Stream OK',
    featureBadgeType: 'green',
    pitchesCount: 4,
    pitchesLabel: '4 Pitches',
    maxCampers: 16,
    campersLabel: 'Max 16 Campers',
    footprint: '2-man & 4-man footprint',
    tariffLkr: 'LKR 2,500',
    tariffUnit: 'pitch',
    tariffExtra: '+ DWC Wildlife Entry',
    tariffUsd: '',
    status: 'open',
    statusText: 'OPEN • SPRING RUNNING',
    statusSub: 'No flash-flood warning',
    clearanceOffice: 'Forest Dept Range Office',
    clearanceSub: 'Hunnasgiriya Sub-Post',
    lastSynced: '15 mins ago',
    lastSyncedChannel: 'via Matale VHF',
    terrainBelt: 'Central Highlands',
    hasWaterSpring: true,
    requiresRanger: false,
    maxGroup12: true
  },
  {
    id: 'horton-01',
    slug: 'horton-plains',
    name: 'Horton Plains Campsite 01 (Chimney Pool)',
    location: 'Horton Plains Plateau (Nuwara Eliya)',
    elevation: '2,135m',
    featureBadge: 'Sub-zero Frost',
    featureBadgeType: 'blue',
    pitchesCount: 3,
    pitchesLabel: '3 Pitches',
    maxCampers: 12,
    campersLabel: 'Max 12 Campers',
    footprint: 'High-wind stakes required',
    tariffLkr: 'USD 25 Foreign',
    tariffUnit: '',
    tariffExtra: 'LKR 1,500 (Local Resident)',
    tariffUsd: '$25',
    status: 'caution',
    statusText: 'OPEN • FROST / SUB-ZERO NIGHT CAUTION',
    statusSub: 'Zero degree thermal kit mandatory',
    clearanceOffice: 'Mandatory Online DWC',
    clearanceSub: 'Pattipola & Ohiya Gate Pass',
    lastSynced: '2 hrs ago',
    lastSyncedChannel: 'DWC Nuwara Eliya Web',
    terrainBelt: 'Central Highlands',
    hasWaterSpring: true,
    requiresRanger: false,
    maxGroup12: true
  },
  {
    id: 'corbets-gap',
    slug: 'corbets-gap',
    name: "Corbet's Gap Wind Staging Pitch",
    location: "Rangala - Corbet's Saddle (Kandy)",
    elevation: '1,220m',
    featureBadge: '60km/h Gusts',
    featureBadgeType: 'alert',
    pitchesCount: 2,
    pitchesLabel: '2 Pitches',
    maxCampers: 8,
    campersLabel: 'Max 8 Campers',
    footprint: 'Exposed ridge line',
    tariffLkr: 'Free Community Pitch',
    tariffUnit: '',
    tariffExtra: 'Community Stewardship',
    tariffUsd: 'Free',
    status: 'danger',
    statusText: 'TEMPORARILY CLOSED: 60KM/H GALES',
    statusSub: 'Gale advisory in effect',
    clearanceOffice: 'Local Police Station Register',
    clearanceSub: 'Rangala Police Post Log',
    lastSynced: '35 mins ago',
    lastSyncedChannel: 'Disaster Mgmt Centre (Kandy)',
    terrainBelt: 'Central Highlands',
    hasWaterSpring: false,
    requiresRanger: false,
    maxGroup12: false
  },
  {
    id: 'gala-muduna',
    slug: 'gala-muduna',
    name: 'Gala Muduna Cloud Forest Camp',
    location: 'Hasalaka Ridge (Central Range)',
    elevation: '980m',
    featureBadge: 'Ranger Required',
    featureBadgeType: 'amber',
    pitchesCount: 5,
    pitchesLabel: '5 Pitches',
    maxCampers: 20,
    campersLabel: 'Max 20 Campers',
    footprint: 'Forest edge clearing',
    tariffLkr: 'LKR 3,000',
    tariffUnit: 'tent',
    tariffExtra: '+ Certified Guide Fee',
    tariffUsd: '',
    status: 'caution',
    statusText: 'OPEN • RANGER ESCORT MANDATORY',
    statusSub: 'Elephant corridor boundary',
    clearanceOffice: 'Forest Dept Hasalaka',
    clearanceSub: 'Beat Office Registration',
    lastSynced: 'Yesterday',
    lastSyncedChannel: 'Hasalaka Beat Officer Log',
    terrainBelt: 'Knuckles Foothills',
    hasWaterSpring: true,
    requiresRanger: true,
    maxGroup12: true
  },
  {
    id: 'ella-peak',
    slug: 'ella-peak',
    name: 'Ella Peak Wilderness Bivouac',
    location: 'Ella Forest Reserve (Badulla)',
    elevation: '1,340m',
    featureBadge: 'Field Inspection Pending',
    featureBadgeType: 'draft',
    pitchesCount: 6,
    pitchesLabel: '6 Pitches',
    maxCampers: 24,
    campersLabel: 'Max 24 Campers',
    footprint: 'Staging for Ella Rock trail',
    tariffLkr: 'LKR 1,500',
    tariffUnit: 'pitch',
    tariffExtra: 'Proposed Municipal Fee',
    tariffUsd: '',
    status: 'draft',
    statusText: 'DRAFT / PENDING FOREST OFFICER AUDIT',
    statusSub: 'Awaiting soil stability certificate',
    clearanceOffice: 'Badulla Divisional Secretariat',
    clearanceSub: 'Environmental Division',
    lastSynced: '4 days ago',
    lastSyncedChannel: 'Field Dossier v2',
    terrainBelt: 'Uva Passages',
    hasWaterSpring: false,
    requiresRanger: false,
    maxGroup12: true
  }
];

export const knucklesCampDetail = {
  name: 'Knuckles Cloud Forest Camp – High Ridge Pitch 02',
  subtitle: 'MEEMURE SIDE ELEVATION: 1,480M • MATALE DISTRICT – CENTRAL HIGHLANDS BIOSPHERE RESERVE',
  tagline: "Perched at 1,480 meters on the watershed ridge connecting Deanston and the isolated agrarian village of Meemure, High Ridge Pitch 02 is one of the island's most ecologically secluded wilderness camping sanctuaries.",
  trailApproach: "The trail commences from the Deanston Conservation Centre (11km total route), winding through dense montane pygmy forests enveloped in moss, high-altitude cardamom groves, and sheer granite escarpments with sheer drop-offs into the Dumbara valley. Expect rapid weather shifts: early morning clarity often gives way to dense hill-country cloud immersion by 13:00 IST.",
  elevation: '1,480m ASL',
  temperature: '16°C (Mist)',
  image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1600&q=80',
  badges: [
    { label: 'DWC Official Wilderness Campsite', variant: 'green' },
    { label: 'Current Status: Open - Spring Flowing', variant: 'green-pulse' },
    { label: 'Trail Grade: Extreme Ridge Hike (4.5 hrs)', variant: 'amber-trail' }
  ],
  specs: [
    { label: 'PITCH CAPACITY', value: '4 Cleared Pads', sub: 'Strict limit of 16 campers / 24 hrs' },
    { label: 'TARIFF / NIGHT', value: 'USD $25 Foreign', sub: 'SAARC 50% • Local LKR 2,500 + DWC entry' },
    { label: 'OPTIMAL SEASON', value: 'Jan – Apr & Jul – Sep', sub: 'Oct-Dec: Heavy rains & flash floods' },
    { label: 'POTABLE WATER', value: 'Perennial Spring', sub: '80m West; boil or tablet treat' },
    { label: 'SANITATION', value: 'Bio-Compost Pit', sub: 'Timber latrine with sawdust box' }
  ],
  gearChecklist: [
    { title: 'Heavy-Duty Leech Socks', desc: 'Tight-weave knee-high barriers with tobacco leaf or salt tincture rub for wet damp undergrowth.' },
    { title: '3-Season Waterproof Tent', desc: 'Hydrostatic head minimum 5,000mm with reinforced guy-lines for nocturnal escarpment gusts.' },
    { title: '45L Roll-Top Dry Sack', desc: 'Monsoonal cloud bursts saturate conventional pack covers; keep sleeping bag and radio dry.' },
    { title: 'Sub-Zero Thermal Layer & Headlamp', desc: 'Night temperatures plummet to 10°C in dense mist. Pack spare lithium cells for cold durability.' }
  ],
  rulesQuadrants: [
    {
      id: '01',
      title: 'Quadrant 01',
      subtitle: 'General Rules & Camper Conduct',
      badge: 'Conduct & Timing',
      items: [
        { label: 'Check-in daylight hours strictly before 17:30 IST', desc: 'No trekking permitted along the sheer escarpment edges after dark under any circumstances.' },
        { label: 'Maximum continuous stay: 2 consecutive nights', desc: 'Per permit to safeguard fragile cloud-forest topsoil and mitigate ground compaction.' },
        { label: 'Quiet wilderness hours: 20:00 to 06:00', desc: 'Acoustic speakers, amplified music, radios, or portable generator motors are strictly forbidden.' }
      ],
      footnote: 'Violation fine: LKR 10,000 / immediate revocation of wilderness permit.'
    },
    {
      id: '02',
      title: 'Quadrant 02',
      subtitle: 'Environmental Protection & Zero Waste',
      badge: 'Leave-No-Trace',
      items: [
        { label: 'Absolute Zero-Polythene Zone', desc: 'Single-use shopping bags, flimsy plastics, and styrofoam containers will be confiscated at Deanston Checkpoint.' },
        { label: 'Pack-It-In, Pack-It-Out', desc: 'All dehydrated meal packaging, tin containers, wet wipes, and personal trash must be carried back to the ranger post.' },
        { label: 'Water Source Hygiene', desc: 'Absolutely no synthetic soaps, chemical detergents, shampoos, or toothpastes within 50m of natural stream conduits.' }
      ],
      footnote: 'Checked against ranger dispatch register upon exit.'
    },
    {
      id: '03',
      title: 'Quadrant 03',
      subtitle: 'Fire Restrictions & Open Hearth Safety',
      badge: 'CRITICAL RISK / RED',
      variant: 'danger',
      items: [
        { label: 'High Wildfire Risk: Ground campfires on dry scrub, grassland patches, or grassy knolls', desc: 'Strictly prohibited and subject to immediate detention under the Fauna & Flora Protection Ordinance.' },
        { label: 'Permitted Cooking: Small campfires permitted ONLY within designated raised stone hearth', desc: 'When relative humidity > 60% and supervised by assigned beat tracker.' },
        { label: 'Gather only fallen deadwood twigs', desc: 'Cutting, hacking, or snapping limbs of living rhododendrons or endemic dwarf bamboo constitutes a non-bailable offense.' }
      ],
      footnote: 'Forest Department patrols conduct drone thermal surveillance nightly.'
    },
    {
      id: '04',
      title: 'Quadrant 04',
      subtitle: 'Wildlife Precautions & Ridge Hazards',
      badge: 'Wild Fauna & Weather',
      variant: 'caution',
      items: [
        { label: 'Leech & Viper Advisory: Land leeches present across wet tea-fringe approaches', desc: 'Inspect boots carefully for venomous hump-nosed pit vipers (Hypnale hypnale) basking in rotting logs.' },
        { label: 'Elephant Corridor Alert: Pitch shelters strictly on leveled platforms', desc: 'Do not pitch tents across active game tracks leading downhill to the reservoir stream basin.' },
        { label: 'Flash Flooding & Escarpment Fog: If cloud rainfall exceeds 60mm/hr', desc: 'Immediately evacuate the lower stream depression and assemble at High Ridge Staging Pad.' }
      ],
      footnote: 'Emergency evacuation whistle frequency: 3 short blasts repeated at 1-min intervals.'
    }
  ],
  rangerOffice: {
    hotline: '+94 66 222 4110',
    hotlineSub: 'Hunnasgiriya Range Headquarters (24/7 Desk)',
    channel: 'Channel 88 (146.520 MHz)',
    channelCallsign: "Callsign: 'Dumbara Cloud Guard Beta'",
    rescueSiding: 'Deanston Beat Office',
    rescueSub: 'Satellite link active (Iridium PTT Relay)'
  },
  corridorAccess: [
    {
      route: 'Corridor: Hasalaka – Meemure Route',
      timeAgo: '14m ago',
      title: 'Hasalaka-Meemure Tractor Pass',
      desc: 'Impassable to private 2WD & 4WD cars. Heavy boulder run-off near Pitawala escarpment. Only heavy agrarian 4WD tractors operational.',
      activeFrom: 'Relay active from Hunnasgiriya',
      source: 'Divisional Secretariat Log',
      status: 'caution'
    },
    {
      route: 'Deanston Main Forest Track',
      timeAgo: '1 hr ago',
      title: 'Passage Open to Permitted Hikers',
      desc: "Foot trail clear of mudslides up to Mini World's End junction. Ranger check-in kiosk operational.",
      activeFrom: '',
      source: '',
      status: 'open'
    }
  ],
  nearbySpots: [
    {
      name: "Corbet's Gap Staging",
      badge: 'High Wind Caution',
      badgeType: 'caution',
      distance: '3.6 km North-West • Elevation 1,220m',
      desc: 'Spectacular wind tunnel gap between Knuckles and Dumbanagala peaks. Primitive day shelter only.'
    },
    {
      name: 'Nitro Caves Bivouac',
      badge: 'DWC Permit Only',
      badgeType: 'badge-dark',
      distance: '5.2 km South-East • Cavern Pitch',
      desc: 'Massive natural saltpeter cavern inhabited by thousands of bats. Wet, slippery granite floor requires crampon footbeds.'
    },
    {
      name: 'Pitawala Pathana Escarpment',
      badge: 'Open Daylight',
      badgeType: 'open',
      distance: '8.4 km North • Grassland Plateau',
      desc: 'Unique pygme montane grassland with endemic frog pools and vertical 300m drop. No overnight camping.'
    }
  ]
};
