export const LAUNDRY_BRANCHES = [
  {
    id: 'branch-1',
    name: 'Laundry Express - Tan Binh',
    address: '83/41, Pham Van Bach, Ward 15, Tan Binh Dist, HCMC',
    mapLink: 'https://www.google.com/maps/place/Tan+Binh+Dist,+HCMC',
  },
  {
    id: 'branch-2',
    name: 'Laundry Express - Dist 1',
    address: '123, Le Loi Street, Ben Thanh Ward, Dist 1, HCMC',
    mapLink: 'https://www.google.com/maps/place/BEN+THANH+MARKET',
  },
  {
    id: 'branch-3',
    name: 'Laundry Express - Dist 3',
    address: '45, Vo Van Tan, Ward 6, Dist 3, HCMC',
    mapLink: 'https://www.google.com/maps/place/District+3,+HCMC',
  },
]

export const LAUNDRY_SERVICES = [
  {
    _id: 'service-1',
    nameKey: 'laundry.washDry', // We'll add this to language file if needed or use static
    name: 'Wash & Dry',
    price: 15000,
    unit: 'kg',
  },
  {
    _id: 'service-2',
    nameKey: 'laundry.washDryFold',
    name: 'Wash, Dry & Fold',
    price: 20000,
    unit: 'kg',
  },
  {
    _id: 'service-3',
    nameKey: 'laundry.dryCleaning',
    name: 'Dry Cleaning',
    price: 35000,
    unit: 'item',
  },
]
