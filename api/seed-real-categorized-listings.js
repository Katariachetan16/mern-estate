import mongoose from 'mongoose';
import { config } from 'dotenv';
import Listing from './models/listing.model.js';

config();

// --- Image URLs for 10 Real Listings, Categorized ---
const categorizedImages = [
  // Listing 1: Modern Villa in California
  {
    exterior: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80',
    dining: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=800&auto=format&fit=crop&q=80',
    kitchen: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&auto=format&fit=crop&q=80',
    bedroom: 'https://images.unsplash.com/photo-1616594039964-ae9197a4a6a3?w=800&auto=format&fit=crop&q=80',
    backyard: 'https://images.unsplash.com/photo-1549517045-bc93de075e53?w=800&auto=format&fit=crop&q=80'
  },
  // Listing 2: Country House in the UK
  {
    exterior: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80',
    dining: 'https://images.unsplash.com/photo-1537725876952-2d291d284f2b?w=800&auto=format&fit=crop&q=80',
    kitchen: 'https://images.unsplash.com/photo-1617093442185-c5b88f2c8a45?w=800&auto=format&fit=crop&q=80',
    bedroom: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&auto=format&fit=crop&q=80',
    backyard: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&auto=format&fit=crop&q=80'
  },
  // Listing 3: Luxury Home in Sydney
  {
    exterior: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    dining: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&auto=format&fit=crop&q=80',
    kitchen: 'https://images.unsplash.com/photo-1594393049229-9b127e0a4bae?w=800&auto=format&fit=crop&q=80',
    bedroom: 'https://images.unsplash.com/photo-1595526114035-0d45ed16433d?w=800&auto=format&fit=crop&q=80',
    backyard: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=80'
  },
  // Listing 4: Tuscan Villa in Italy
  {
    exterior: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80',
    dining: 'https://images.unsplash.com/photo-1592004993237-50f0324c1a8a?w=800&auto=format&fit=crop&q=80',
    kitchen: 'https://images.unsplash.com/photo-1567056632293-81a725b2a74d?w=800&auto=format&fit=crop&q=80',
    bedroom: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80',
    backyard: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80'
  },
  // Listing 5: Suburban Home in Canada
  {
    exterior: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&auto=format&fit=crop&q=80',
    dining: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&auto=format&fit=crop&q=80',
    kitchen: 'https://images.unsplash.com/photo-1588854337236-6889d631f1ac?w=800&auto=format&fit=crop&q=80',
    bedroom: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&auto=format&fit=crop&q=80',
    backyard: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&auto=format&fit=crop&q=80'
  },
  // Listing 6: Modern Japanese House
  {
    exterior: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&auto=format&fit=crop&q=80',
    dining: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80',
    kitchen: 'https://images.unsplash.com/photo-1604695334799-35d593a4a333?w=800&auto=format&fit=crop&q=80',
    bedroom: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80',
    backyard: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&auto=format&fit=crop&q=80'
  },
  // Listing 7: French Countryside Chateau
  {
    exterior: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&auto=format&fit=crop&q=80',
    dining: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80',
    kitchen: 'https://images.unsplash.com/photo-1578859333954-611142589a36?w=800&auto=format&fit=crop&q=80',
    bedroom: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800&auto=format&fit=crop&q=80',
    backyard: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&auto=format&fit=crop&q=80'
  },
  // Listing 8: Spanish Hacienda
  {
    exterior: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&auto=format&fit=crop&q=80',
    dining: 'https://images.unsplash.com/photo-1631679702028-367c48785541?w=800&auto=format&fit=crop&q=80',
    kitchen: 'https://images.unsplash.com/photo-1558413747-e3d595d43c4e?w=800&auto=format&fit=crop&q=80',
    bedroom: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80',
    backyard: 'https://images.unsplash.com/photo-1573167161968-3a05a8423639?w=800&auto=format&fit=crop&q=80'
  },
  // Listing 9: Scandinavian Design Home
  {
    exterior: 'https://images.unsplash.com/photo-1605276374104-5de67d18394b?w=800&auto=format&fit=crop&q=80',
    dining: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    kitchen: 'https://images.unsplash.com/photo-1596205218834-55a8f3f344d8?w=800&auto=format&fit=crop&q=80',
    bedroom: 'https://images.unsplash.com/photo-1571504871843-c15234a17c7a?w=800&auto=format&fit=crop&q=80',
    backyard: 'https://images.unsplash.com/photo-1592912983363-c28695a31a43?w=800&auto=format&fit=crop&q=80'
  },
  // Listing 10: Swiss Alpine Chalet
  {
    exterior: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&auto=format&fit=crop&q=80',
    dining: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
    kitchen: 'https://images.unsplash.com/photo-1512141953589-8c1821a3b2f2?w=800&auto=format&fit=crop&q=80',
    bedroom: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80',
    backyard: 'https://images.unsplash.com/photo-1560185127-6ed189bf02a4?w=800&auto=format&fit=crop&q=80'
  }
];

