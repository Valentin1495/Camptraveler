import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/NFTeamApi';
import { Link } from 'react-router-dom';

export interface SearchCol {
  collectionId: number;
  collectionName: string;
  logoImgName: string;
  bannerImgName: string;
}

export default function MyCollections() {
  const id = localStorage.getItem('id');

  const { isLoading, error, data } = useQuery<SearchCol[]>({
    queryKey: ['members', id],
    queryFn: () => getUser(id!),
  });

  if (isLoading) return <p>Loading...</p>;

  if (error instanceof Error)
    return <p>An error has occurred: + {error.message}</p>;

  return (
    <div className='mt-20 max-w-7xl p-6 mx-auto h-screen'>
      <h1 className='text-5xl font-bold mb-12'>My Collections</h1>
      <div className='max-w-sm md:max-w-7xl mx-auto flex flex-col items-center md:block'>
        <div className='mb-6'>
          <p className='text-lg text-center md:text-justify'>
            Create, curate, and manage collections of unique NFTs to share and
            sell.
          </p>
        </div>
        <div className='space-x-5 flex items-center'>
          <Link
            to='/collection/create'
            className='bg-brand-color hover:bg-hovered px-7 py-5 text-xl font-bold rounded-xl text-white'
          >
            Create a collection
          </Link>
        </div>
      </div>
      <section></section>
    </div>
  );
}
