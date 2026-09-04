export const tourismStats = {
  totalDestinations: 32,
  totalDestinationsSub: '9 Provinces Logged',
  activeOpen: 28,
  activeOpenSub: 'Live to Foreign Desks',
  weatherAdvisory: 2,
  weatherAdvisorySub: 'Monsoon Suspended',
  draftRevisions: 2,
  draftRevisionsSub: 'Pending DWC Audit'
};

export const tourismList = [
  {
    id: 'sigiriya-01',
    slug: 'sigiriya',
    name: 'Sigiriya Ancient Rock Fortress',
    nodeId: 'UNESCO-LK-0014 • Central Archaeological Precinct',
    category: 'Heritage & Archaeological',
    categoryIcon: 'landmark',
    province: 'Central Province',
    district: 'Matale District (A6 Corridor)',
    status: 'open',
    statusText: 'PUBLISHED / OPEN',
    statusSub: '',
    foreignTariff: 'USD 36 (Foreign)',
    localTariff: 'LKR 150 (Local Citizen)',
    verifiedAgo: '2 hrs ago',
    verifiedDesk: 'SLTDA Field Desk',
    ecoRestricted: false
  },
  {
    id: 'ella-rock-02',
    slug: 'ella-rock',
    name: 'Ella Rock & Ravana Ridge',
    nodeId: 'NAT-UVA-8821 • Railway Trackhead Escarpment',
    category: 'Nature & Hiking',
    categoryIcon: 'trees',
    province: 'Uva Province',
    district: 'Badulla District (Ella Gap)',
    status: 'caution',
    statusText: 'CAUTION: MIST WARNING',
    statusSub: '',
    foreignTariff: 'Free Trail Access',
    localTariff: 'Licensed Guide Optional',
    verifiedAgo: 'Yesterday 18:30',
    verifiedDesk: 'Ella Tour Police Node',
    ecoRestricted: false
  },
  {
    id: 'little-adams-03',
    slug: 'little-adams-peak',
    name: "Little Adam's Peak & Nine Arches",
    nodeId: 'PAN-UVA-1090 • Demodara Viaduct Sector',
    category: 'Viewpoints & Walking',
    categoryIcon: 'mountain',
    province: 'Uva Province',
    district: 'Badulla District',
    status: 'open',
    statusText: 'PUBLISHED / OPEN',
    statusSub: '',
    foreignTariff: 'Free Walkway',
    localTariff: 'Flying Ravana Zipline Paid',
    verifiedAgo: '3 days ago',
    verifiedDesk: 'Highland Ranger Stn',
    ecoRestricted: false
  },
  {
    id: 'horton-plains-04',
    slug: 'horton-plains',
    name: "Horton Plains & World's End",
    nodeId: 'DWC-CP-4402 • Ohiya Plateau Entrance',
    category: 'National Park & Cloud Forest',
    categoryIcon: 'cloud-sun',
    province: 'Central Province',
    district: 'Nuwara Eliya (B312 Access)',
    status: 'open',
    statusText: 'PUBLISHED / OPEN',
    statusSub: 'Zero Single-Use Plastics',
    foreignTariff: 'USD 35 + VAT',
    localTariff: 'DWC Group Vehicle Permit',
    verifiedAgo: '5 hrs ago',
    verifiedDesk: 'Dept of Wildlife Ward',
    ecoRestricted: true
  },
  {
    id: 'dunhinda-05',
    slug: 'dunhinda-falls',
    name: 'Dunhinda Falls Gorge',
    nodeId: 'GEO-UVA-6299 • Badulu Oya Pathway',
    category: 'Waterfalls & Gorges',
    categoryIcon: 'droplets',
    province: 'Uva Province',
    district: 'Badulla Urban Council',
    status: 'draft',
    statusText: 'DRAFT / RANGER REVIEW',
    statusSub: '',
    foreignTariff: 'LKR 300 (Local)',
    localTariff: 'Foreign Tariff Pending',
    verifiedAgo: 'Just now',
    verifiedDesk: 'Silva (Admin Draft)',
    ecoRestricted: false
  },
  {
    id: 'pigeon-island-06',
    slug: 'pigeon-island',
    name: 'Pigeon Island Marine National Park',
    nodeId: 'MAR-EP-7741 • Nilaveli Boat Station',
    category: 'Coastal & Marine',
    categoryIcon: 'waves',
    province: 'Eastern Province',
    district: 'Trincomalee Coast',
    status: 'danger',
    statusText: 'SUSPENDED',
    statusSub: 'High Monsoonal Swell',
    foreignTariff: 'USD 25 (Marine Pass)',
    localTariff: 'Boat Charter Separate',
    verifiedAgo: '1 hr ago',
    verifiedDesk: 'Trinco Harbour Master',
    ecoRestricted: false
  }
];

