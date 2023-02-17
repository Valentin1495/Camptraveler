import { useState } from 'react';
import { ColInfo } from '../Home/Banner';
import { createPortal } from 'react-dom';
import CollectionModal from './CollectionModal';

interface Props {
  isLoading: boolean;
  collections: ColInfo[] | undefined;
  colSelected: ColInfo | undefined;
  setColSelected: React.Dispatch<React.SetStateAction<ColInfo | undefined>>;
}

export default function SelectCollection({
  isLoading,
  collections,
  colSelected,
  setColSelected,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='items-center flex flex-col space-y-3'>
      <h3 className='font-bold text-lg'>
        Collection{' '}
        <span className='text-red-500 text-xl font-bold align-top'>*</span>
      </h3>
      {colSelected?.collectionName ? (
        <div
          onClick={() => setShowModal(true)}
          className='flex items-center space-x-3 border-gray-300 border-2 rounded-md cursor-pointer py-1.5 px-3'
        >
          <img
            src={import.meta.env.VITE_IMAGE_URL + colSelected.logoImgName}
            alt='Collection logo'
            className='h-8 w-8 object-cover rounded-full'
          />{' '}
          <span onClick={() => setShowModal(true)}>
            {colSelected?.collectionName}
          </span>
        </div>
      ) : (
        <button
          onClick={() => setShowModal(true)}
          className='border-gray-300 cursor-pointer border-2 p-3 rounded-lg disabled:cursor-not-allowed disabled:opacity-50'
          disabled={!collections?.length}
        >
          Select one of your collections...
        </button>
      )}

      {showModal &&
        createPortal(
          <CollectionModal
            isLoading={isLoading}
            collections={collections}
            setColSelected={setColSelected}
            setShowModal={setShowModal}
          />,
          document.body
        )}
    </div>
  );
}
