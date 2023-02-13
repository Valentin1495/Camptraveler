import { useState } from 'react';
import BlockchainModal from './BlockchainModal';
import { createPortal } from 'react-dom';
import { Bc } from '../../pages/CreateCollection';

interface BcProps {
  bcList: Bc[];
  bc: Bc;
  setBc: React.Dispatch<React.SetStateAction<Bc>>;
}

export default function SelectBlockchain({ bcList, bc, setBc }: BcProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='items-center flex flex-col space-y-3'>
      <h3 className='font-bold text-lg'>Blockchain</h3>

      <span
        onClick={() => setShowModal(true)}
        className='cursor-pointer select border-gray-200 border-2 rounded-md p-2'
      >
        {bc.name}
      </span>
      {showModal &&
        createPortal(
          <BlockchainModal
            bcList={bcList}
            setBc={setBc}
            setShowModal={() => setShowModal(false)}
          />,
          document.body
        )}
    </div>
  );
}