export const sigiriyaDetail = {
  name: 'Sigiriya Rock Fortress & Royal Water Gardens',
  subHeading: 'MATALE DISTRICT • CENTRAL CULTURAL TRIANGLE • 165 KM NORTH-EAST OF COLOMBO',
  description: "The 5th-century cliff citadel of King Kashyapa. An engineering marvel featuring sheer vertical staircases, the monumental Lion's Paw Gate, mirror-glazed ramparts, and ancient cloud-maiden frescoes.",
  nodeCode: 'MAT-SIG-01',
  citadelNode: 'Sigiriya Citadel Node #184',
  weatherStatus: 'Weather: Clear Sunrise',
  windStatus: 'Wind: 8 km/h NE',
  verifiedTime: 'Verified: 07:15 SLST',
  elevation: '349M ASL',
  badges: [
    { label: 'UNESCO WORLD HERITAGE SITE #184', variant: 'heritage' },
    { label: 'OPERATIONAL STATUS: OPEN & UNOBSTRUCTED', variant: 'green-pulse' },
    { label: 'ELEVATION: 349M ASL', variant: 'neutral' }
  ],
  heroImage: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1600&q=80',
  quickActions: [
    { label: 'Check A6 Corridor Status', icon: 'route' },
    { label: 'Download 2G Offline Ledger (6.2 MB)', icon: 'download' },
    { label: 'Audio Guide (English 42 min)', icon: 'headphones' },
    { label: 'Direct Ticket Desk: +94 66 228 6241', icon: 'phone' }
  ],
  specs: [
    {
      label: 'FOREIGN TOURIST TARIFF',
      value: 'USD $36 / ~LKR 11,500',
      sub: 'Includes Archaeological Museum, Gardens & Summit ascent. SAARC: $18. Kids < 12: $18. Cash & Visa/Mastercard accepted.'
    },
    {
      label: 'ASCENT WINDOWS',
      value: '06:30 – 17:30 Daily',
      sub: 'Ticket counter closes strictly at 17:00. Optimal ascent window is 06:30 – 08:30 AM to mitigate vertical humid solar gain.'
    },
    {
      label: 'ASCENT RATING',
      value: '1,200 Steps (Moderate)',
      sub: 'Cantilevered iron stairs anchored to open cliff face. Average duration 1.5 – 2.5 hours round trip. Moderate fitness required.'
    },
    {
      label: 'OFFICIAL GUIDES',
      value: 'West Gate Post',
      sub: 'Hire exclusively verified Sri Lanka Tourism Development Authority (SLTDA) badge holders. Standard tariff: LKR 3,500 – 5,000 negotiated beforehand.'
    }
  ],
  dossier: {
    title: 'The Sky Fortress of Kashyapa: 5th-Century Hydraulic Sovereign',
    badge: 'FIELD DOSSIER • CULTURAL TRIANGLE',
    ref: 'Catalogue Ref #SIG-477AD',
    paragraphs: [
      'Rising 200 meters above surrounding scrub jungles, the monolithic magma plug of Sigiriya was selected in 477 AD by King Kashyapa as his fortified redoubt following a dynastic patricide. Rejecting the traditional capital of Anuradhapura, he engineered a monumental citadel conceived as a cosmic mountain palace, anchored by the gigantic sculptured torso and paws of a roaring brick lion guarding the northern staircase.',
      "Beyond defensive bastions, Kashyapa's master builders installed complex hydraulic systems—subterranean terracotta conduits, limestone gravity conduits, and pressurized fountain nozzles—that remain operational during the Northeast Monsoon over fifteen centuries later. The sheer western face preserves fragmentary portraits of the renowned Sigiriya Frescoes, depicting celestial apsaras holding lotus blooms, finished with indigenous earth pigments over hand-smoothed clay lime mortar."
    ],
    highlights: [
      {
        title: 'Hydraulic Gardens',
        desc: 'Symmetrical aquatic pleasure parks engineered with subterranean conduits.',
        icon: 'water'
      },
      {
        title: 'Mirror Wall Graffiti',
        desc: 'Polished brick plaster carrying poetic verses inscribed by 8th-century voyagers.',
        icon: 'pencil'
      },
      {
        title: 'Summit Throne Acropolis',
        desc: '3-acre terraced palace summit with 360-degree vistas over the dry zone plains.',
        icon: 'mountain'
      }
    ],
    gallery: [
      { title: "The Lion's Paws", image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=400&q=80' },
      { title: 'Mirror Wall Corridor', image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=400&q=80' },
      { title: 'Terraced Summit Ruins', image: 'https://images.unsplash.com/photo-1578652520385-c05f6f264b3c?auto=format&fit=crop&w=400&q=80' },
      { title: 'Water Gardens at Dawn', image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  siteRules: [
    {
      title: 'Strict Prohibitions & Immediate Legal Penalties',
      badge: 'ENFORCED BY POLICE DESK',
      variant: 'danger',
      rules: [
        { label: 'NO DRONES (UAV Ban):', desc: 'Operating aerial drones within a 2-kilometer radius of Sigiriya Rock is strictly forbidden under the Sri Lanka Civil Aviation Act. Violations incur immediate equipment confiscation and statutory judicial fines up to LKR 250,000. Drones disturb giant Asian hornet colonies nesting beneath rock overhangs.' },
        { label: 'Zero Single-Use Plastics & Smoking Prohibition:', desc: 'Discarding plastic bottles, food packaging, or cigarette butts is completely prohibited. Security teams at the West Moat checkpoint will strip plastic labels from water containers. Smoking anywhere within the precinct carries on-the-spot legal citations.' }
      ]
    },
    {
      title: 'Cultural Etiquette & Sacred Sanctuary Etiquette',
      badge: 'ANTIQUITIES DEPT DIRECTIVE',
      variant: 'green',
      rules: [
        { label: 'Fresco Gallery Photography:', desc: 'Photography of any kind—including flash, non-flash, and smartphone selfies—is strictly prohibited inside the spiral Fresco Cave to prevent photo-chemical decay of 1,600-year-old natural plant pigments.' },
        { label: 'Mirror Wall Preservation:', desc: 'Touching, scratching, or leaning on the polished plaster of the Mirror Wall is a criminal offense under archaeological vandalism statutes. CCTV monitoring is continuous.' },
        { label: 'Respectful Posture:', desc: 'Do not pose with your back turned directly against Buddhist shrines or sacred monoliths in the lower monastery grounds. Modest attire (shoulders and knees covered) is mandatory when traversing adjoining shrine compounds.' }
      ]
    },
    {
      title: 'Wildlife Protocol: Giant Hornet & Macaque Advisory',
      badge: 'CAUTION ACTIVE',
      variant: 'caution',
      rules: [
        { label: 'Hornet Quiet Zones:', desc: 'The upper cantilevered staircase passes beneath known Vespa affinis (giant Asian hornet) nests. Observe absolute silence in marked zones. Avoid wearing bright yellow or fluorescent orange garments, and do not make violent flapping gestures if hornets buzz overhead. Protective mesh suits are deployed by rangers if colonies agitate.' },
        { label: 'Toque Macaque Monkeys:', desc: 'Wild primates along the terrace are habituated to grab open food, plastic pouches, and exposed camera straps. Keep all food items sealed in zipped backpacks. Do not feed wildlife under any circumstances.' }
      ]
    },
    {
      title: 'Accessibility & Medical Notice',
      badge: '',
      variant: 'neutral',
      desc: "Wheelchair access is strictly limited to the outer Water Gardens and the on-site Archaeological Museum. Beyond the terrace of the Mirror Wall, traversal requires ascending 1,200 steep metal and stone stairs. Visitors with cardiovascular conditions, acute vertigo, or late-term pregnancy are advised to rest at the Lion's Paws plateau (Level 2) and refrain from the exposed summit climb."
    }
  ],
  corridorRadar: [
    { route: 'A6 Highway (Colombo - Dambulla)', status: 'Clear', statusVariant: 'open', desc: 'Dual-carriageway sector fully passable. Travel time from Bandaranaike Airport (CMB) approx. 3.5 to 4 hours via Kurunegala Expressway link.' },
    { route: 'Inamaluwa - Sigiriya Link (B423)', status: 'Clear', statusVariant: 'open', desc: 'Secondary asphalt corridor fully passable. Caution: wild elephant crossing signs active between 18:30 and 22:00.' },
    { route: 'Habarana Junction Transit Hub', status: 'Normal', statusVariant: 'open', desc: 'Fuel stations (Ceypetco & Lanka IOC) operating at 100% capacity with 95 Octane and Auto Diesel reserves.' }
  ],
  campAndStay: [
    { name: 'Pidurangala Wilderness Camp', badge: 'VERIFIED SAFE', variant: 'open', desc: '1.4 km North. Forest tent decks facing northern rock wall. Solar power + clean spring supply active.' },
    { name: 'Sigiriya Heritage Eco Village', badge: 'LOW GEN FUEL', variant: 'caution', desc: '2.2 km West. Main grid functional; backup generator running on 30% diesel reserve during CEB maintenance.' },
    { name: 'Aliya Resort & Spa Node', badge: 'VERIFIED SAFE', variant: 'open', desc: 'High-capacity connectivity node. Starlink terminal accessible for stranded travelers and remote dispatches.' }
  ],
  hotlines: [
    { label: 'Tourist Police (Sigiriya Post)', number: '066 228 6520', isPrimary: true },
    { label: '1990 Suwa Seriya Ambulance', number: '1990 (Free)', isPrimary: true, isEmergency: true },
    { label: 'Sri Lanka Tourism Hotline', number: '1912', isPrimary: false },
    { label: 'Dambulla Base Hospital', number: '066 228 4822', isPrimary: false }
  ]
};
