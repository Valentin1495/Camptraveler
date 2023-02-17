import { useInfiniteQuery } from '@tanstack/react-query';
import { ColInfo } from './Banner';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import ColCard from '../ColCard';
import { getHomeCol } from '../../api/NFTeamApi';
import GallerySkeleton from '../Skeleton/GallerySkeleton';

export interface ColProps extends ColInfo {
  description: string;
}

export default function Gallery() {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['mainCollections'],
    queryFn: ({ pageParam = 1 }) => getHomeCol(pageParam, 15),
    getNextPageParam: (lastPage, pages) =>
      lastPage.length ? pages.length + 1 : undefined,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className='mt-[2rem] space-y-5'>
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
              {page.map((col: ColProps) => (
                <ColCard
                  key={col.collectionId}
                  collectionId={col.collectionId}
                  collectionName={col.collectionName}
                  logoImgName={col.logoImgName}
                  description={col.description}
                />
              ))}
            </section>
          ))}
        </div>
      )}
      <div className='inline-block' ref={ref}>
        {isFetchingNextPage && (
          <section className='grid mb-5 grid-cols-1 sm:grid-cols-3 gap-5 xl:grid-cols-5'>
            {[...Array(15).keys()].map((i) => (
              <GallerySkeleton key={i} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
