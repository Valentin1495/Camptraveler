import { Link } from 'react-router-dom';
import { Asset } from './Banner';

export default function BannerAsset({ image_url, name, permalink }: Asset) {
  if (!image_url) return null;

  return (
    <Link
      to={permalink}
      className='relative overflow-hidden rounded-2xl inline-block w-full h-full'
    >
      <div className='absolute z-10 w-full h-1/3 bottom-0 bg-gradient-to-t from-black/50' />
      <img
        src={image_url}
        alt='Collection'
        className='w-full h-full object-cover'
      />
      <h3 className='w-full truncate pl-3 pb-2 z-20 absolute bottom-0 font-bold text-lg text-white'>
        {name}
      </h3>
    </Link>
  );
}
