import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import ColResults from '../components/Search/ColResults';
import { Item } from './CollectionDetails';
import ItemCard from '../components/ItemCard';
import { search } from '../api/collectionApi';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { status, data, error, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['search'],
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
    <>
      <p>Loading...</p>
    </>
  ) : status === 'error' && error instanceof Error ? (
    <>
      <span>Error: {error.message}</span>
    </>
  ) : (
    <div className='px-8 py-8'>
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
              <ItemCard
                key={item.itemId}
                itemImageName={item.itemImageName}
                itemName={item.itemName}
                itemPrice={item.itemPrice}
                itemId={item.itemId}
                coinName={item.coinName}
                coinImage={item.coinImage}
                collectionName={item.collectionName}
              />
            ))}
          </section>
        ))
      )}
      <p className='inline-block' ref={ref}>
        {isFetchingNextPage && 'Loading more...'}
      </p>
    </div>
  );
}
