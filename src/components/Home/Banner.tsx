import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import BannerAsset from './BannerAsset';
import { getRandomPhotos } from '../../api/NFTeamApi';
import BannerSkeleton from '../Skeleton/BannerSkeleton';

interface Urls {
  regular: string;
}

export interface Photo {
  id?: string;
  urls: Urls;
}

export default function Banner() {
  const [banner, setBanner] = useState<Photo>();

  useQuery<Photo[]>({
    queryKey: ['photos'],
    queryFn: () => getRandomPhotos(20),
    onSuccess: (data) =>
      setBanner(data[Math.floor(Math.random() * data.length)]),
  });

  if (banner)
    return (
      <div className='rounded-md overflow-hidden w-full h-[450px] md:h-[550px]'>
        <BannerAsset key={banner.id} {...banner} />
      </div>
    );

  return <BannerSkeleton />;
}
