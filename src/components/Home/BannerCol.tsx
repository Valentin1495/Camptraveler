import { Link } from 'react-router-dom';
import { ColInfo } from './Banner';

export default function BannerCol({
  collectionId,
  collectionName,
  logoImgName,
}: ColInfo) {
  return (
    <Link
      to={`/collection/${collectionId}`}
      className='relative card overflow-hidden inline-block w-full h-full'
    >
      <div className='absolute z-10 w-full h-1/3 bottom-0 bg-gradient-to-t from-black/50' />
      <img
        src={import.meta.env.VITE_IMAGE_URL + logoImgName}
        alt='Collection'
        className='w-full h-full  object-cover'
      />
      <h3 className='w-full truncate pl-3 pb-2 z-20 absolute bottom-0 font-bold text-lg text-white'>
        {collectionName}
      </h3>
    </Link>
  );
}
