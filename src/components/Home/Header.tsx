import { Link } from 'react-router-dom';
import { MdCollections } from 'react-icons/md';
import { RiPencilFill } from 'react-icons/ri';

export default function Header() {
  return (
    <header className='h-16 z-30 bg-white sticky justify-between top-0 flex items-center space-x-5 px-3'>
      <Link to='/' className='font-bold flex items-center'>
        <img
          src='https://www.nfteam008.com/static/media/logo.eec723a59df921859c59.png'
          alt='Team logo'
          className='h-10 w-10 object-cover'
        />
        <h1 className='hidden lg:block'>NFTeam</h1>
      </Link>
      <input
        type='text'
        className='bg-gray-200 rounded-full p-3 w-3/5 outline-none'
        placeholder='Search items and collections...'
      />
      <Link
        to='/collections'
        className='min-w-fit md:flex items-center space-x-2 font-bold'
      >
        <MdCollections className='h-6 w-6' />
        <h1 className='hidden md:block'>My Collections</h1>
      </Link>
      <Link
        to='/collections/create'
        className='font-bold md:flex items-center space-x-2'
      >
        <RiPencilFill className='h-6 w-6' />
        <h1 className='hidden md:block'>Create</h1>
      </Link>
      <Link to='/account' className='inline-block min-w-fit'>
        <img
          src='https://images.unsplash.com/photo-1675339739656-55dd61d08570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
          alt='Profile picture'
          className='w-8 h-8 rounded-full object-cover
        '
        />
      </Link>
    </header>
  );
}
