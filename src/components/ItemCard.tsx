import { useState } from 'react';
import { Item } from '../pages/CollectionDetails';
import { BiTrash } from 'react-icons/bi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApiPrivate from '../hooks/useApiPrivate';
import { toast } from 'react-toastify';

export default function ItemCard({
  itemId,
  ownerId,
  itemImageName,
  itemName,
  itemPrice,
  coinName,
  coinImage,
  collectionName,
}: Item) {
  const [show, setShow] = useState(false);
  const id = localStorage.getItem('id');
  const apiPrivate = useApiPrivate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => apiPrivate.delete('/api/items/' + itemId),
    onSuccess: () => {
      queryClient.invalidateQueries(['itemsPerPage']);
      toast.success('Your item has been removed');
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error('Something went wrong: ' + err.message);
      }
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <article
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className='aspect-square cursor-pointer shadow-md hover:shadow-lg duration-500
                 group rounded-md'
    >
      <div className='relative overflow-hidden w-full rounded-t-md h-3/5'>
        <button
          onClick={(e) => {
            e.preventDefault();
            mutate();
          }}
          className={`duration-300 rounded-full p-1.5 bg-black/40 hover:bg-black z-10 absolute top-2 right-2 
          ${show && ownerId.toString() === id ? 'opacity-100' : 'opacity-0'} `}
        >
          <BiTrash className='h-6 w-6 text-gray-300' />
        </button>
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
