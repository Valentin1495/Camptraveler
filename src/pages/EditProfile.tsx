import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getMyPage } from '../api/NFTeamApi';
import { Profile } from './Account';
import ProfileLogo from '../components/Profile/ProfileLogo';
import ProfileBanner from '../components/Profile/ProfileBanner';
import ProfileBio from '../components/Profile/ProfileBio';
import useApiPrivate from '../hooks/useApiPrivate';

export default function EditProfile() {
  const [profileLogo, setProfileLogo] = useState<string>('');
  const [profileBanner, setProfileBanner] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [logoName, setLogoName] = useState<string>('');
  const [bannerName, setBannerName] = useState<string>('');

  const apiPrivate = useApiPrivate();
  const accessToken = localStorage.getItem('accessToken');

  const { isLoading, data } = useQuery<Profile>({
    queryKey: ['myPage'],
    queryFn: () => getMyPage(apiPrivate, accessToken),
    enabled: !!accessToken,
    onSuccess: (data) => {
      setProfileLogo(data.member.profileImageName);
      setProfileBanner(data.member.bannerImageName);
      setNickname(data.member.nickname);
      setDesc(data.member.description);
    },
  });

  return (
    <div className='max-w-2xl mx-auto p-6 mt-20'>
      <div className='flex flex-col items-center space-y-10'>
        <h1 className='text-5xl font-bold'>Profile details</h1>
        <span className='ml-auto text-sm'>
          <span className='text-red-500 font-bold align-top'>*</span> Required
          fields{' '}
        </span>

        {isLoading && (
          <h5
            className='mt-3
          font-bold text-gray-500'
          >
            Uploading profile images...
          </h5>
        )}

        <ProfileLogo
          profileLogo={profileLogo}
          setProfileLogo={setProfileLogo}
          setLogoName={setLogoName}
        />
        <ProfileBanner
          profileBanner={profileBanner}
          setProfileBanner={setProfileBanner}
          setBannerName={setBannerName}
        />
        <ProfileBio
          profileImageName={logoName || profileLogo}
          bannerImageName={bannerName || profileBanner}
          id={data?.member.memberId}
          nickname={nickname}
          description={desc}
        />
      </div>
    </div>
  );
}
