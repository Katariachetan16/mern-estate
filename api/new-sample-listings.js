import Listing from './models/listing.model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// 15 high-quality listings with verified images
const sampleListings = [
  {
    name: "Oceanfront Modern Mansion",
    description: "Stunning oceanfront mansion with infinity pool, private beach access, and panoramic views. Features smart home automation and luxury finishes throughout.",
    address: "123 Ocean Drive, Miami Beach, FL",
    regularPrice: 12500000,
    discountPrice: 11900000,
    bathrooms: 7,
    bedrooms: 6,
    furnished: true,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Luxury Downtown Penthouse",
    description: "Exclusive penthouse with private rooftop terrace, panoramic city views, and premium finishes. Features include a wine cellar and private elevator access.",
    address: "900 Skyline Ave, Los Angeles, CA",
    regularPrice: 8500000,
    discountPrice: 7900000,
    bathrooms: 4,
    bedrooms: 3,
    furnished: true,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600607687644-c94bf5588563?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Contemporary Beach House",
    description: "Modern beach house with direct ocean access, floor-to-ceiling windows, and an expansive deck for entertaining. Includes high-end appliances and custom cabinetry.",
    address: "789 Coastal Drive, Newport Beach, CA",
    regularPrice: 5500000,
    discountPrice: 5200000,
    bathrooms: 4,
    bedrooms: 3,
    furnished: true,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1613490493412-b04656d462e0?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Modern Urban Loft",
    description: "Stylish downtown loft with exposed brick walls, high ceilings, and industrial-chic finishes. Features include a gourmet kitchen and private balcony.",
    address: "456 Urban Street, New York, NY",
    regularPrice: 7500,
    discountPrice: 7000,
    bathrooms: 2,
    bedrooms: 1,
    furnished: true,
    parking: false,
    type: "rent",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Mountain View Estate",
    description: "Luxurious mountain estate with panoramic views, indoor pool, and home theater. Perfect for both summer and winter activities.",
    address: "321 Mountain Road, Aspen, CO",
    regularPrice: 8900000,
    discountPrice: 8500000,
    bathrooms: 6,
    bedrooms: 5,
    furnished: true,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
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
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1598928636135-d0a28c084a0e?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Historic Brownstone",
    description: "Beautifully restored historic brownstone with modern amenities, original hardwood floors, and private garden. Located in prime neighborhood.",
    address: "567 Park Avenue, New York, NY",
    regularPrice: 4200000,
    discountPrice: 3950000,
    bathrooms: 3,
    bedrooms: 4,
    furnished: false,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800"
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
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1574362848148-11496d93a7c6?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1574362848147-11496d93a7c5?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Luxury Golf Estate",
    description: "Prestigious estate home overlooking championship golf course. Features include a wine cellar, home theater, and outdoor kitchen.",
    address: "888 Country Club Lane, Palm Springs, CA",
    regularPrice: 7500000,
    discountPrice: 7200000,
    bathrooms: 5,
    bedrooms: 6,
    furnished: true,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Modern Smart Home",
    description: "Cutting-edge smart home with automated systems, sustainable features, and contemporary design. Perfect blend of technology and comfort.",
    address: "444 Tech Avenue, Austin, TX",
    regularPrice: 1850000,
    discountPrice: 1799000,
    bathrooms: 3,
    bedrooms: 4,
    furnished: true,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800"
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
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1598928636135-d0a28c084a0e?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Lakefront Retreat",
    description: "Serene lakefront property with private dock, expansive deck, and stunning water views. Perfect for year-round living or vacation home.",
    address: "777 Lake View Drive, Lake Tahoe, NV",
    regularPrice: 3200000,
    discountPrice: 2950000,
    bathrooms: 3,
    bedrooms: 3,
    furnished: true,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "Eco-Friendly Villa",
    description: "Sustainable luxury villa with solar power, green roof, and natural materials throughout. Features organic garden and rainwater harvesting.",
    address: "123 Green Valley Road, Portland, OR",
    regularPrice: 2950000,
    discountPrice: 2850000,
    bathrooms: 4,
    bedrooms: 4,
    furnished: true,
    parking: true,
    type: "sale",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=800"
    ],
    userRef: "demo123"
  },
  {
    name: "City View Studio",
    description: "Chic studio apartment with stunning city views, modern design, and smart space utilization. Perfect for urban professionals.",
    address: "789 Downtown Circle, San Francisco, CA",
    regularPrice: 3800,
    discountPrice: 3500,
    bathrooms: 1,
    bedrooms: 0,
    furnished: true,
    parking: false,
    type: "rent",
    offer: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1610527003928-47afd5f470c6?auto=format&fit=crop&w=800"
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