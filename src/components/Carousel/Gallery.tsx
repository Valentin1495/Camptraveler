import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ColInfo } from './Banner';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Image from './Image';

export interface ImageProps extends ColInfo {
  description: string;
}

export default function Gallery() {
  const { ref, inView } = useInView();

  const fetchCollections = async ({ pageParam = 1 }) => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/api/collections/main?page=${pageParam}&size=15`
    );
    return res.data;
  };

  const { data, error, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['gallery'],
      queryFn: fetchCollections,
      getNextPageParam: (lastPage, pages) =>
        lastPage.length ? pages.length + 1 : undefined,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className='p-[2rem] mt-[2rem] space-y-5'>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' && error instanceof Error ? (
        <span>Error: {error.message}</span>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 xl:grid-cols-5'>
          {data?.pages.map((page: ImageProps[]) =>
            page.map((col) => (
              <Image
                collectionId={col.collectionId}
                collectionName={col.collectionName}
                logoImgName={col.logoImgName}
                description={col.description}
              />
            ))
          )}
        </div>
      )}
      <p className='inline-block' ref={ref}>
        {isFetchingNextPage && 'Loading more...'}
      </p>
    </div>
  );
}
