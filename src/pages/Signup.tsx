import { QueryClient, useMutation } from '@tanstack/react-query';
import { signup } from '../api/collectionApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface UserInfo {
  email: string;
  password: string;
  nickname: string;
}

const SignupSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
    nickname: yup.string().required(),
  })
  .required();

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfo>({
    resolver: yupResolver(SignupSchema),
  });

  const queryClient = new QueryClient();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (userInfo: UserInfo) => signup(userInfo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  const onSubmit = (data: UserInfo) => {
    mutate(data);
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='border-2 space-y-7 p-10 flex flex-col items-center rounded-md'
      >
        <h1 className='text-brand-color text-2xl font-bold'>NFTeam</h1>
        <input
          {...register('email')}
          type='email'
          className='signup-input'
          placeholder='Email'
        />
        {errors.email && (
          <p className='text-red-500 text-sm'>{errors.email.message}</p>
        )}
        <input
          {...register('password')}
          type='password'
          className='signup-input'
          placeholder='Password'
        />
        {errors.password && (
          <p className='text-red-500 text-sm'>{errors.password.message}</p>
        )}
        <input
          {...register('nickname')}
          type='text'
          className='signup-input'
          placeholder='Nickname'
        />
        {errors.nickname && (
          <p className='text-red-500 text-sm'>{errors.nickname.message}</p>
        )}

        <button
          type='submit'
          className='px-3 py-1.5 font-bold hover:opacity-80 text-white bg-brand-color rounded-md'
        >
          {isLoading ? 'Loading...' : 'Sign up'}
        </button>

        {isError && error instanceof Error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
}
