import { useState } from 'react';
import CreateLogo from '../components/Collection/CreateLogo';
import CreateBanner from '../components/Collection/CreateBanner';
import CreateBio from '../components/Collection/CreateBio';
import SelectBlockchain from '../components/Collection/SelectBlockchain';

export interface Bc {
  name: string;
  id: number;
}

export default function CreateCollectionPage() {
  const bcList = [
    { name: 'Solana', id: 1 },
    { name: 'Bitcoin', id: 2 },
    { name: 'Dogecoin', id: 3 },
    { name: 'Ethereum', id: 4 },
    { name: 'Ethereum Classic', id: 5 },
  ];

  const [bc, setBc] = useState<Bc>(bcList[0]);
  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);
  const [bannerFile, setBannerFile] = useState<File | undefined>(undefined);
  const [logoString, setLogoString] = useState<string>('');
  const [bannerString, setBannerString] = useState<string>('');
  const [logoName, setLogoName] = useState<string>('');
  const [bannerName, setBannerName] = useState<string>('');

  return (
    <div className='mt-20 max-w-2xl mx-auto p-6'>
      <div className='flex flex-col items-center space-y-10'>
        <h1 className='text-5xl font-bold'>Create a Collection</h1>
        <span className='ml-auto text-sm'>
          <span className='text-red-500 font-bold align-top'>*</span> Required
          fields{' '}
        </span>

        <SelectBlockchain bcList={bcList} bc={bc} setBc={setBc} />
        <CreateLogo
          logoFile={logoFile}
          setLogoFile={setLogoFile}
          logoString={logoString}
          setLogoString={setLogoString}
          setLogoName={setLogoName}
        />
        <CreateBanner
          bannerFile={bannerFile}
          setBannerFile={setBannerFile}
          bannerString={bannerString}
          setBannerString={setBannerString}
          setBannerName={setBannerName}
        />
        <CreateBio bc={bc} logoName={logoName} bannerName={bannerName} />
      </div>
    </div>
  );
}
