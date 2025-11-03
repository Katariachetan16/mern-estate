import Listing from './models/listing.model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const sampleListings = [
  {
    name: "Luxury Beachfront Villa",
    description: "Stunning beachfront villa with panoramic ocean views, featuring 4 bedrooms, private pool, and direct beach access.",
    address: "123 Ocean Drive, Miami Beach, FL",
    regularPrice: 2500000,
    discountPrice: 2300000,
    bathrooms: 4,
    bedrooms: 4,
    furnished: true,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    ],
    userRef: "demo123"
  },
  {
    name: "Modern Downtown Loft",
    description: "Contemporary loft in the heart of downtown, exposed brick walls, high ceilings, and state-of-the-art appliances.",
    address: "456 Urban Street, New York, NY",
    regularPrice: 5000,
    discountPrice: 4500,
    bathrooms: 2,
    bedrooms: 1,
    furnished: true,
    parking: false,
    type: "rent",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600607687644-c94bf5588563"
    ],
    userRef: "demo123"
  },
  {
    name: "Suburban Family Home",
    description: "Spacious family home in a quiet suburb, featuring a large backyard, modern kitchen, and finished basement.",
    address: "789 Maple Avenue, Chicago, IL",
    regularPrice: 750000,
    discountPrice: 725000,
    bathrooms: 3,
    bedrooms: 4,
    furnished: false,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
    ],
    userRef: "demo123"
  },
  {
    name: "Mountain View Cabin",
    description: "Cozy mountain cabin with breathtaking views, perfect for weekend getaways or vacation rentals.",
    address: "321 Mountain Road, Aspen, CO",
    regularPrice: 3000,
    discountPrice: 2800,
    bathrooms: 2,
    bedrooms: 2,
    furnished: true,
    parking: true,
    type: "rent",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    ],
    userRef: "demo123"
  },
  {
    name: "Historic Townhouse",
    description: "Beautifully restored historic townhouse with original features, modern amenities, and rooftop terrace.",
    address: "159 Heritage Lane, Boston, MA",
    regularPrice: 1200000,
    discountPrice: 1150000,
    bathrooms: 3,
    bedrooms: 3,
    furnished: false,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb"
    ],
    userRef: "demo123"
  }
];

async function addSampleListings() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB!');

    // Delete existing listings
    await Listing.deleteMany({});
    console.log('Existing listings deleted');

    // Add new sample listings
    await Listing.insertMany(sampleListings);
    console.log('Sample listings added successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addSampleListings();