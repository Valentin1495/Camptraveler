import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import { MdCollections } from 'react-icons/md';
import { RiPencilFill } from 'react-icons/ri';
import { BiUserCircle } from 'react-icons/bi';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { FormEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../api/NFTeamApi';
import useLogout from '../../hooks/useLogout';

export default function Header() {
  const [searchValue, setSearchValue] = useState<string>('');

  const navigate = useNavigate();

  const params = { q: searchValue };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    navigate({
      pathname: '/search',
      search: `?${createSearchParams(params)}`,
    });
  };

  const id = localStorage.getItem('id');

  const { error, data } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id!),
    retry: 1,
  });

  return (
    <header className='h-16 z-30 bg-white sticky justify-between top-0 flex items-center pr-8 pl-6'>
      <Link to='/' className='font-bold flex items-center'>
        <img
          src='https://www.nfteam008.com/static/media/logo.eec723a59df921859c59.png'
          alt='Team logo'
          className='h-10 w-10 object-cover'
        />
        <h1 className='hidden lg:block'>NFTeam</h1>
      </Link>
      <form onSubmit={handleSubmit} className='w-3/5'>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type='text'
          className='bg-gray-200 rounded-full p-3 w-full outline-none'
          placeholder='Search items and collections...'
        />
      </form>
      <Link
        to='/collections'
        className='min-w-fit md:flex items-center space-x-2 font-bold'
      >
        <MdCollections className='h-6 w-6' />
        <h1 className='hidden lg:block'>My Collections</h1>
      </Link>
      <Link
        to='/collections/create'
        className='font-bold md:flex items-center space-x-2'
      >
        <RiPencilFill className='h-6 w-6' />
        <h1 className='hidden lg:block'>Create</h1>
      </Link>
      <section className='relative'>
        <Link to='/account' className='profile-pic inline-block min-w-fit'>
          {data ? (
            <img
              src={data.member.profileImageName}
              alt='Profile picture'
              className='w-8 h-8 rounded-full object-cover
          '
            />
          ) : (
            <BiUserCircle className='h-8 w-8' />
          )}
        </Link>
        <ul className='bg-gray-200 opacity-0 absolute w-32 top-[calc(100%)] right-0 p-1.5 rounded-sm'>
          <li className='flex items-center space-x-1.5'>
            <HiArrowRightOnRectangle className='h-6 w-6' />
            <span>Log Out</span>
          </li>
        </ul>
      </section>
    </header>
  );
}
