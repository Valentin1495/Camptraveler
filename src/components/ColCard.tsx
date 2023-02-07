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
      className='duration-300 hover:shadow-xl shadow-md hover:-translate-y-1.5 relative w-full h-full aspect-square inline-block rounded-xl shadow-m overflow-hidden'
    >
      <div className='h-3/4 w-full overflow-hidden'>
        <img
          src={import.meta.env.VITE_IMAGE_URL + logoImgName}
          alt='collection'
          className='group-hover:scale-[115%] h-full w-full object-cover duration-500'
        />
      </div>

      <div className='px-3.5 pt-3.5 space-y-2 sm:space-y-0 md:pt-1 h-1/4'>
        <h3 className='font-bold max-w-full truncate'>{collectionName}</h3>
        <p className='text-gray-500 font-bold max-w-full truncate'>
          {description}
        </p>
      </div>
    </Link>
  );
}
