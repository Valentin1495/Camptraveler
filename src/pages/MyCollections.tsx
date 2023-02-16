import { useQuery } from '@tanstack/react-query';
import { getUserCols } from '../api/NFTeamApi';
import { Link } from 'react-router-dom';
import ColResult, { Result } from '../components/Search/ColResult';

export default function MyCollections() {
  const id = localStorage.getItem('id');

  const { isLoading, data } = useQuery<Result[]>({
    queryKey: ['members', id, 'cols'],
    queryFn: () => getUserCols(id!),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className=' p-8 h-screen mb-10'>
      <h1 className='text-3xl md:text-5xl font-bold text-center'>
        My Collections
      </h1>
      <p className='md:text-lg text-center mt-8 md:mt-12'>
        Create, curate, and manage collections of unique NFTs to share and sell.
      </p>
      <div className='text-center'>
        <Link
          to='/collection/create'
          className='bg-brand-color mx-auto inline-block mt-6 hover:bg-hovered px-5 py-3 md:px-7 md:py-5 md:text-xl font-bold rounded-xl text-white'
        >
          Create a collection
        </Link>
      </div>

      <section className='grid my-5 grid-cols-1 sm:grid-cols-3 gap-5 xl:grid-cols-5'>
        {data?.map((col) => (
          <article className='group rounded-2xl' key={col.collectionId}>
            <ColResult
              collectionId={col.collectionId}
              logoImgName={col.logoImgName}
              bannerImgName={col.bannerImgName}
              collectionName={col.collectionName}
            />
          </article>
        ))}
      </section>
    </div>
  );
}
