import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='h-16 sticky justify-between top-0 flex items-center space-x-5 px-3'>
      <Link to='/' className='font-bold'>
        Unsplash
      </Link>
      <input
        type='text'
        className='bg-gray-200 rounded-full p-3 w-full outline-none'
        placeholder='Search items and collections...'
      />
      <Link
        to='/collections'
        className='min-w-fit font-bold hidden sm:inline-block'
      >
        My Collections
      </Link>
      <Link to='/collections/create' className='font-bold hidden sm:inline'>
        Create
      </Link>
      <Link
        to='/account'
        className='inline-block min-w-fit
      '
      >
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
