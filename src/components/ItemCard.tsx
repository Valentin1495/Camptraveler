import { useState } from 'react';
import { Item } from '../pages/CollectionDetails';

export default function ItemCard({
  itemImageName,
  itemName,
  itemPrice,
  coinName,
  coinImage,
  collectionName,
}: Item) {
  const [show, setShow] = useState(false);

  return (
    <article
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className='aspect-square cursor-pointer shadow-md hover:shadow-lg duration-500
                 group rounded-md'
    >
      <div className='relative overflow-hidden w-full rounded-t-md h-3/5'>
        <img
          src={coinImage}
          alt='Coin'
          className={`z-10 absolute top-1.5 left-1.5 w-8 h-8 duration-300 ${
            show ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <img
          src={import.meta.env.VITE_IMAGE_URL + itemImageName}
          alt='collection'
          className='h-full w-full object-cover group-hover:scale-[115%]
                     duration-500'
        />
      </div>
      <div className='p-4 md:p-1.5 font-bold h-2/5 w-full flex flex-col'>
        <h3 className='text-base truncate'>{itemName}</h3>
        <h3 className='text-base truncate flex-1'>{collectionName}</h3>
        <h3 className='text-sm truncate text-[#707A83]'>
          Last sale: {itemPrice + ' ' + coinName}
        </h3>
      </div>
    </article>
  );
}
