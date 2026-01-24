import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import type { Restaurant } from '@/types/Restaurant';
import { useScreenSize } from '@/hooks/use-screen-size';
import { useGeolocationContext } from '@/components/providers/geolocation-provider';

interface RestaurantCardProps {
  restaurant: Restaurant;
  distance?: string;
  onClick?: () => void;
}

function RestaurantCard({
  restaurant,
  distance,
  onClick,
}: RestaurantCardProps) {
  const { calculateRestaurantDistance } = useGeolocationContext();
  const { isMobile, isTablet } = useScreenSize();

  const displayDistance = distance || calculateRestaurantDistance(restaurant);

  const getImageSize = () => {
    if (isMobile) return 'h-20 w-20';
    if (isTablet) return 'h-25 w-25';
    return 'h-30 w-30';
  };

  const getTextSize = () => {
    if (isMobile)
      return {
        name: 'text-sm font-bold',
        rating: 'text-xs',
        location: 'text-xs text-gray-600',
      };
    return {
      name: 'text-base font-bold',
      rating: 'text-sm',
      location: 'text-sm text-gray-600',
    };
  };

  const textSizes = getTextSize();

  return (
    <motion.div
      className={`flex cursor-pointer items-center gap-3 rounded-xl bg-white p-3 shadow-sm transition-all hover:shadow-md sm:rounded-2xl ${
        isMobile ? 'p-3' : 'p-4'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
    >
      <div
        className={`shrink-0 overflow-hidden rounded-md sm:rounded-xl ${getImageSize()}`}
      >
        <img
          src={
            restaurant.images?.[0] || restaurant.logo || '/icons/bk-logo.png'
          }
          alt={`${restaurant.name || 'Restaurant'} logo`}
          className='h-full w-full object-cover'
          loading='lazy'
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            if (img.src === (restaurant.images?.[0] || '')) {
              img.src = restaurant.logo || '/icons/bk-logo.png';
            } else if (
              img.src !==
              window.location.origin + '/icons/bk-logo.png'
            ) {
              img.src = '/icons/bk-logo.png';
            }
          }}
        />
      </div>

      <div className='flex-1'>
        <h3 className={`mb-1 ${textSizes.name}`}>
          {restaurant.name || 'Unknown Restaurant'}
        </h3>

        <div className='mb-1 flex items-center gap-1'>
          <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
          <span className={`${textSizes.rating} font-medium`}>
            {(restaurant.star || 0).toFixed(1)}
          </span>
        </div>

        <div className={`flex items-center gap-2 ${textSizes.location}`}>
          <span>{restaurant.place || 'Unknown location'}</span>
          <span>•</span>
          <span>{displayDistance}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default RestaurantCard;
