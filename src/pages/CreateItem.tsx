import { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateImage from '../components/Item/CreateImage';
import CreateAsset from '../components/Item/CreateAsset';

export default function CreateItem() {
  const [itemFile, setItemFile] = useState<File | null>(null);
  const [itemString, setItemString] = useState<string>('');
  const [itemName, setItemName] = useState<string>('');

  return (
    <div className='mt-20 max-w-2xl mx-auto p-6'>
      <div className='flex flex-col items-center space-y-10'>
        <h1 className='text-5xl font-bold'>Create New Item</h1>
        <Link
          to='/collection/create'
          className='text-brand-color hover:opacity-80 text-lg font-bold'
        >
          Please create a collection before you create your own NFT
        </Link>
        <span className='ml-auto text-sm'>
          <span className='text-red-500 font-bold align-top'>*</span> Required
          fields{' '}
        </span>

        <CreateImage
          itemFile={itemFile}
          setItemFile={setItemFile}
          itemString={itemString}
          setItemString={setItemString}
          setItemName={setItemName}
        />
        <CreateAsset itemFile={itemFile} itemName={itemName} />
      </div>
    </div>
  );
}
