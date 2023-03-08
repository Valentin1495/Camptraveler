import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import BannerAsset from './BannerAsset';
import { getHomeAssets } from '../../api/NFTeamApi';
import BannerSkeleton from '../Skeleton/BannerSkeleton';
import { toast } from 'react-toastify';

export interface Asset {
  id?: number;
  image_url: string | null;
  name: string;
  permalink: string;
}

export default function Banner() {
  const [banner, setBanner] = useState<Asset>();

  const { isLoading } = useQuery<Asset[]>({
    queryKey: ['openseaAssets'],
    queryFn: () => getHomeAssets(50),
    onSuccess: (data) =>
      setBanner(data[Math.floor(Math.random() * data.length)]),
    onError: (error) => {
      if (error instanceof Error) {
        toast.error('Something went wrong: ' + error.message);
      }
    },
  });

  if (isLoading) return <BannerSkeleton />;

  if (banner)
    return (
      <div className='overflow-hidden w-full h-[500px]'>
        <BannerAsset key={banner.id} {...banner} />
      </div>
    );
}
