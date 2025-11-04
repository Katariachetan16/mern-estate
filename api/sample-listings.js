import Listing from './models/listing.model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Clean version: 15 high-quality listings
const sampleListings = [
  {
    name: 'Oceanfront Modern Mansion',
    description: 'Stunning oceanfront mansion with infinity pool, private beach access, and panoramic views. Features smart home automation and luxury finishes throughout.',
    address: '123 Ocean Drive, Miami Beach, FL',
    regularPrice: 12500000,
    discountPrice: 11900000,
    bathrooms: 7,
    bedrooms: 6,
    furnished: true,
    parking: true,
    type: 'sale',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    userRef: 'demo123'
  },
  {
    name: 'Luxury Downtown Penthouse',
    description: 'Exclusive penthouse with private rooftop terrace, panoramic city views, and premium finishes.',
    address: '900 Skyline Ave, Los Angeles, CA',
    regularPrice: 8500000,
    discountPrice: 7900000,
    bathrooms: 4,
    bedrooms: 3,
    furnished: true,
    parking: true,
    type: 'sale',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c94bf5588563?auto=format&fit=crop&w=1200&q=80'
    ],
    userRef: 'demo123'
  },
  {
    name: 'Contemporary Beach House',
    description: 'Modern beach house with direct ocean access, floor-to-ceiling windows, and an expansive deck for entertaining.',
    address: '789 Coastal Drive, Newport Beach, CA',
    regularPrice: 5500000,
    discountPrice: 5200000,
    bathrooms: 4,
    bedrooms: 3,
    furnished: true,
    parking: true,
    type: 'sale',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    userRef: 'demo123'
  },
  {
    name: 'Modern Urban Loft',
    description: 'Stylish downtown loft with exposed brick walls, high ceilings, and industrial-chic finishes.',
    address: '456 Urban Street, New York, NY',
    regularPrice: 7500,
    discountPrice: 7000,
    bathrooms: 2,
    bedrooms: 1,
    furnished: true,
    parking: false,
    type: 'rent',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1200&q=80'
    ],
    userRef: 'demo123'
  },
  {
    name: 'Mountain View Estate',
    description: 'Luxurious mountain estate with panoramic views, indoor pool, and home theater.',
    address: '321 Mountain Road, Aspen, CO',
    regularPrice: 8900000,
    discountPrice: 8500000,
    bathrooms: 6,
    bedrooms: 5,
    furnished: true,
    parking: true,
    type: 'sale',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1200&q=80'
    ],
    userRef: 'demo123'
  },
  {
    name: 'Luxury Highrise Apartment',
    description: 'Sophisticated apartment with stunning city views, modern amenities, and designer furnishings.',
    address: '789 Sky Tower, Chicago, IL',
    regularPrice: 6000,
    discountPrice: 5500,
    bathrooms: 2,
    bedrooms: 2,
    furnished: true,
    parking: true,
    type: 'rent',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
    ],
    userRef: 'demo123'
  },
  {
    name: 'Historic Brownstone',
    description: 'Beautifully restored historic brownstone with modern amenities, original hardwood floors, and private garden.',
    address: '567 Park Avenue, New York, NY',
    regularPrice: 4200000,
    discountPrice: 3950000,
    bathrooms: 3,
    bedrooms: 4,
    furnished: false,
    parking: true,
    type: 'sale',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    userRef: 'demo123'
  },
  {
    name: 'Waterfront Condo',
    description: 'Modern waterfront condo with spectacular bay views, premium appliances, and resort-style amenities.',
    address: '101 Harbor Drive, San Diego, CA',
    regularPrice: 3200,
    discountPrice: 3000,
    bathrooms: 2,
    bedrooms: 1,
    furnished: true,
    parking: true,
    type: 'rent',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80'
    ],
    userRef: 'demo123'
  },
  {
    name: 'Luxury Golf Estate',
    description: 'Prestigious estate home overlooking championship golf course. Features include a wine cellar and home theater.',
    address: '888 Country Club Lane, Palm Springs, CA',
    regularPrice: 7500000,
    discountPrice: 7200000,
    bathrooms: 5,
    bedrooms: 6,
    furnished: true,
    parking: true,
    type: 'sale',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    userRef: 'demo123'
  },
  {
    name: 'Modern Smart Home',
    description: 'Cutting-edge smart home with automated systems, sustainable features, and contemporary design.',
    address: '444 Tech Avenue, Austin, TX',
    regularPrice: 1850000,
    discountPrice: 1799000,
    bathrooms: 3,
    bedrooms: 4,
    furnished: true,
    parking: true,
    type: 'sale',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
    ],
    userRef: 'demo123'
  },
  {
    name: 'Skyline Apartment',
    description: 'Premium high-floor apartment with panoramic city views, modern finishes, and access to luxury building amenities.',
    address: '555 Downtown Blvd, Seattle, WA',
    regularPrice: 4500,
    discountPrice: 4200,
    bathrooms: 2,
    bedrooms: 2,
    furnished: true,
    parking: true,
    type: 'rent',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80'
    ],
    userRef: 'demo123'
  },
  {
    name: 'Lakefront Retreat',
    description: 'Serene lakefront property with private dock, expansive deck, and stunning water views.',
    address: '777 Lake View Drive, Lake Tahoe, NV',
    regularPrice: 3200000,
    discountPrice: 2950000,
    bathrooms: 3,
    bedrooms: 3,
    furnished: true,
    parking: true,
    type: 'sale',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    userRef: 'demo123'
  }
];

async function addSampleListings() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB!');

    // Delete existing listings
    await Listing.deleteMany({});
    console.log('Existing listings deleted');

    // Insert new sample listings
    await Listing.insertMany(sampleListings);
    console.log('Sample listings added successfully!');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding sample listings:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

addSampleListings();