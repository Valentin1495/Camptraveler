import { useQuery } from '@tanstack/react-query';
import { getMyPage, getUserCols } from '../api/NFTeamApi';
import { Link } from 'react-router-dom';
import ColResult, { Result } from '../components/Search/ColResult';
import useApiPrivate from '../hooks/useApiPrivate';
import { Profile } from './Account';

export default function MyCollections() {
  const apiPrivate = useApiPrivate();
  const accessToken = localStorage.getItem('accessToken');

  const { data: myProfile } = useQuery<Profile>({
    queryKey: ['myPage'],
    queryFn: () => getMyPage(apiPrivate, accessToken),
    enabled: !!accessToken,
  });

  const myId = myProfile?.member.memberId;

  const { isLoading, data } = useQuery<Result[]>({
    queryKey: ['members', myId, 'cols'],
    queryFn: () => getUserCols(myId?.toString()!),
    enabled: !!myId,
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
