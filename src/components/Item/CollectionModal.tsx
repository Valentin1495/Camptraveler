import { Link } from 'react-router-dom';
import { ColInfo } from './CreateAsset';

interface ModalProps {
  isLoading: boolean;
  collections: ColInfo[] | undefined;
  setColSelected: React.Dispatch<React.SetStateAction<ColInfo | undefined>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CollectionModal({
  isLoading,
  collections,
  setColSelected,
  setShowModal,
}: ModalProps) {
  const selectCol = (col: ColInfo) => {
    setShowModal(false);
    setColSelected(col);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div
        onClick={() => setShowModal(false)}
        className='bg-overlay fixed top-0 bottom-0 left-0 right-0 z-30'
      />
      <ul className='cursor-pointer overflow-hidden text-center rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-30 '>
        {collections?.length ? (
          collections?.map((col) => (
            <li
              key={col.collectionId}
              className='hover:bg-gray-100 text-lg flex font-semibold space-x-3 px-5 py-3'
              onClick={() => selectCol(col)}
            >
              <img
                src={import.meta.env.VITE_IMAGE_URL + col.logoImgName}
                alt='Collection logo'
                className='h-8 w-8 object-cover rounded-full'
              />{' '}
              <span onClick={() => setShowModal(true)} className=''>
                {col.collectionName}
              </span>
            </li>
          ))
        ) : (
          <Link
            to='/collection/create'
            className='text-brand-color hover:text-hovered font-bold'
          >
            Please create a collection first
          </Link>
        )}
      </ul>
    </>
  );
}
