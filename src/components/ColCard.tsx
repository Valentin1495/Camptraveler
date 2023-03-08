import { ColInfo } from './Home/Gallery';

export default function ColCard({
  color,
  description,
  urls,
  alt_description,
}: ColInfo) {
  return (
    <div className='duration-300 hover:shadow-lg shadow-md hover:-translate-y-1.5 relative w-full h-full aspect-square inline-block rounded-xl overflow-hidden'>
      <div className='h-3/4 w-full overflow-hidden'>
        <img
          src={urls.raw + '&w=500&auto=format'}
          alt='collection'
          className='h-full w-full object-cover'
        />
      </div>

      <div className='px-2 py-1 sm:text-sm md:text-base space-y-2 sm:space-y-0 h-1/4'>
        <h3 className='font-bold max-w-full truncate'>{color}</h3>
        <p className='text-gray-500 font-bold max-w-full truncate'>
          {description || alt_description}
        </p>
      </div>
    </div>
  );
}
