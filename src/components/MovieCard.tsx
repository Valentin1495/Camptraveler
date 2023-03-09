import { MovieInfo } from './Home/Gallery';

export default function MovieCard({
  backdrop_path,
  poster_path,
  title,
}: MovieInfo) {
  return (
    <div className='relative overflow-hidden rounded-2xl aspect-square'>
      <div className='absolute z-10 w-full h-1/3 bottom-0 bg-gradient-to-t from-black/50' />
      <img
        src={'https://image.tmdb.org/t/p/w500/' + poster_path || backdrop_path}
        alt='Upcoming movie'
        className='w-full h-full object-cover'
      />
      <h3 className='w-[260px] md:w-[140px] xl:w-[260px] truncate pl-3 pb-2 z-20 absolute bottom-0 font-bold text-lg text-white'>
        {title}
      </h3>
    </div>
  );
}
