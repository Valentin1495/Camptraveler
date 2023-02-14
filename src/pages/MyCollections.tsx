import { useQuery } from '@tanstack/react-query';
import { getUserCols } from '../api/NFTeamApi';
import { Link } from 'react-router-dom';
import { ColProps } from '../components/Home/Gallery';
import ColCard from '../components/ColCard';

export default function MyCollections() {
  const id = localStorage.getItem('id');

  const { isLoading, error, data } = useQuery<ColProps[]>({
    queryKey: ['members', id, 'cols'],
    queryFn: () => getUserCols(id!),
  });

  if (isLoading) return <p>Loading...</p>;

  if (error instanceof Error) return <p>Error: + {error.message}</p>;

  return (
    <div className='max-w-7xl p-6 mx-auto h-screen'>
      <h1 className='text-3xl sm:text-5xl font-bold mb-12 text-center'>
        My Collections
      </h1>
      <div className='max-w-sm md:max-w-7xl mx-auto flex flex-col items-center md:block'>
        <div className='mb-6'>
          <p className='sm:text-lg text-center md:text-justify'>
            Create, curate, and manage collections of unique NFTs to share and
            sell.
          </p>
        </div>
        <div className='space-x-5 flex items-center'>
          <Link
            to='/collection/create'
            className='bg-brand-color hover:bg-hovered px-5 py-3 sm:px-7 sm:py-5 sm:text-xl font-bold rounded-xl text-white'
          >
            Create a collection
          </Link>
        </div>
      </div>
      <section className='grid my-5 grid-cols-1 sm:grid-cols-3 gap-5 xl:grid-cols-5'>
        {data?.map((col) => (
          <ColCard
            collectionId={col.collectionId}
            collectionName={col.collectionName}
            logoImgName={col.logoImgName}
            description={col.description}
          />
        ))}
      </section>
    </div>
  );
}
