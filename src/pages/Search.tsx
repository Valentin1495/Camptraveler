import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import ColResults from '../components/Search/ColResults';
import { Item } from './CollectionDetails';
import ItemCard from '../components/ItemCard';
import { search } from '../api/NFTeamApi';
import Loader from '../components/Loader';
import GallerySkeleton from '../components/Skeleton/GallerySkeleton';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { status, data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['searchResults'],
    queryFn: ({ pageParam = 1 }) => search(query!, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.items.hasNext ? allPages.length + 1 : undefined,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return status === 'loading' ? (
    <section className='grid mb-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 xl:grid-cols-5'>
      {[...Array(20).keys()].map((i) => (
        <GallerySkeleton key={i} />
      ))}
    </section>
  ) : (
    <div className='p-8'>
      <em className='text-lg'>Results for {query}</em>
      <ColResults cols={data?.pages[0].collections} />
      <h5 className='mt-20 font-bold text-lg'>Item results</h5>
      {data?.pages[0].items.data.length === 0 ? (
        <p className='ml-3.5'>We coudln{"'"} find any items.</p>
      ) : (
        data?.pages?.map((page, idx) => (
          <section
            key={idx}
            className='py-1.5 grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5'
          >
            {page.items.data.map((item: Item) => (
              <ItemCard key={item.itemId} {...item} />
            ))}
          </section>
        ))
      )}
      <div className='flex justify-center' ref={ref}>
        {isFetchingNextPage && <Loader />}
      </div>
    </div>
  );
}
