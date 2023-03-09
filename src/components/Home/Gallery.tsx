import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import MovieCard from '../MovieCard';
import { getMovies } from '../../api/NFTeamApi';
import GallerySkeleton from '../Skeleton/GallerySkeleton';
import Loader from '../Loader';

export interface MovieInfo {
  id?: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
}

export default function Gallery() {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['upcomingMovies'],
    queryFn: ({ pageParam = 1 }) => getMovies(pageParam),
    getNextPageParam: (_lastPage, pages) =>
      pages.length <= 23 ? pages.length + 1 : undefined,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  console.log(data);
  return (
    <div>
      {status === 'loading' ? (
        <section className='grid mb-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 xl:grid-cols-5'>
          {[...Array(20).keys()].map((i) => (
            <GallerySkeleton key={i} />
          ))}
        </section>
      ) : (
        <div>
          {data?.pages.map((page, idx) => (
            <section
              className='grid mb-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 xl:grid-cols-5'
              key={idx}
            >
              {page.results.map((movie: MovieInfo) => (
                <MovieCard key={movie.id} {...movie} />
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
