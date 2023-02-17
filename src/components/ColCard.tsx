import { Link } from 'react-router-dom';
import { ColProps } from './Home/Gallery';

export default function ColCard({
  collectionId,
  collectionName,
  logoImgName,
  description,
}: ColProps) {
  return (
    <Link
      to={`/collection/${collectionId}`}
      className='duration-300 hover:shadow-lg shadow-md hover:-translate-y-1.5 relative w-full h-full aspect-square inline-block rounded-xl overflow-hidden'
    >
      <div className='h-3/4 w-full overflow-hidden'>
        <img
          src={import.meta.env.VITE_IMAGE_URL + logoImgName}
          alt='collection'
          className='h-full w-full object-cover'
        />
      </div>

      <div className='px-2 py-1 sm:text-sm md:text-base space-y-2 sm:space-y-0 h-1/4'>
        <h3 className='font-bold max-w-full truncate'>{collectionName}</h3>
        <p className='text-gray-500 font-bold max-w-full truncate'>
          {description}
        </p>
      </div>
    </Link>
  );
}
