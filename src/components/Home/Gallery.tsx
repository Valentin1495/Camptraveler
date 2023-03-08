import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import ColCard from '../ColCard';
import { getHomeCols } from '../../api/NFTeamApi';
import GallerySkeleton from '../Skeleton/GallerySkeleton';
import Loader from '../Loader';

interface Url {
  raw: string;
}

export interface ColInfo {
  id?: string;
  color: string;
  description: string;
  urls: Url;
  alt_description: string;
}

export default function Gallery() {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['homeCols'],
    queryFn: ({ pageParam = 1 }) => getHomeCols(pageParam, 15),
    getNextPageParam: (lastPage, pages) => console.log(lastPage, pages),
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <div>
      {status === 'loading' ? (
        <section className='grid mb-5 grid-cols-1 sm:grid-cols-3 gap-5 xl:grid-cols-5'>
          {[...Array(15).keys()].map((i) => (
            <GallerySkeleton key={i} />
          ))}
        </section>
      ) : (
        <div>
          {data?.pages.map((page, idx) => (
            <section
              className='grid mb-5 grid-cols-1 sm:grid-cols-3 gap-5 xl:grid-cols-5'
              key={idx}
            >
              {page.map((col: ColInfo) => (
                <ColCard key={col.id} {...col} />
              ))}
            </section>
          ))}
        </div>
      )}
      <div className='flex justify-center' ref={ref}>
        {isFetchingNextPage && <Loader />}
      </div>
    </div>
  );
}
