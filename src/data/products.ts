import { Product } from '../types';

export const BRANDS = ['Nike', 'Adidas', 'New Balance', 'Puma', 'Jordan', 'Reebok', 'Timberland'];
export const CATEGORIES = ['Running', 'Casual', 'Formal', 'Sports', 'Sneakers', 'Kids'];
export const SIZES = [4, 5, 6, 7, 8, 9, 10, 11, 12];
export const COLORS = [
  { name: 'Red', hex: '#EF4444' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Green', hex: '#10B981' },
  { name: 'Black', hex: '#111827' },
  { name: 'White', hex: '#F9FAFB' },
  { name: 'Orange', hex: '#F97316' },
  { name: 'Gray', hex: '#6B7280' },
  { name: 'Brown', hex: '#78350F' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Air Max Edge Prime',
    brand: 'Nike',
    price: 150,
    discountPrice: 120,
    rating: 4.8,
    reviewsCount: 142,
    category: 'Running',
    gender: 'Men',
    sizes: [7, 8, 9, 10, 11],
    colors: [
      { name: 'Black', hex: '#111827' },
      { name: 'Orange', hex: '#F97316' },
      { name: 'White', hex: '#F9FAFB' }
    ],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Experience unparalleled cushioning and dynamic energy response with the iconic Air Max Edge Prime. Engineered with breathable woven mesh and a semi-translucent Air cushion unit, these shoes keep your stride natural and stylish.',
    features: ['Woven mesh upper for maximum breathability', 'Signature Air unit in heel for impact cushioning', 'Durable waffle traction outsole', 'Padded collar and supportive lock-fit lacing'],
    featured: true,
    bestSeller: true,
    stock: 12
  },
  {
    id: 'prod-2',
    name: 'Ultraboost Sonic Wave',
    brand: 'Adidas',
    price: 180,
    rating: 4.9,
    reviewsCount: 218,
    category: 'Running',
    gender: 'Men',
    sizes: [8, 9, 10, 11, 12],
    colors: [
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Gray', hex: '#6B7280' },
      { name: 'Blue', hex: '#3B82F6' }
    ],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'The legendary Boost cushioning gives you maximum energy return in every step. Form-fitting Primeknit wraps the foot in secure, adaptive comfort while driving you forward on long runs or busy city days.',
    features: ['Proprietary Boost midsole unit', 'Continental™ Rubber outsole for superior wet and dry grip', 'Primeknit upper for sock-like targeted support', 'Stabilizing Torsion System'],
    newArrival: true,
    stock: 18
  },
  {
    id: 'prod-3',
    name: 'Classic Club Leather',
    brand: 'Reebok',
    price: 85,
    discountPrice: 65,
    rating: 4.5,
    reviewsCount: 94,
    category: 'Casual',
    gender: 'Unisex',
    sizes: [6, 7, 8, 9, 10, 11],
    colors: [
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Gray', hex: '#6B7280' }
    ],
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Timeless courtroom style updated for your everyday aesthetic. These classic low-top leather shoes deliver soft, premium feels and a highly versatile style footprint that pairs easily with denims or joggers.',
    features: ['Soft garment leather upper', 'Die-cut EVA midsole for lightweight comfort', 'Molded sockliner for internal comfort', 'High-abrasion rubber outsole'],
    newArrival: false,
    stock: 25
  },
  {
    id: 'prod-4',
    name: 'Retro Legend Crimson',
    brand: 'Jordan',
    price: 210,
    rating: 4.9,
    reviewsCount: 312,
    category: 'Sneakers',
    gender: 'Men',
    sizes: [8, 9, 10, 11, 12],
    colors: [
      { name: 'Red', hex: '#EF4444' },
      { name: 'Black', hex: '#111827' },
      { name: 'White', hex: '#F9FAFB' }
    ],
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Bring the court legacy straight to the streets. Features bold block coloring, full grain leather panels, and the vintage ankle collar wrap optimized to offer lasting support and iconic design credentials.',
    features: ['Full-grain leather and synthetic premium panels', 'Encapsulated Air-Sole unit in front', 'Solid rubber outsole with deep flex grooves', 'Embossed designer branding details'],
    featured: true,
    bestSeller: true,
    stock: 6
  },
  {
    id: 'prod-5',
    name: 'Urban Glide 327',
    brand: 'New Balance',
    price: 110,
    rating: 4.7,
    reviewsCount: 167,
    category: 'Sneakers',
    gender: 'Women',
    sizes: [5, 6, 7, 8, 9],
    colors: [
      { name: 'Gray', hex: '#6B7280' },
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Blue', hex: '#3B82F6' }
    ],
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Throwback design language meets high-impact lifestyle vibes. The 327 sheds light on the 1970s heritage with a bold oversized N logo, retro canvas overlays, and an adventurous trail-inspired studded rubber sole.',
    features: ['Oversized, asymmetrical branding', 'Heritage-minded wedge foam midsole', 'Trail-inspired wrapped studded wrap outsole', 'Suede and breathable nylon mesh upper'],
    newArrival: true,
    stock: 14
  },
  {
    id: 'prod-6',
    name: 'Nitro Nitro Charge',
    brand: 'Puma',
    price: 130,
    discountPrice: 95,
    rating: 4.6,
    reviewsCount: 82,
    category: 'Running',
    gender: 'Women',
    sizes: [5, 6, 7, 8, 9],
    colors: [
      { name: 'Orange', hex: '#F97316' },
      { name: 'Black', hex: '#111827' }
    ],
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Lightweight performance engineered specifically to keep you moving faster. Featuring Nitrogen-infused NITRO foam cushioning, a customizable fit system, and durable PumaGrip outsole technology.',
    features: ['NITRO foam: Advanced nitrogen-infused lightweight foam', 'PUMAGRIP: Durable performance rubber compound', 'Breathable engineered monofilament mesh', 'Heel TPU piece for added lock down'],
    featured: false,
    stock: 15
  },
  {
    id: 'prod-7',
    name: 'Elite Waterproof Boot',
    brand: 'Timberland',
    price: 190,
    rating: 4.8,
    reviewsCount: 254,
    category: 'Formal',
    gender: 'Men',
    sizes: [8, 9, 10, 11, 12],
    colors: [
      { name: 'Brown', hex: '#78350F' },
      { name: 'Black', hex: '#111827' }
    ],
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Constructed from premium nubuck leather and fully seams-sealed waterproof protection, this iconic rugged boot maintains luxury dapper elegance during office transits and wet, chilly weekend getaways.',
    features: ['Premium full grain leather and nubuck', 'Waterproof seam-sealed construction', 'Rustproof rust-free hardware buckles', 'Padded leather cuffs for comforting fits'],
    featured: true,
    stock: 9
  },
  {
    id: 'prod-8',
    name: 'Junior Sonic Racer',
    brand: 'Adidas',
    price: 65,
    discountPrice: 49,
    rating: 4.4,
    reviewsCount: 52,
    category: 'Kids',
    gender: 'Kids',
    sizes: [4, 5, 6],
    colors: [
      { name: 'Blue', hex: '#3B82F6' },
      { name: 'Red', hex: '#EF4444' }
    ],
    images: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Easy-on active shoes designed for non-stop kids. Equipped with lightweight shock-absorbing soles, standard velcro support bands, and flexible mesh to make learning, running, and playing effortless.',
    features: ['Hook and loop wrap strap closures', 'Flexible breathable synthetic mesh upper', 'Non-marking traction rubber outsole', 'Lightweight EVA foam midsole'],
    bestSeller: true,
    stock: 30
  },
  {
    id: 'prod-9',
    name: 'Venture Trail Pro',
    brand: 'New Balance',
    price: 140,
    rating: 4.7,
    reviewsCount: 112,
    category: 'Sports',
    gender: 'Men',
    sizes: [7, 8, 9, 10, 11, 12],
    colors: [
      { name: 'Gray', hex: '#6B7280' },
      { name: 'Green', hex: '#10B981' },
      { name: 'Black', hex: '#111827' }
    ],
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Conquer the rugged wilderness in comfort. Engineered with Fresh Foam technology for ultra-plush cushioning on uneven terrains, and a Vibram® Megagrip outsole to resist slips on steep muddy hills.',
    features: ['Vibram® Megagrip protective lug system', 'Fresh Foam cushioned responsive midsole', 'Reinforced toe protect shield wrap', 'Synthetic mesh with protective overlays'],
    newArrival: true,
    stock: 10
  },
  {
    id: 'prod-10',
    name: 'Air Force Classic ' + 82,
    brand: 'Nike',
    price: 115,
    rating: 4.9,
    reviewsCount: 452,
    category: 'Sneakers',
    gender: 'Unisex',
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: [
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Black', hex: '#111827' }
    ],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'The radiator of court culture is immortalized. Built with crisp leather trims, reliable contrast stitching, and standard air damping pods, this streetwear essential stays incredibly cushy and sleek.',
    features: ['Crisp overlays and full grain leather', 'Nike Air cushioning unit in midfoot', 'Low-cut, padded collar wraps cleanly', 'Iconic circular traction pivot ring'],
    bestSeller: true,
    stock: 22
  },
  {
    id: 'prod-11',
    name: 'Apex Runner Carbon',
    brand: 'Puma',
    price: 240,
    discountPrice: 199,
    rating: 4.8,
    reviewsCount: 74,
    category: 'Running',
    gender: 'Men',
    sizes: [8, 9, 10, 11],
    colors: [
      { name: 'Red', hex: '#EF4444' },
      { name: 'Black', hex: '#111827' }
    ],
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Gain ultimate speed advantage with our dynamic carbon plate racer. Armed with NITRO Elite responsive formulation and rigid PWRPLATE carbon fiber, you will snap through road race standards with energetic ease.',
    features: ['PWRPLATE Carbon fiber plate maximizes propulsion', 'NITRO Elite premier fuel cushion tech', 'PumaGrip lightweight road contact pattern', 'Micro-mesh hyper thin breathable fabric'],
    newArrival: true,
    stock: 5
  },
  {
    id: 'prod-12',
    name: 'Cap Toe Oxford Elite',
    brand: 'Reebok',
    price: 135,
    rating: 4.6,
    reviewsCount: 41,
    category: 'Formal',
    gender: 'Men',
    sizes: [8, 9, 10, 11, 12],
    colors: [
      { name: 'Black', hex: '#111827' },
      { name: 'Brown', hex: '#78350F' }
    ],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Seamlessly blend classic formal heritage with anatomical dynamic fit comfort. Perfect for boardrooms, keynotes, and black-tie banquets. Its sleek hand-brushed finish guarantees dapper style statements.',
    features: ['Full-grain burnished box leather', 'Anatomical responsive orthotic support inserts', 'Reinforced stitch Goodyear-style welt', 'Non-skid dynamic traction underfoot'],
    stock: 14
  },
  {
    id: 'prod-13',
    name: 'Suede Icon Classic',
    brand: 'Puma',
    price: 75,
    rating: 4.6,
    reviewsCount: 189,
    category: 'Casual',
    gender: 'Unisex',
    sizes: [5, 6, 7, 8, 9, 10, 11],
    colors: [
      { name: 'Blue', hex: '#3B82F6' },
      { name: 'Gray', hex: '#6B7280' },
      { name: 'Red', hex: '#EF4444' }
    ],
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'The core profile of cultural street cred. From full on athletic origins to becoming a staple of b-boy lifestyle, this rich brushed-suede sneaker maintains low-profile comfort and maximum retro points.',
    features: ['Full silky suede calfskin upper', 'Synthetic dynamic arch pillow inserts', 'Waffle grip classic white rubber bottom', 'Gold metallic branding text accentuation'],
    bestSeller: false,
    stock: 19
  },
  {
    id: 'prod-14',
    name: 'Kids Mini Boost Run',
    brand: 'Adidas',
    price: 70,
    discountPrice: 55,
    rating: 4.5,
    reviewsCount: 39,
    category: 'Kids',
    gender: 'Kids',
    sizes: [4, 5, 6],
    colors: [
      { name: 'Black', hex: '#111827' },
      { name: 'Orange', hex: '#F97316' }
    ],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Designed specifically for healthy energetic action. A super-supportive mesh bounds around little feet perfectly, while a grippy flexible rubber outsole prevents falls on field playgrounds or slippery indoor gyms.',
    features: ['Quick-lace elastic loop strap setup', 'Plush bouncy cloud foam padding', 'Anti-stink internal microfiber technology', 'Ultra-dense rubber heel bumpers'],
    newArrival: true,
    stock: 11
  },
  {
    id: 'prod-15',
    name: 'Cortez Origin Retro',
    brand: 'Nike',
    price: 90,
    rating: 4.7,
    reviewsCount: 161,
    category: 'Casual',
    gender: 'Women',
    sizes: [5, 6, 7, 8, 9],
    colors: [
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Red', hex: '#EF4444' }
    ],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Step into history with the shoe that launched Nike into global super-stardom. Distinctive side stripe, soft nylon mesh or premium leather, and the wedge-shaped foam midsole that revolutionized all-day walking comfort.',
    features: ['Inspired by the 1972 running icon', 'Herringbone tread pattern for excellent grip', 'Classic wedge foam heel insert', 'Soft-touch suede overlay components'],
    featured: false,
    stock: 14
  },
  {
    id: 'prod-16',
    name: 'Court Star Classic',
    brand: 'Puma',
    price: 80,
    discountPrice: 60,
    rating: 4.4,
    reviewsCount: 48,
    category: 'Sports',
    gender: 'Unisex',
    sizes: [6, 7, 8, 9, 10, 11],
    colors: [
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Green', hex: '#10B981' }
    ],
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Clean lines, perforated stripes, and a retro low-profile tennis court build that works off-court as well. The simple minimalist silhouette is elevated by subtle gold-foil detailing.',
    features: ['Eco-friendly durable premium leather', 'Cushioned foam sockliner comfort', 'Embossed gold foil logos and text', 'Flexible solid white vulcanized cupsole'],
    bestSeller: false,
    stock: 15
  },
  {
    id: 'prod-17',
    name: 'Rugged Nomad Hiking Shoe',
    brand: 'Timberland',
    price: 150,
    rating: 4.7,
    reviewsCount: 93,
    category: 'Sports',
    gender: 'Men',
    sizes: [7, 8, 9, 10, 11, 12],
    colors: [
      { name: 'Brown', hex: '#78350F' },
      { name: 'Gray', hex: '#6B7280' }
    ],
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Erase boundaries with Timberlands highest-performance fast trail shoe. Designed using eco-conscious and recycled materials, this all-terrain powerhouse delivers water resistance and deep multi-directional lugs.',
    features: ['TimberDry™ internal waterproof boot membrane', 'ReBOTL™ fabric lining wrapping inner foot', 'Compressed EVA foam midsole', 'Gripstick™ strong traction rubber lugs'],
    newArrival: true,
    stock: 8
  },
  {
    id: 'prod-18',
    name: 'Air Zoom Flight Pro',
    brand: 'Nike',
    price: 160,
    rating: 4.8,
    reviewsCount: 135,
    category: 'Sports',
    gender: 'Men',
    sizes: [7, 8, 9, 10, 11, 12],
    colors: [
      { name: 'Red', hex: '#EF4444' },
      { name: 'Green', hex: '#10B981' },
      { name: 'Black', hex: '#111827' }
    ],
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'High flying basketball innovation modernized with sleek aesthetic detailing. Zoom Air capsule pods redirect jumping energy effortlessly while the side support TPU stabilizes fast crossover maneuvers.',
    features: ['Zoom Air units responsive damping', 'Hyper-sturdy synthetic knit upper framework', 'Multi-directional wave traction pattern', 'External heel stabilizing counter'],
    featured: true,
    stock: 12
  },
  {
    id: 'prod-19',
    name: 'Monk Strap Classic',
    brand: 'Timberland',
    price: 170,
    discountPrice: 140,
    rating: 4.5,
    reviewsCount: 33,
    category: 'Formal',
    gender: 'Men',
    sizes: [8, 9, 10, 11, 12],
    colors: [
      { name: 'Brown', hex: '#78350F' },
      { name: 'Black', hex: '#111827' }
    ],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Elevated luxury formal shoes constructed with dual shiny brass buckles. A modern tapered square toe and rich tanned finish make it perfect for weddings, galas, and professional standouts.',
    features: ['Premium heavy grain calf leather', 'Double polished brass monk straps', 'Cushioned foam midsole with arch bolster', 'High-wear composite anti-slip outsole'],
    stock: 9
  },
  {
    id: 'prod-20',
    name: 'Kids Supercourt Play',
    brand: 'Reebok',
    price: 55,
    rating: 4.4,
    reviewsCount: 28,
    category: 'Kids',
    gender: 'Kids',
    sizes: [4, 5, 6],
    colors: [
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Blue', hex: '#3B82F6' }
    ],
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Retro tennis style engineered for energetic juniors. Supportive leather upper, lightweight composite rubber base, and dual adhesive hook-loop straps make this shoe easy for kids to wear on their own.',
    features: ['Dual hook and loop elastic speed closure', 'Padded leather tongue and inside collar', 'Toe cap bumper extension for durability', 'Removable anti-microbial clean sockliner'],
    stock: 20
  },
  {
    id: 'prod-21',
    name: 'NMD Grid Walker',
    brand: 'Adidas',
    price: 140,
    discountPrice: 115,
    rating: 4.7,
    reviewsCount: 198,
    category: 'Sneakers',
    gender: 'Unisex',
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: [
      { name: 'Black', hex: '#111827' },
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Red', hex: '#EF4444' }
    ],
    images: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Explore the urban landscape with streamlined retro-futurism. Combining stretch-knit sock uppers, responsive Boost cushioning, and signature visual foam bricks that lock your feet in pure comfort.',
    features: ['Sock-like stretch woven mesh wrap', 'Bouncy responsive Boost cushioning midsole', 'Bold midsole EVA plug details', 'Rugged heel pulls for easy slip-on'],
    featured: true,
    stock: 14
  },
  {
    id: 'prod-22',
    name: 'Derby Casual Comfort',
    brand: 'Reebok',
    price: 95,
    rating: 4.5,
    reviewsCount: 37,
    category: 'Casual',
    gender: 'Men',
    sizes: [7, 8, 9, 10, 11, 12],
    colors: [
      { name: 'Gray', hex: '#6B7280' },
      { name: 'Brown', hex: '#78350F' }
    ],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Simple clean-finished style featuring soft water-resistant canvas suede trim. These shoes are perfect for dynamic multi-hyphenates who require ease and dressy comfort in casual office environments.',
    features: ['Brushed split-suede upper paneling', 'Flexible lightweight injection-molded sole', 'Ortholite anatomical shape memory foam', 'Low flat profile standard style'],
    newArrival: false,
    stock: 16
  },
  {
    id: 'prod-23',
    name: 'Swift Run Racer',
    brand: 'Adidas',
    price: 95,
    discountPrice: 75,
    rating: 4.6,
    reviewsCount: 115,
    category: 'Running',
    gender: 'Women',
    sizes: [5, 6, 7, 8, 9],
    colors: [
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Gray', hex: '#6B7280' }
    ],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'An everyday knit shoe inspired by archival retro runner styles. Form-fitting comfort, lightweight embroidery detail accents, and cloud-soft foam midsole that makes standing or running feel like walking in air.',
    features: ['Sturdy stretch knit slip construction', 'Aesthetic embroidered vamp line stitching', 'Lightweight compression EVA midsole cushioning', 'Sock-like snug dynamic wrap'],
    stock: 18
  },
  {
    id: 'prod-24',
    name: 'Terrain Ranger Mid',
    brand: 'New Balance',
    price: 130,
    rating: 4.8,
    reviewsCount: 88,
    category: 'Sports',
    gender: 'Women',
    sizes: [5, 6, 7, 8, 9],
    colors: [
      { name: 'Green', hex: '#10B981' },
      { name: 'Gray', hex: '#6B7280' },
      { name: 'Black', hex: '#111827' }
    ],
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Designed specifically to help women tackle ambitious peaks in confidence. Equipped with extra midfoot high support walls, water protection lining, and highly reactive heel foam.',
    features: ['Heel AT-Tread durable dual-sport pattern', 'Gore-Tex waterproof barrier membrane', 'Dual-density support midsole wedge', 'Premium reinforced speed-lace loops'],
    newArrival: true,
    stock: 12
  }
];
