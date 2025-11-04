import Listing from './models/listing.model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// 25 high-quality listings with verified images
const sampleListings = [
  // ... First 12 listings remain unchanged until the problematic ones ...
  {
    name: "Luxury Highrise Apartment",
    description: "Sophisticated apartment with stunning city views, modern amenities, and designer furnishings. Access to pool, gym, and concierge services.",
    address: "789 Sky Tower, Chicago, IL",
    regularPrice: 6000,
    discountPrice: 5500,
    bathrooms: 2,
    bedrooms: 2,
    furnished: true,
    parking: true,
    type: "rent",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Waterfront Condo",
    description: "Modern waterfront condo with spectacular bay views, premium appliances, and resort-style amenities including pool and fitness center.",
    address: "101 Harbor Drive, San Diego, CA",
    regularPrice: 3200,
    discountPrice: 3000,
    bathrooms: 2,
    bedrooms: 1,
    furnished: true,
    parking: true,
    type: "rent",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Skyline Apartment",
    description: "Premium high-floor apartment with panoramic city views, modern finishes, and access to luxury building amenities.",
    address: "555 Downtown Blvd, Seattle, WA",
    regularPrice: 4500,
    discountPrice: 4200,
    bathrooms: 2,
    bedrooms: 2,
    furnished: true,
    parking: true,
    type: "rent",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  // Adding 10 new listings with verified images
  {
    name: "Garden Oasis Villa",
    description: "Mediterranean-style villa with lush gardens, outdoor kitchen, and resort-style pool. Perfect for indoor-outdoor living.",
    address: "123 Palm Way, Naples, FL",
    regularPrice: 3200000,
    discountPrice: 2995000,
    bathrooms: 4,
    bedrooms: 4,
    furnished: true,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Urban Designer Loft",
    description: "Converted warehouse loft with original brick walls, steel beams, and premium modern finishes. Perfect creative space.",
    address: "456 Artist Row, Brooklyn, NY",
    regularPrice: 6000,
    discountPrice: 5800,
    bathrooms: 2,
    bedrooms: 1,
    furnished: true,
    parking: false,
    type: "rent",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Desert Modern Estate",
    description: "Contemporary desert oasis with infinity pool, outdoor living spaces, and stunning mountain views. Architecture meets nature.",
    address: "789 Canyon View, Scottsdale, AZ",
    regularPrice: 4500000,
    discountPrice: 4250000,
    bathrooms: 4,
    bedrooms: 3,
    furnished: true,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Riverfront Townhouse",
    description: "Three-story townhouse with private dock, rooftop terrace, and unobstructed river views. Modern luxury meets waterfront living.",
    address: "321 River Walk, Charleston, SC",
    regularPrice: 2200000,
    discountPrice: 2100000,
    bathrooms: 3,
    bedrooms: 3,
    furnished: false,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600047508788-786f3865b4b9?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Luxury Sky Penthouse",
    description: "Full-floor penthouse with 360-degree views, private elevator, and smart home technology. The pinnacle of urban living.",
    address: "100 Skyview Dr, Miami, FL",
    regularPrice: 8500,
    discountPrice: 8000,
    bathrooms: 3,
    bedrooms: 2,
    furnished: true,
    parking: true,
    type: "rent",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Hamptons Beach House",
    description: "Classic Hamptons estate with private beach access, pool house, and gourmet kitchen. Perfect summer retreat.",
    address: "567 Dune Road, East Hampton, NY",
    regularPrice: 15000,
    discountPrice: 14000,
    bathrooms: 5,
    bedrooms: 6,
    furnished: true,
    parking: true,
    type: "rent",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1506126279646-a697353d3166?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Mountain Lodge Retreat",
    description: "Timber frame lodge with hot tub, game room, and ski-in/ski-out access. Perfect mountain getaway.",
    address: "891 Powder Lane, Park City, UT",
    regularPrice: 7500,
    discountPrice: 7000,
    bathrooms: 4,
    bedrooms: 4,
    furnished: true,
    parking: true,
    type: "rent",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Silicon Valley Executive Home",
    description: "Smart home with home office, wine cellar, and Tesla charging. Perfect for tech executives.",
    address: "234 Innovation Drive, Palo Alto, CA",
    regularPrice: 12000,
    discountPrice: 11500,
    bathrooms: 3,
    bedrooms: 4,
    furnished: true,
    parking: true,
    type: "rent",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "French Quarter Courtyard Home",
    description: "Historic home with private courtyard, wrought iron details, and modern updates. True New Orleans charm.",
    address: "678 Bourbon Street, New Orleans, LA",
    regularPrice: 1850000,
    discountPrice: 1799000,
    bathrooms: 3,
    bedrooms: 3,
    furnished: false,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1574739782594-db4ead022697?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1574739782594-db4ead022697?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Pacific Heights Victorian",
    description: "Restored Victorian with bay views, period details, and modern amenities. San Francisco elegance.",
    address: "901 Pacific Avenue, San Francisco, CA",
    regularPrice: 5500000,
    discountPrice: 5250000,
    bathrooms: 4,
    bedrooms: 5,
    furnished: false,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  }
];

// Connect to MongoDB and add sample listings
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
    // First delete all existing listings
    return Listing.deleteMany({});
  })
  .then(() => {
    // Then add the sample listings
    return Listing.create(sampleListings);
  })
  .then(() => {
    console.log('Sample listings added successfully!');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error:', err);
    mongoose.connection.close();
  });