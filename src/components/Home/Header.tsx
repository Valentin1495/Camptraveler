import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import { MdCollections } from 'react-icons/md';
import { RiPencilFill } from 'react-icons/ri';
import { BiUserCircle } from 'react-icons/bi';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { HiArrowLeftOnRectangle } from 'react-icons/hi2';
import { FormEvent, useState } from 'react';
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

  const accessToken = localStorage.getItem('accessToken');
  const profilePic = localStorage.getItem('profilePic');
  const id = localStorage.getItem('id');

  return (
    <header className='h-16 z-30 bg-white sticky justify-between top-0 flex items-center sm:pr-8 pr-2.5 sm:pl-6'>
      <Link to='/' className='font-bold flex items-center'>
        <img
          src='https://www.nfteam008.com/static/media/logo.eec723a59df921859c59.png'
          alt='Team logo'
          className='h-10 w-10 object-cover'
        />
        <h1 className='hidden lg:block'>NFTeam</h1>
      </Link>
      <form onSubmit={handleSubmit} className='w-1/2 sm:w-3/5'>
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
        to='/asset/create'
        className='font-bold md:flex items-center space-x-2'
      >
        <RiPencilFill className='h-6 w-6' />
        <h1 className='hidden lg:block'>Create</h1>
      </Link>
      <section className='relative mt-0.5 min-w-fit h-full'>
        {profilePic ? (
          <Link
            to={'/account/' + id}
            className='dropdown-link h-full flex items-center'
          >
            <img
              src={profilePic}
              alt='Profile picture'
              className='w-8 h-8 rounded-full object-cover'
            />
          </Link>
        ) : (
          <Link to='/signin' className='dropdown-link h-full flex items-center'>
            <BiUserCircle className='h-8 w-8' />
          </Link>
        )}
        <article className='dropdown-menu shadow-md bg-white top-[calc(100%)] opacity-0 absolute w-32 right-0 rounded-sm'>
          {accessToken ? (
            <button
              onClick={() => useLogout()}
              className='flex items-center w-full p-1.5 space-x-1.5'
            >
              <HiArrowRightOnRectangle className='h-6 w-6' />
              <span className='font-bold'>Log Out</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/signin')}
              className='flex items-center w-full p-1.5 space-x-1.5'
            >
              <HiArrowLeftOnRectangle className='h-6 w-6' />
              <span className='font-bold'>Log In</span>
            </button>
          )}
        </article>
      </section>
    </header>
  );
}
