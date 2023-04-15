import { Photo } from './Banner';

export default function BannerAsset({ urls }: Photo) {
  const imgSrc = urls.regular;

  return (
    <img src={imgSrc} alt='Collection' className='w-full h-full object-cover' />
  );
}
