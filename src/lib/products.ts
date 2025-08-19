export type PriceOption = {
  code: string // e.g., TWIN, SINGLE, TRIPLE
  label: string
  pricePerPerson: number // in USD for simplicity
}

export type ItineraryDay = {
  day: number
  title: string
  description: string
}

export type DetailedProduct = {
  id: string
  title: string
  subtitle?: string
  tags: string[]
  heroImage: string
  images: string[] // thumbnails
  highlights: string[]
  routeMapImage?: string
  priceOptions: PriceOption[]
  itinerary: ItineraryDay[]
  accommodations: string[]
  inclusions: string[]
  exclusions: string[]
  optionalTours: string[]
  countryInfo: string[]
  bookingConditions: string[]
}

const PRODUCTS: DetailedProduct[] = [
  {
    id: 'kr-001',
    title: 'Korea Spring Blossom 5D4N',
    subtitle: 'Seoul · Nami Island · Everland',
    tags: ['Group Tour', 'Korea', 'Spring'],
    heroImage: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop'
    ],
    highlights: [
      'Nami Island cherry blossoms',
      'Everland theme park day pass',
      'Local Korean BBQ experience'
    ],
    routeMapImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
    priceOptions: [
      { code: 'TWIN', label: 'Twin', pricePerPerson: 899 },
      { code: 'SINGLE', label: 'Single', pricePerPerson: 1099 },
      { code: 'TRIPLE', label: 'Triple', pricePerPerson: 849 }
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Seoul', description: 'Meet and greet, transfer to hotel, leisure time in Myeongdong.' },
      { day: 2, title: 'Nami Island & Petite France', description: 'Full-day tour with scenic walks and cultural sites.' },
      { day: 3, title: 'Everland Theme Park', description: 'Enjoy rides, zoo, and T-Express roller coaster.' },
      { day: 4, title: 'Seoul City Tour', description: 'Gyeongbokgung, Bukchon Hanok Village, Insadong shopping.' },
      { day: 5, title: 'Departure', description: 'Free time until airport transfer.' }
    ],
    accommodations: [
      '4N at 4-star city hotel (Seoul) or similar',
      'Daily breakfast included'
    ],
    inclusions: [
      'Roundtrip airport transfers',
      'Tours and admissions as per itinerary',
      'English-speaking guide',
      'Travel insurance (basic)'
    ],
    exclusions: [
      'Personal expenses',
      'Tips for guide and driver',
      'Visa fees (if applicable)'
    ],
    optionalTours: [
      'Han River night cruise',
      'N Seoul Tower observatory tickets'
    ],
    countryInfo: [
      'Passport must be valid for at least 6 months beyond intended stay.',
      'Visa not required for PH passport holders for Korea (K-ETA may apply).'
    ],
    bookingConditions: [
      'Prices are per person based on twin sharing.',
      'Taxes and other charges are not included unless specified.'
    ]
  },
  {
    id: 'jp-001',
    title: 'Japan Autumn 6D5N',
    subtitle: 'Tokyo · Mt. Fuji · Kyoto',
    tags: ['Free & Easy', 'Japan', 'Autumn'],
    heroImage: 'https://images.unsplash.com/photo-1549693578-d683be217e58?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop'
    ],
    highlights: ['Mt. Fuji scenic spots', 'Fushimi Inari shrine', 'Kyoto geisha district'],
    priceOptions: [
      { code: 'TWIN', label: 'Twin', pricePerPerson: 1099 },
      { code: 'SINGLE', label: 'Single', pricePerPerson: 1299 },
      { code: 'TRIPLE', label: 'Triple', pricePerPerson: 999 }
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Tokyo', description: 'Transfer to hotel, Shibuya crossing walk.' },
      { day: 2, title: 'Mt. Fuji & Hakone', description: 'Lake Ashi cruise and Owakudani valley.' },
      { day: 3, title: 'Kyoto Day Trip', description: 'Fushimi Inari and Gion district.' },
      { day: 4, title: 'Tokyo City Tour', description: 'Asakusa, Senso-ji, Akihabara.' },
      { day: 5, title: 'Free Day', description: 'Optional Disney/USJ or shopping.' },
      { day: 6, title: 'Departure', description: 'Airport transfer.' }
    ],
    accommodations: ['5N at 4-star hotels or similar'],
    inclusions: ['Airport transfers', 'Selected tours', 'Insurance (basic)'],
    exclusions: ['Personal expenses', 'Tips', 'Visa fees if any'],
    optionalTours: ['Tokyo Disney Resort', 'TeamLab Planets entry'],
    countryInfo: ['Passport validity 6+ months.', 'Visa policy depends on nationality.'],
    bookingConditions: ['Per person pricing based on sharing.', 'Taxes not included unless stated.']
  }
]

export function getProductById(id: string): DetailedProduct | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getAllProducts(): DetailedProduct[] {
  return PRODUCTS
}






