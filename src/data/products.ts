/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

export const HERO_HEADPHONE_IMAGE = 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'; // White over-ear headphones
export const HERO_WOMAN_IMAGE = 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=800&q=80'; // Woman wearing white headphones with closed eyes

const RAW_PRODUCTS: Product[] = [
  // --- BEST SELLERS ---
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max, 256GB, Titanium',
    description: 'The ultimate iPhone experience. Features a robust and light titanium design, a new Action button, powerful camera upgrades, and the groundbreaking A17 Pro chip for next-level mobile gaming and performance.',
    category: 'smartphones',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    originalPrice: 1299.99,
    salePrice: 1099.99,
    rating: 4.8,
    isBestSeller: true,
    isFeatured: false,
    stock: 12,
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    storages: ['256GB', '512GB', '1TB'],
    specs: {
      Display: '6.7-inch Super Retina XDR OLED, 120Hz',
      Processor: 'Apple A17 Pro (3nm)',
      Camera: '48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto',
      Battery: 'Up to 29 hours video playback',
      Weight: '221g'
    },
    features: [
      'Aerospace-grade Titanium design with textured matte glass back',
      'Ceramic Shield front, tougher than any smartphone glass',
      'Action button customizable to your favorite feature',
      'USB-C port with USB 3 speeds for ultra-fast transfers'
    ],
    reviews: [
      { id: 'r1', author: 'Alex M.', rating: 5, comment: 'Incredible camera and battery life. The titanium feels premium and lightweight.', date: '2026-06-15' },
      { id: 'r2', author: 'Sarah K.', rating: 4, comment: 'Beautiful design. The zoom lens is superb. Highly recommend!', date: '2026-06-20' }
    ]
  },
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro (2nd Gen) with MagSafe Case',
    description: 'Rebuilt from the sound up. Features up to 2x more Active Noise Cancellation, Adaptive Audio to tailor noise control to your environment, and Personalized Spatial Audio with dynamic head tracking for immersive listening.',
    category: 'audio',
    image: 'https://images.unsplash.com/photo-1588449668338-de1300024f4f?auto=format&fit=crop&w=600&q=80',
    originalPrice: 249.99,
    salePrice: 199.99,
    rating: 4.7,
    isBestSeller: true,
    isFeatured: false,
    stock: 25,
    colors: ['White'],
    specs: {
      Chip: 'Apple H2 headphone chip, Apple U1 chip in case',
      Connectivity: 'Bluetooth 5.3',
      Battery: 'Up to 6 hours listening time (up to 30 hours with case)',
      Waterproof: 'IP54 dust, sweat, and water resistant'
    },
    features: [
      'Up to 2x more Active Noise Cancellation than previous generation',
      'Adaptive Audio dynamically blends Transparency and ANC',
      'MagSafe Charging Case with Speaker and Lanyard Loop',
      'Touch control lets you swipe to adjust volume'
    ],
    reviews: [
      { id: 'r3', author: 'David L.', rating: 5, comment: 'The noise cancellation is magic. Adaptive audio works incredibly well in the subway.', date: '2026-05-12' },
      { id: 'r4', author: 'Emma T.', rating: 5, comment: 'Perfect fit. Sound quality is rich and clear. The case speaker helps find them easily!', date: '2026-06-02' }
    ]
  },
  {
    id: 'macbook-air-15',
    name: 'MacBook Air 15-inch, M2 Chip, Midnight',
    description: 'Impossibly thin. Blazing fast. The 15-inch MacBook Air is strikingly thin and has a beautiful Liquid Retina display. Supercharged by the M2 chip, and with up to 18 hours of battery life, it delivers incredible performance in an ultraportable design.',
    category: 'laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    originalPrice: 1439.99,
    salePrice: 1299.99,
    rating: 4.9,
    isBestSeller: true,
    isFeatured: false,
    stock: 8,
    colors: ['Midnight', 'Space Gray', 'Silver', 'Starlight'],
    storages: ['256GB SSD', '512GB SSD', '1TB SSD'],
    specs: {
      Display: '15.3-inch Liquid Retina display, 500 nits brightness',
      Processor: 'Apple M2 Chip (8-core CPU, 10-core GPU)',
      Memory: '8GB Unified Memory (configurable)',
      Battery: 'Up to 18 hours Apple TV app movie playback',
      Ports: 'MagSafe 3, two Thunderbolt / USB 4 ports, headphone jack'
    },
    features: [
      'Just 11.5 mm thin and weighs only 3.3 pounds',
      'Fanless design for completely silent operation',
      '1080p FaceTime HD camera and three-microphone array',
      'Six-speaker sound system with force-cancelling woofers'
    ],
    reviews: [
      { id: 'r5', author: 'Michael R.', rating: 5, comment: 'The extra screen space of the 15-inch model is fantastic while keeping it ultra-portable. M2 is super snappy.', date: '2026-04-18' },
      { id: 'r6', author: 'Sophia G.', rating: 4.8, comment: 'Perfect college laptop. Silent, fast, and the battery literally lasts 2 days of classes.', date: '2026-05-30' }
    ]
  },
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2, GPS + Cellular',
    description: 'The ultimate sports and adventure watch is now even more capable. Powered by the S9 SiP. A super-bright display. A magical new way to use your watch without touching the screen. And customized band styles for athletes of all kinds.',
    category: 'wearables',
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=600&q=80',
    originalPrice: 799.99,
    salePrice: 699.99,
    rating: 4.6,
    isBestSeller: true,
    isFeatured: false,
    stock: 15,
    colors: ['Titanium Alpine Loop', 'Titanium Trail Loop', 'Titanium Ocean Band'],
    specs: {
      Display: 'Always-On Retina LTPO OLED, up to 3000 nits',
      CaseSize: '49mm aerospace-grade titanium',
      Connectivity: 'LTE and UMTS, Wi-Fi, Bluetooth 5.3',
      Battery: 'Up to 36 hours (up to 72 hours in Low Power Mode)'
    },
    features: [
      'Dual-frequency GPS provides incredible accuracy to calculate distance and pace',
      'Water resistant to 100m, certified for recreational scuba diving to 40m',
      'Customizable Action button to mark lap, start workout, or activate siren',
      'Double tap gesture allows one-handed control'
    ],
    reviews: [
      { id: 'r7', author: 'Chris H.', rating: 5, comment: 'Insane build quality. The screen brightness is perfect for direct sunlight hiking. Battery easily goes 3 days.', date: '2026-06-11' }
    ]
  },

  // --- FEATURED PRODUCTS ---
  {
    id: 'sony-wh-1000xm5',
    name: 'Sony WH-1000XM5 Noise Canceling Headphones',
    description: 'Your world, nothing else. Sony’s industry-leading noise cancellation takes its biggest step forward with eight microphones, two processors, and Auto NC Optimizer. Delivers exceptional high-resolution audio quality.',
    category: 'audio',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    originalPrice: 349.99,
    salePrice: 299.99,
    rating: 4.8,
    isBestSeller: false,
    isFeatured: true,
    stock: 18,
    colors: ['Black', 'Silver', 'Midnight Blue'],
    specs: {
      DriverUnit: '30mm, dome type',
      FrequencyResponse: '4Hz - 40,000Hz',
      Battery: 'Up to 30 hours (ANC ON) / 40 hours (ANC OFF)',
      Charging: 'USB-C quick charging (3 min for 3 hours playback)'
    },
    features: [
      'Industry-leading Active Noise Cancellation with Auto NC Optimizer',
      'Magnificent sound engineered with the Integrated Processor V1',
      'Crystal-clear hands-free calling with 4 beamforming microphones',
      'Comfortable lightweight design with soft fit leather'
    ],
    reviews: [
      { id: 'r8', author: 'James P.', rating: 5, comment: 'Absolute best sound quality on any Bluetooth headphones I have owned. The ANC is industry-leading indeed.', date: '2026-05-24' },
      { id: 'r9', author: 'Olivia W.', rating: 4.5, comment: 'Very comfortable to wear for hours at work. Touch controls are sensitive and useful.', date: '2026-06-08' }
    ]
  },
  {
    id: 'samsung-s23-ultra',
    name: 'Samsung Galaxy S23 Ultra, 512GB, Phantom Black',
    description: 'Share the epic. Designed with the planet in mind, Galaxy S23 Ultra is loaded with raw power. Equipped with an embedded S Pen, professional-grade 200MP Nightography camera, and the fastest chip in Android history.',
    category: 'smartphones',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
    originalPrice: 1399.99,
    salePrice: 1199.99,
    rating: 4.7,
    isBestSeller: false,
    isFeatured: true,
    stock: 10,
    colors: ['Phantom Black', 'Green', 'Cream', 'Lavender'],
    storages: ['256GB', '512GB', '1TB'],
    specs: {
      Display: '6.8-inch Dynamic AMOLED 2X, 120Hz, HDR10+',
      Processor: 'Snapdragon 8 Gen 2 for Galaxy',
      Camera: '200MP Main + 10MP Periscope + 10MP Telephoto + 12MP Ultra Wide',
      Battery: '5000 mAh with 45W fast charging'
    },
    features: [
      'Built-in S Pen lets you sketch, edit, and write with pen-to-paper precision',
      'Epic 200MP camera captures stunning details even in low-light environments',
      'Snapdragon 8 Gen 2 processor delivers unrivaled performance for gaming',
      'Long-lasting intelligent battery optimizes power consumption on the fly'
    ],
    reviews: [
      { id: 'r10', author: 'Robert F.', rating: 5, comment: 'The zoom lens is mind-blowing. S Pen is incredibly handy for notes. Absolute beast of a phone.', date: '2026-04-30' }
    ]
  },
  {
    id: 'dell-xps-13',
    name: 'Dell XPS 13, Intel Core i7, 16GB RAM',
    description: 'Perfectly designed for on-the-go productivity. Made from CNC-machined aluminum and aerospace-grade carbon fiber. Features an immersive InfinityEdge display and 13th Gen Intel Core performance.',
    category: 'laptops',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80',
    originalPrice: 1249.99,
    salePrice: 1099.99,
    rating: 4.5,
    isBestSeller: false,
    isFeatured: true,
    stock: 6,
    colors: ['Platinum Silver', 'Graphite Black'],
    storages: ['512GB SSD', '1TB SSD'],
    specs: {
      Display: '13.4-inch FHD+ (1920x1200) InfinityEdge, 500 nits',
      Processor: 'Intel Core i7-1355U (up to 5.0 GHz)',
      Memory: '16GB LPDDR5 Dual Channel',
      Storage: '512GB PCIe NVMe SSD',
      Weight: '1.17 kg'
    },
    features: [
      'Stunning 4-sided InfinityEdge display with 16:10 aspect ratio',
      'Crafted from high-precision aluminum for ultimate durability and premium feel',
      'Advanced thermal redesign keeps the system quiet and cool under load',
      'Super lightweight, making it incredibly easy to pack and travel'
    ],
    reviews: [
      { id: 'r11', author: 'Linda J.', rating: 4, comment: 'Incredibly beautiful laptop. Lightweight, gorgeous screen, fast. Keyboard feels nice.', date: '2026-05-15' }
    ]
  },
  {
    id: 'sonos-era-300',
    name: 'Sonos Era 300 Smart Speaker, White',
    description: 'A revolutionary architectural breakthrough in acoustic engineering. With next-level audio that hits from every direction, Era 300 doesn’t just surround you, it puts you inside your music with Dolby Atmos spatial sound.',
    category: 'audio',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
    originalPrice: 449.99,
    salePrice: 399.99,
    rating: 4.8,
    isBestSeller: false,
    isFeatured: true,
    stock: 14,
    colors: ['White', 'Black'],
    specs: {
      Amplifiers: 'Six class-D digital amplifiers',
      Speakers: 'Four tweeters, two woofers',
      Connectivity: 'Wi-Fi 6, Bluetooth 5.0, USB-C Line-In',
      VoiceAssistant: 'Sonos Voice Control, Amazon Alexa'
    },
    features: [
      'Six optimally positioned drivers deliver revolutionary spatial audio with Dolby Atmos',
      'Stream high-quality audio over Wi-Fi, Bluetooth, or via standard line-in',
      'Trueplay tuning technology optimizes acoustic profile for your unique room',
      'Durable, environment-friendly materials and touch-capacitive control interface'
    ],
    reviews: [
      { id: 'r12', author: 'Nate T.', rating: 5, comment: 'Spatial audio is breathtaking. It fills the entire room. Setup was simple through the app.', date: '2026-06-25' }
    ]
  },

  // --- 20 NEW PRODUCTS ---
  {
    id: 'pixel-8-pro',
    name: 'Google Pixel 8 Pro, 128GB, Bay Blue',
    description: 'The all-pro phone engineered by Google. It has the best of Google AI, the most advanced Pixel Camera ever, and can even help you edit photos to look exactly how you remember them.',
    category: 'smartphones',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
    originalPrice: 999.99,
    salePrice: 849.99,
    rating: 4.7,
    isBestSeller: false,
    isFeatured: true,
    stock: 16,
    colors: ['Bay Blue', 'Obsidian Black', 'Porcelain White'],
    storages: ['128GB', '256GB', '512GB'],
    specs: {
      Display: '6.7-inch Super Actua LTPO OLED, 120Hz',
      Processor: 'Google Tensor G3 (4nm) with Titan M2',
      Camera: '50MP Main + 48MP Ultra Wide + 48MP 5x Telephoto',
      Battery: '5050 mAh with 30W fast charging'
    },
    features: [
      'Google AI makes everyday tasks even easier, like screening calls and translating on the fly',
      'Magic Eraser and Best Take help you get the perfect group photo without any distractions',
      'Thermometer sensor lets you measure the temperature of objects easily',
      'Seven years of guaranteed OS, security, and feature updates'
    ],
    reviews: [
      { id: 'rp1', author: 'Marcus H.', rating: 5, comment: 'The photos this phone takes are unbelievable. Best camera software on the market.', date: '2026-05-10' }
    ]
  },
  {
    id: 'galaxy-z-fold5',
    name: 'Samsung Galaxy Z Fold5, 512GB, Icy Blue',
    description: 'The ultimate productivity powerhouse. Unfold a massive 7.6-inch screen to multi-task like a pro, run multiple apps at once, and immerse yourself in gaming with desktop-level graphics.',
    category: 'smartphones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    originalPrice: 1919.99,
    salePrice: 1699.99,
    rating: 4.6,
    isBestSeller: true,
    isFeatured: false,
    stock: 5,
    colors: ['Icy Blue', 'Phantom Black', 'Cream'],
    storages: ['256GB', '512GB', '1TB'],
    specs: {
      Display: '7.6-inch Dynamic AMOLED 2X Foldable, 120Hz',
      CoverDisplay: '6.2-inch Dynamic AMOLED 2X, 120Hz',
      Processor: 'Snapdragon 8 Gen 2',
      Camera: '50MP Main + 10MP Telephoto + 12MP Ultra Wide'
    },
    features: [
      'Thinner, lighter, and more portable than previous generations with zero-gap hinge',
      'Multi-window layout allows you to keep up to three windows open at once',
      'S Pen compatible for quick sketches, notes, and signing documents on the go',
      'Bright main display offers 1750 nits for supreme outdoor viewing'
    ],
    reviews: [
      { id: 'rp2', author: 'Elena V.', rating: 5, comment: 'Reading and editing documents on the unfolded screen is an absolute joy. Totally worth the premium.', date: '2026-06-18' }
    ]
  },
  {
    id: 'oneplus-12',
    name: 'OnePlus 12, 256GB, Silky Black',
    description: 'Smooth Beyond Belief. Powered by the latest Snapdragon 8 Gen 3 and up to 16GB RAM, the OnePlus 12 delivers flagship performance, ultra-fast 100W SUPERVOOC charging, and a stunning 2K 120Hz ProXDR display.',
    category: 'smartphones',
    image: 'https://images.unsplash.com/photo-1565849511593-ed34338a09c8?auto=format&fit=crop&w=600&q=80',
    originalPrice: 799.99,
    salePrice: 699.99,
    rating: 4.7,
    isBestSeller: false,
    isFeatured: true,
    stock: 20,
    colors: ['Silky Black', 'Flowy Emerald'],
    storages: ['256GB', '512GB'],
    specs: {
      Display: '6.82-inch 2K ProXDR AMOLED, 120Hz, 4500 nits peak',
      Processor: 'Snapdragon 8 Gen 3',
      Battery: '5400 mAh with 100W wired & 50W wireless charging',
      Camera: '50MP Sony LYT-808 + 64MP Periscope + 48MP Ultra Wide'
    },
    features: [
      'Charges from 1% to 100% in just 26 minutes with 100W SUPERVOOC charging',
      '4th Gen Hasselblad Camera for Mobile delivers stunningly realistic colors and portraits',
      'Dual Cryo-velocity VC cooling system ensures top-tier gaming performance without thermal throttling',
      'Unbelievable peak brightness of 4500 nits ensures perfect legibility anywhere'
    ],
    reviews: [
      { id: 'rp3', author: 'Tyler S.', rating: 5, comment: 'Battery life is outstanding, and the charging speed feels like magic. Best value flagship of the year.', date: '2026-06-22' }
    ]
  },
  {
    id: 'iphone-15-base',
    name: 'iPhone 15, 128GB, Black',
    description: 'Features the innovative Dynamic Island, a powerful 48MP Main camera with 2x Telephoto, and durable color-infused glass and aluminum design. Supercharged by the A16 Bionic chip and equipped with USB-C.',
    category: 'smartphones',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80',
    originalPrice: 799.99,
    salePrice: 699.99,
    rating: 4.5,
    isBestSeller: false,
    isFeatured: false,
    stock: 30,
    colors: ['Black', 'Blue', 'Green', 'Yellow', 'Pink'],
    storages: ['128GB', '256GB', '512GB'],
    specs: {
      Display: '6.1-inch Super Retina XDR OLED, Dynamic Island',
      Processor: 'Apple A16 Bionic (4nm)',
      Camera: '48MP Main + 12MP Ultra Wide with 2x Telephoto option',
      Battery: 'Up to 20 hours video playback'
    },
    features: [
      'Dynamic Island bubbles up alerts and Live Activities so you do not miss them',
      '48MP Main camera captures super-high-resolution photos with breathtaking detail',
      'USB-C connector lets you charge your Mac or iPad with the same cable as your iPhone',
      'Advanced safety features including Crash Detection and Emergency SOS via Satellite'
    ],
    reviews: [
      { id: 'rp4', author: 'Rachel C.', rating: 4, comment: 'Dynamic Island is a great addition, and the new matte back glass feels much better than previous models.', date: '2026-04-14' }
    ]
  },
  {
    id: 'rog-phone-8',
    name: 'Asus ROG Phone 8 Pro, 512GB',
    description: 'The ultimate gaming phone. Supercharged by the Snapdragon 8 Gen 3, a 165Hz AMOLED display, and featuring the revolutionary GameCool 8 cooling system. Includes customizable AirTrigger controls for console-like gaming.',
    category: 'smartphones',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    originalPrice: 1199.99,
    salePrice: 1099.99,
    rating: 4.8,
    isBestSeller: false,
    isFeatured: true,
    stock: 7,
    colors: ['Phantom Black'],
    storages: ['512GB', '1TB'],
    specs: {
      Display: '6.78-inch Samsung Flexible AMOLED, 165Hz, HDR10+',
      Processor: 'Snapdragon 8 Gen 3',
      Battery: '5500 mAh with 65W HyperCharge',
      Cooling: 'Rapid-Cooling Conductor + AeroActive Cooler 8'
    },
    features: [
      'Built-in AirTrigger touch sensors provide precision console-like inputs on the phone edge',
      'AniMe Vision customizable mini-LED rear display shows custom graphics or notifications',
      'First-ever IP68 dust and water resistance on a gaming smartphone',
      'Dual front-facing stereo speakers with Dirac HD Sound optimization'
    ],
    reviews: [
      { id: 'rp5', author: 'Hiroshi T.', rating: 5, comment: 'The display is buttery smooth and the cooling accessory keeps the phone completely ice cold during long gaming sessions.', date: '2026-05-29' }
    ]
  },
  {
    id: 'macbook-pro-16',
    name: 'MacBook Pro 16-inch, M3 Max, Space Black',
    description: 'Mind-blowing power for professional creators. Supercharged by the cutting-edge M3 Max chip with a 16-core CPU and 40-core GPU, this laptop handles massive 3D rendering, complex software compilation, and extreme multitasking with ease.',
    category: 'laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    originalPrice: 3499.99,
    salePrice: 3199.99,
    rating: 4.9,
    isBestSeller: true,
    isFeatured: true,
    stock: 4,
    colors: ['Space Black', 'Silver'],
    storages: ['1TB SSD', '2TB SSD', '4TB SSD'],
    specs: {
      Display: '16.2-inch Liquid Retina XDR display, 1600 nits peak',
      Processor: 'Apple M3 Max (16-core CPU, 40-core GPU)',
      Memory: '48GB Unified Memory (configurable up to 128GB)',
      Battery: 'Up to 22 hours of battery life'
    },
    features: [
      'Incredible Liquid Retina XDR screen with Extreme Dynamic Range and ProMotion 120Hz',
      'Six-speaker sound system with force-cancelling woofers and spatial audio support',
      'Versatile connections with three Thunderbolt 4 ports, SDXC card slot, HDMI port, and MagSafe 3',
      'All-new Space Black finish with a breakthrough chemistry that reduces fingerprint smudges'
    ],
    reviews: [
      { id: 'rp6', author: 'William D.', rating: 5, comment: 'Absolute absolute powerhouse. Compiling complex codebases takes half the time of my old M1 Pro. Phenomenal screen.', date: '2026-06-30' }
    ]
  },
  {
    id: 'thinkpad-x1',
    name: 'Lenovo ThinkPad X1 Carbon Gen 11',
    description: 'The pinnacle of business notebooks. Extremely lightweight carbon-fiber chassis paired with legendary durability, the world-famous ThinkPad keyboard, robust security features, and powerful Intel Core processors.',
    category: 'laptops',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    originalPrice: 1899.99,
    salePrice: 1699.99,
    rating: 4.7,
    isBestSeller: false,
    isFeatured: true,
    stock: 12,
    colors: ['Deep Black'],
    storages: ['512GB SSD', '1TB SSD'],
    specs: {
      Display: '14-inch WUXGA IPS (1920x1200) Low Blue Light',
      Processor: 'Intel Core i7-1365U vPro (13th Gen)',
      Memory: '32GB LPDDR5 RAM',
      Weight: '1.12 kg'
    },
    features: [
      'Ultra-light carbon-fiber top cover weighing just 2.48 pounds',
      'Military-grade tested (MIL-STD-810H) for extreme reliability and ruggedness',
      'Legendary ergonomic ThinkPad keyboard with iconic red TrackPoint nub',
      'Advanced biometric security including fingerprint reader and IR camera for face sign-in'
    ],
    reviews: [
      { id: 'rp7', author: 'Sarah L.', rating: 5, comment: 'Best laptop keyboard in existence. The light weight combined with 32GB RAM makes it the ultimate work machine.', date: '2026-05-02' }
    ]
  },
  {
    id: 'rog-zephyrus-g14',
    name: 'ASUS ROG Zephyrus G14 OLED Gaming Laptop',
    description: 'Immersive OLED gaming in a sleek, ultraportable form factor. Supercharged by an AMD Ryzen 9 processor and NVIDIA GeForce RTX 4070 graphics. Features a stunning 3K 120Hz ROG Nebula OLED display.',
    category: 'laptops',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80',
    originalPrice: 1999.99,
    salePrice: 1799.99,
    rating: 4.8,
    isBestSeller: true,
    isFeatured: false,
    stock: 6,
    colors: ['Eclipse Gray', 'Platinum White'],
    storages: ['1TB NVMe SSD'],
    specs: {
      Display: '14-inch 3K (2880x1800) OLED, 120Hz, 0.2ms response',
      Processor: 'AMD Ryzen 9 8945HS (8 Cores)',
      Graphics: 'NVIDIA GeForce RTX 4070 (8GB GDDR6)',
      Battery: '73Whrs with 100W Type-C fast charging'
    },
    features: [
      'ROG Nebula OLED display offers perfect blacks, stunning HDR, and 100% DCI-P3 colors',
      'Remarkably thin CNC aluminum chassis measuring just 1.59cm thick',
      'ROG Intelligent Cooling with liquid metal compound keeps temperatures in check silently',
      'Slash Lighting matrix on the lid for custom aesthetic patterns and battery indicators'
    ],
    reviews: [
      { id: 'rp8', author: 'Derek K.', rating: 5, comment: 'OLED screen is gorgeous, gaming performance is unbelievable for a laptop this compact. Highly recommended!', date: '2026-06-25' }
    ]
  },
  {
    id: 'hp-spectre-x360',
    name: 'HP Spectre x360 2-in-1, 14-inch OLED',
    description: 'The ultimate versatile convertible laptop. The 360-degree hinge allows you to transition between laptop, tent, and tablet modes seamlessly. Crafted with stunning gem-cut aluminum accents and a dazzling OLED touch display.',
    category: 'laptops',
    image: 'https://images.unsplash.com/photo-1522374305816-2269772ee31a?auto=format&fit=crop&w=600&q=80',
    originalPrice: 1599.99,
    salePrice: 1399.99,
    rating: 4.6,
    isBestSeller: false,
    isFeatured: true,
    stock: 10,
    colors: ['Nightfall Black', 'Slate Blue'],
    storages: ['512GB SSD', '1TB SSD'],
    specs: {
      Display: '14-inch 2.8K OLED Touchscreen, 360-degree hinge',
      Processor: 'Intel Core Ultra 7 155H (16 Cores)',
      Memory: '16GB LPDDR5x RAM',
      Stylus: 'HP Rechargeable MPP 2.0 Tilt Pen included'
    },
    features: [
      'Fascinating 2.8K OLED touch screen provides vibrant contrast and precise stylus inputs',
      'Intel Core Ultra chip brings dedicated AI processing (NPU) for smarter productivity',
      '9MP high-definition webcam with auto-framing and physical privacy shutter',
      'Sleek dual-chamber gem-cut design makes port routing and opening extremely natural'
    ],
    reviews: [
      { id: 'rp9', author: 'Laura S.', rating: 4.5, comment: 'Using it as a drawing canvas is amazing. The OLED panel looks gorgeous and it runs completely silent during normal workloads.', date: '2026-06-03' }
    ]
  },
  {
    id: 'surface-laptop-5',
    name: 'Microsoft Surface Laptop 5, 13.5-inch',
    description: 'Elegant, quiet, and fast. Built for multitasking with the perfect balance of sleek design, comfortable keyboard, touchscreen convenience, and exceptional battery life.',
    category: 'laptops',
    image: 'https://images.unsplash.com/photo-1496181130204-755241524eab?auto=format&fit=crop&w=600&q=80',
    originalPrice: 1199.99,
    salePrice: 999.99,
    rating: 4.4,
    isBestSeller: false,
    isFeatured: false,
    stock: 14,
    colors: ['Platinum Alcantara', 'Sage Green', 'Matte Black', 'Sandstone Gold'],
    storages: ['256GB SSD', '512GB SSD'],
    specs: {
      Display: '13.5-inch PixelSense Touchscreen, 3:2 Aspect Ratio',
      Processor: 'Intel Core i5-1235U (12th Gen)',
      Battery: 'Up to 18 hours of typical device usage',
      Ports: 'Thunderbolt 4, USB-A, Surface Connect, headphone jack'
    },
    features: [
      'Distinctive warm Alcantara keyboard deck offers an exceptionally cozy typing experience',
      'Vibrant PixelSense touchscreen supports interactive navigation and on-screen signing',
      'The classic 3:2 screen ratio displays more vertical text for easier reading and writing',
      'Dolby Vision IQ and Omnisonic speakers with Dolby Atmos for superior media viewing'
    ],
    reviews: [
      { id: 'rp10', author: 'Gregory B.', rating: 5, comment: 'The typing feel is absolute perfection, and the 3:2 aspect ratio is great for viewing office documents.', date: '2026-03-12' }
    ]
  },
  {
    id: 'bose-qc-ultra',
    name: 'Bose QuietComfort Ultra Wireless Headphones',
    description: 'World-class active noise canceling. Features Bose Immersive Audio that takes what you are hearing out of your head and places it in front of you for a more spacious, natural-sounding listening experience.',
    category: 'audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    originalPrice: 429.99,
    salePrice: 379.99,
    rating: 4.8,
    isBestSeller: true,
    isFeatured: true,
    stock: 22,
    colors: ['Black', 'White Smoke', 'Sandstone Gold'],
    specs: {
      ANCLevels: 'Customizable quiet, aware, and immersive modes',
      Battery: 'Up to 24 hours of playback (up to 18 hours with Immersive Audio)',
      Bluetooth: 'Bluetooth 5.3 with multipoint support'
    },
    features: [
      'Bose Immersive Audio creates a wide, spatial acoustic field that feels highly realistic',
      'CustomTune technology calibrates noise cancellation specifically to your ear canal shape',
      'Elevated luxurious materials with soft, pillowy cushions that hug your head gently',
      'Ultra-clear phone call quality using advanced wind-noise rejection microphones'
    ],
    reviews: [
      { id: 'rp11', author: 'Nadia P.', rating: 5, comment: 'Undoubtedly the most comfortable over-ear headphones I have ever worn. The noise cancellation is absolutely unmatched.', date: '2026-06-14' }
    ]
  },
  {
    id: 'sennheiser-m4',
    name: 'Sennheiser Momentum 4 Wireless',
    description: 'Audiophile-grade acoustic signature with an extraordinary 60-hour battery life. Features Sennheiser Signature Sound, customizable Equalizer presets, and Adaptive Noise Cancellation.',
    category: 'audio',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80',
    originalPrice: 349.99,
    salePrice: 279.99,
    rating: 4.7,
    isBestSeller: false,
    isFeatured: true,
    stock: 15,
    colors: ['Black', 'White', 'Denim Blue'],
    specs: {
      Drivers: '42mm dynamic speaker system',
      BatteryLife: 'Up to 60 hours via Bluetooth with ANC enabled',
      Codecs: 'aptX Adaptive, AAC, SBC'
    },
    features: [
      'Staggering 60-hour battery life ensures weeks of music without charging',
      '42mm dynamic transducers deliver outstanding high-fidelity sound quality',
      'Adaptive Hybrid ANC automatically adjusts to ambient surroundings',
      'Smart Pause automatically halts playback when headphones are removed'
    ],
    reviews: [
      { id: 'rp12', author: 'Daniel F.', rating: 5, comment: 'Soundstage is incredibly wide and detailed. Best of all, I only charge them once a month. Truly impressive.', date: '2026-05-22' }
    ]
  },
  {
    id: 'sony-wf-1000xm5',
    name: 'Sony WF-1000XM5 Noise Canceling Earbuds',
    description: 'The best noise-canceling earbuds on the market. Engineered with two high-performance processors, dual feedback microphones, and innovative noise-isolation earbud tips for an exceptionally quiet fit.',
    category: 'audio',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    originalPrice: 299.99,
    salePrice: 249.99,
    rating: 4.6,
    isBestSeller: false,
    isFeatured: true,
    stock: 25,
    colors: ['Black', 'Silver'],
    specs: {
      Processor: 'Sony Integrated Processor V2 + QN2e',
      Frequency: '20Hz - 40,000Hz (Hi-Res Audio Wireless)',
      Battery: 'Up to 8 hours (24 hours total with charging case)'
    },
    features: [
      'High-Resolution Audio Wireless with LDAC support for magnificent sound reproduction',
      'AI-based noise reduction algorithm and bone conduction sensors for ultra-clear calls',
      'Smaller and lighter design compared to previous generation for maximum ergonomic comfort',
      'Multipoint connection lets you pair with two Bluetooth devices simultaneously'
    ],
    reviews: [
      { id: 'rp13', author: 'Kevin L.', rating: 5, comment: 'Remarkably small footprint with massive sound. The foam tips seal perfectly, blocking everything.', date: '2026-06-05' }
    ]
  },
  {
    id: 'beats-studio-pro',
    name: 'Beats Studio Pro Premium Wireless Headphones',
    description: 'Fully re-engineered flagship headphones. Delivers rich, balanced audio with personalized Spatial Audio, advanced Active Noise Cancellation, and USB-C lossless audio integration.',
    category: 'audio',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    originalPrice: 349.99,
    salePrice: 249.99,
    rating: 4.4,
    isBestSeller: false,
    isFeatured: false,
    stock: 18,
    colors: ['Black', 'Deep Brown', 'Navy Blue', 'Sandstone'],
    specs: {
      Connectivity: 'Bluetooth Class 1, USB-C wired, 3.5mm analog input',
      Battery: 'Up to 40 hours total battery life (24 hours with ANC)',
      Lossless: 'High-fidelity lossless audio via USB-C'
    },
    features: [
      'Fully custom acoustic platform delivers high-fidelity sound with near-zero distortion',
      'One-touch pairing with fast seamless connectivity for both Apple and Android ecosystems',
      'Personalized Spatial Audio with dynamic head tracking places sound all around you',
      'Upgraded UltraPlush engineered leather cushions offer all-day comfortable wear'
    ],
    reviews: [
      { id: 'rp14', author: 'Jordan K.', rating: 4, comment: 'The USB-C lossless audio mode is fantastic while working at my desk, and battery life is stellar.', date: '2026-05-18' }
    ]
  },
  {
    id: 'apple-watch-s9',
    name: 'Apple Watch Series 9, GPS, 45mm',
    description: 'Smarter. Brighter. Mightier. Powered by the S9 SiP, which enables a super-bright display and a magical new way to quickly and easily use your Apple Watch without touching the screen.',
    category: 'wearables',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    originalPrice: 429.99,
    salePrice: 379.99,
    rating: 4.7,
    isBestSeller: true,
    isFeatured: false,
    stock: 20,
    colors: ['Midnight Aluminum', 'Starlight Aluminum', 'Silver Aluminum', 'Red Aluminum'],
    specs: {
      Display: 'Always-On Retina LTPO OLED, up to 2000 nits',
      CaseSize: '45mm aluminum',
      Battery: 'Up to 18 hours (up to 36 hours in Low Power Mode)'
    },
    features: [
      'Double tap gesture lets you answer calls, pause music, and more without touching the screen',
      'Advanced health sensors provide deeper insights into physical and mental well-being',
      'Crash Detection and Fall Detection can automatically connect you to emergency services',
      'Now carbon neutral in select watch and band combinations'
    ],
    reviews: [
      { id: 'rp15', author: 'Tiffany S.', rating: 5, comment: 'Double tap gesture is extremely useful when carrying groceries. Screen is incredibly bright and clear.', date: '2026-04-20' }
    ]
  },
  {
    id: 'garmin-fenix-7',
    name: 'Garmin Fenix 7X Pro Sapphire Solar',
    description: 'The ultimate multisport GPS watch. Featuring a large solar-charged display, built-in LED flashlight, advanced training metrics, and robust navigational mapping for off-grid durability.',
    category: 'wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    originalPrice: 899.99,
    salePrice: 799.99,
    rating: 4.8,
    isBestSeller: false,
    isFeatured: true,
    stock: 8,
    colors: ['Carbon Gray Titanium', 'Titanium Silver'],
    specs: {
      Display: '1.4-inch Sunlight-Visible Transflective Memory-in-pixel (MIP) Solar',
      WaterRating: '10 ATM (100 meters)',
      BatteryLife: 'Up to 37 days in smartwatch mode with solar charging'
    },
    features: [
      'Sapphire solar charging lens uses sunlight to extend battery life for weeks in the wild',
      'Built-in multi-LED flashlight with adjustable strobe intensities and red safety light',
      'Preloaded TopoActive maps, ski resort maps, and golf courses with multi-band GPS positioning',
      '24/7 health tracking including heart rate, Pulse Ox, sleep scores, and training readiness'
    ],
    reviews: [
      { id: 'rp16', author: 'Travis M.', rating: 5, comment: 'The battery literally lasts a month. Maps are incredibly detailed. Flashlight is a lifesaver for early running.', date: '2026-06-21' }
    ]
  },
  {
    id: 'galaxy-watch-6',
    name: 'Samsung Galaxy Watch6 Classic, 47mm',
    description: 'The return of the iconic rotating bezel. Keep track of your health, workouts, and sleep quality on a larger, brighter screen wrapped in high-strength stainless steel.',
    category: 'wearables',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80',
    originalPrice: 429.99,
    salePrice: 359.99,
    rating: 4.5,
    isBestSeller: false,
    isFeatured: false,
    stock: 15,
    colors: ['Black Stainless Steel', 'Silver Stainless Steel'],
    specs: {
      Display: '1.5-inch Super AMOLED, Sapphire Crystal, 2000 nits',
      Processor: 'Exynos W930 (Dual-Core, 1.4GHz)',
      Sensors: 'BioActive Sensor, Temperature, Barometer, Gyro'
    },
    features: [
      'Interactive physical rotating bezel lets you cycle through apps smoothly and reliably',
      'Advanced sleep coaching helps you build better sleep habits and analyze deep cycles',
      'Body composition analyzer calculates skeletal muscle, water weight, and fat mass instantly',
      'Sleek classic circular design looks wonderful both at the gym and in formal meetings'
    ],
    reviews: [
      { id: 'rp17', author: 'Justin O.', rating: 4, comment: 'The rotating bezel feels so satisfying to use, and sleep tracking is highly detailed and helpful.', date: '2026-05-15' }
    ]
  },
  {
    id: 'fitbit-charge-6',
    name: 'Fitbit Charge 6 Fitness Tracker',
    description: 'Give your routine a boost. Features built-in GPS, continuous heart rate tracking, personalized Sleep Score, EDA stress detection, and built-in Google essentials like Maps and Wallet.',
    category: 'wearables',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80',
    originalPrice: 159.99,
    salePrice: 129.99,
    rating: 4.3,
    isBestSeller: false,
    isFeatured: false,
    stock: 25,
    colors: ['Obsidian Black', 'Porcelain White', 'Coral Red'],
    specs: {
      Battery: 'Up to 7 days of battery life',
      Sensors: 'Built-in GPS, 3-axis accelerometer, optical heart rate, skin temperature'
    },
    features: [
      'Continuously tracks your heart rate with Fitbits most accurate tracker sensor yet',
      'Built-in GPS lets you see pace and distance during outdoor runs without carrying a phone',
      'Google Maps and Google Wallet integration for easy navigation and contactless payments',
      'Includes 6 months of Fitbit Premium for advanced sleep scores and daily readiness reports'
    ],
    reviews: [
      { id: 'rp18', author: 'Clara E.', rating: 5, comment: 'Perfect lightweight alternative to a bulky smartwatch. Heart rate is very accurate during cardio.', date: '2026-06-11' }
    ]
  },
  {
    id: 'anker-prime-bank',
    name: 'Anker Prime 20,000mAh Power Bank (200W)',
    description: 'Ultra-high capacity portable power. Equipped with 2 USB-C ports and 1 USB-A port to charge up to 3 devices simultaneously at a blistering 200W combined output. Features an intelligent smart digital display.',
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=600&q=80',
    originalPrice: 129.99,
    salePrice: 109.99,
    rating: 4.8,
    isBestSeller: true,
    isFeatured: true,
    stock: 35,
    colors: ['Space Gray'],
    specs: {
      Capacity: '20,000 mAh',
      Ports: '2x USB-C, 1x USB-A',
      MaxOutput: '100W max per USB-C port, 200W total combined',
      RechargeTime: 'Full recharge in just 75 mins via 100W input'
    },
    features: [
      'Vibrant smart digital display shows real-time input power, output power, and battery charge percentage',
      'Ultra-compact design fits easily in backpacks, carrying enough charge to juice up a MacBook Pro 1.5 times',
      'ActiveShield 2.0 temperature monitoring safeguards connected devices against overheating',
      'Supports trickle-charging mode for low-power accessories like wireless earbuds and fitness trackers'
    ],
    reviews: [
      { id: 'rp19', author: 'Brandon H.', rating: 5, comment: 'Absolutely phenomenal power bank. The display is super informative and it charges my laptop at full speed.', date: '2026-06-28' }
    ]
  },
  {
    id: 'apple-magsafe-duo',
    name: 'Apple MagSafe Duo Charger, White',
    description: 'Conveniently charge your compatible iPhone, Apple Watch, Wireless Charging Case for AirPods, and other Qi-certified devices. Just place your devices on the charger and a steady, efficient charge begins on contact.',
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=600&q=80',
    originalPrice: 129.99,
    salePrice: 119.99,
    rating: 4.5,
    isBestSeller: false,
    isFeatured: false,
    stock: 18,
    colors: ['White'],
    specs: {
      ConnectorType: 'USB-C to Lightning cable (included)',
      Power: 'Up to 14W wireless charging with 27W+ adapter',
      FormFactor: 'Foldable travel-friendly design'
    },
    features: [
      'Folds together neatly so you can easily take it with you wherever you travel',
      'Compatible with magsafe iPhone cases for reliable, automated snap alignment',
      'Apple Watch charging puck flips up to charge in nightstand mode or lay flat',
      'Provides safe, optimal power management to protect device battery longevity'
    ],
    reviews: [
      { id: 'rp20', author: 'Rebecca M.', rating: 4, comment: 'The ultimate travel companion. Folds beautifully and powers both watch and phone with one outlet.', date: '2026-05-14' }
    ]
  }
];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map(p => {
  const minVal = 109.99;
  const maxVal = 3499.99;
  const scale = (val: number) => {
    const scaled = 1000 + ((val - minVal) / (maxVal - minVal)) * 3000;
    return Math.round(scaled * 100) / 100;
  };
  return {
    ...p,
    originalPrice: scale(p.originalPrice),
    salePrice: scale(p.salePrice)
  };
});
