import { Bc } from '../../pages/CreateCollection';

interface ModalProps {
  bcList: Bc[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBc: React.Dispatch<React.SetStateAction<Bc>>;
}

export default function BlockchainModal({
  bcList,
  setShowModal,
  setBc,
}: ModalProps) {
  const selectBc = (bc: Bc) => {
    setShowModal(false);
    setBc(bc);
  };
  return (
    <>
      <div
        onClick={() => setShowModal(false)}
        className='bg-overlay fixed top-0 bottom-0 left-0 right-0 z-30'
      />
      <ul className='cursor-pointer overflow-hidden text-center rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-30 '>
        {bcList.map((bc) => (
          <li
            key={bc.id}
            className='hover:bg-gray-100 text-lg font-semibold px-5 py-3'
            onClick={() => selectBc(bc)}
          >
            {bc.name}
          </li>
        ))}
      </ul>
    </>
  );
}