// --- Real Property Details ---
const realProperties = [
  { name: "Modern Villa", address: "123 Ocean Drive, Malibu, California", type: 'sale', price: 4500000 },
  { name: "Quaint Country House", address: "45 Cotswolds Lane, Oxfordshire, UK", type: 'sale', price: 1200000 },
  { name: "Luxury Harbour Home", address: "78 Bellevue Road, Sydney, Australia", type: 'sale', price: 3200000 },
  { name: "Rustic Tuscan Villa", address: "90 Vineyard Way, Florence, Italy", type: 'sale', price: 2800000 },
  { name: "Spacious Suburban Home", address: "101 Maple Street, Toronto, Canada", type: 'sale', price: 950000 },
  { name: "Minimalist Japanese House", address: "23 Cherry Blossom Path, Kyoto, Japan", type: 'rent', price: 4500 },
  { name: "Grand French Chateau", address: "55 Lavender Fields, Provence, France", type: 'rent', price: 7800 },
  { name: "Classic Spanish Hacienda", address: "88 Sun-Kissed Trail, Andalusia, Spain", type: 'rent', price: 3200 },
  { name: "Sleek Scandinavian Home", address: "12 Fjord View, Oslo, Norway", type: 'rent', price: 5500 },
  { name: "Cozy Swiss Alpine Chalet", address: "34 Edelweiss Slope, Interlaken, Switzerland", type: 'rent', price: 6200 }
];

// --- Main Seeding Function ---
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB');

    // 1. Delete all existing listings
    await Listing.deleteMany({});
    console.log('Successfully deleted all existing listings.');

    // 2. Create 10 new real listings
    const newListings = realProperties.map((property, i) => {
      const hasOffer = Math.random() > 0.5;
      return {
        name: `${property.name} in ${property.address.split(',')[1]}`,
        description: `A beautiful ${property.name.toLowerCase()} located in the heart of ${property.address.split(',')[1]}. Offers stunning views and modern amenities.`,
        address: property.address,
        regularPrice: property.price,
        discountPrice: hasOffer ? Math.floor(property.price * 0.9) : property.price,
        bathrooms: Math.floor(Math.random() * 2) + 3, // 3-4
        bedrooms: Math.floor(Math.random() * 2) + 4, // 4-5
        furnished: true,
        parking: true,
        type: property.type,
        offer: hasOffer,
        imageUrls: [
          categorizedImages[i].exterior,
          categorizedImages[i].dining,
          categorizedImages[i].kitchen,
          categorizedImages[i].bedroom,
          categorizedImages[i].backyard
        ],
        userRef: "6545d361aae21a5b15f81959", // Replace with a valid user reference
      };
    });

    // 3. Insert new listings into the database
    await Listing.insertMany(newListings);
    console.log('Successfully added 10 new real, categorized listings.');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // 4. Disconnect from MongoDB
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB.');
  }
}

// --- Run the script ---
seedDatabase();