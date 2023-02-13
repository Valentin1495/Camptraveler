import { useState } from 'react';
import BlockchainModal from './BlockchainModal';
import { createPortal } from 'react-dom';

export default function SelectBlockchain() {
  const bcList = [
    'Solana',
    'Bitcoin',
    'Dogecoin',
    'Ethereum',
    'Ethereum Classic',
  ];

  const [bc, setBc] = useState<string>(bcList[0]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='items-center flex flex-col space-y-3'>
      <h3 className='font-bold text-lg'>Blockchain</h3>

      <span
        onClick={() => setShowModal(true)}
        className='cursor-pointer select border-gray-200 border-2 rounded-md p-2'
      >
        {bc}
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
