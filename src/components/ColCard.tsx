import { Link } from 'react-router-dom';
import { ColProps } from './Home/Gallery';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCollection, removeCol } from '../api/NFTeamApi';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { Collection } from '../pages/CollectionDetails';

export default function ColCard({
  collectionId,
  collectionName,
  logoImgName,
  description,
}: ColProps) {
  const id = localStorage.getItem('id');
  const [showTrash, setShowTrash] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data } = useQuery<Collection>({
    queryKey: ['onlyCollection'],
    queryFn: () => getCollection(collectionId?.toString()!),
  });

  const { mutate } = useMutation({
    mutationFn: () => removeCol(collectionId!),
    onSuccess: () => {
      queryClient.invalidateQueries(['members', id, 'cols']);
      toast.success('Your collection has been successfully removed');
    },
  });

  return (
    <Link
      to={`/collection/${collectionId}`}
      className='duration-300 hover:shadow-lg shadow-md hover:-translate-y-1.5 relative w-full h-full aspect-square inline-block rounded-xl shadow-m overflow-hidden'
      onMouseEnter={() => setShowTrash(true)}
      onMouseLeave={() => setShowTrash(false)}
    >
      <div className='h-3/4 w-full overflow-hidden relative'>
        <button
          onClick={(e) => {
            e.preventDefault();
            mutate();
          }}
          className={`rounded-full p-1.5 bg-black/60 hover:bg-black z-50 absolute top-2 right-2 ${
            showTrash && data?.ownerId.toString() === id
              ? 'inline-block'
              : 'hidden'
          } `}
        >
          <BiTrash className='h-6 w-6 text-gray-300' />
        </button>
        <img
          src={import.meta.env.VITE_IMAGE_URL + logoImgName}
          alt='collection'
          className='h-full w-full object-cover'
        />
      </div>

      <div className='px-2 py-1 sm:text-sm md:text-base space-y-2 sm:space-y-0 h-1/4'>
        <h3 className='font-bold max-w-full truncate'>{collectionName}</h3>
        <p className='text-gray-500 font-bold max-w-full truncate'>
          {description}
        </p>
      </div>
    </Link>
  );
}
