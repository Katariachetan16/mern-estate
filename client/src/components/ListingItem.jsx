import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { useState, useEffect } from 'react';

export default function ListingItem({ listing }) {
  const [imgSrc, setImgSrc] = useState('');
  const [imgError, setImgError] = useState(false);
  
  const fallback = 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg';
  
  useEffect(() => {
    if (listing && Array.isArray(listing.imageUrls) && listing.imageUrls.length > 0) {
      const img = new Image();
      img.src = listing.imageUrls[0];
      img.onload = () => {
        setImgSrc(listing.imageUrls[0]);
        setImgError(false);
      };
      img.onerror = () => {
        setImgError(true);
        setImgSrc(fallback);
      };
    } else {
      setImgSrc(fallback);
    }
  }, [listing]);

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={imgSrc || fallback}
          alt='listing cover'
          onError={(e) => {
            setImgError(true);
            e.target.src = fallback;
          }}
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
