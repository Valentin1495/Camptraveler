import { QueryClient, useMutation } from '@tanstack/react-query';
import { signup } from '../api/NFTeamApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AxiosError } from 'axios';
import { useState } from 'react';

interface UserInfo {
  email: string;
  password: string;
  nickname: string;
}

const SignupSchema = yup
  .object({
    email: yup.string().email('It must be a valid email').required(),
    password: yup
      .string()
      .required()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        ' Use 8 or more characters with a mix of letters, numbers & symbols'
      ),
    nickname: yup
      .string()
      .required()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,23}$/,
        'Use between 3 and 23 characters with a mix of letters and numbers'
      ),
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

  const [errMsg, setErrMsg] = useState<string>('');
  const queryClient = new QueryClient();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (userInfo: UserInfo) => signup(userInfo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    onError: (error: AxiosError) => {
      if (!error.response) {
        setErrMsg('No server response');
      } else if (error.response.status === 400) {
        setErrMsg('This email is already in use');
      } else {
        setErrMsg('Registration failed');
      }
    },
  });

  const onSubmit = (data: UserInfo) => {
    mutate(data);
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='border-2 space-y-7 p-10 flex flex-col w-3/5 rounded-md'
      >
        <h1 className='text-center text-brand-color text-2xl font-bold'>
          NFTeam
        </h1>

        <input
          {...register('email')}
          type='text'
          className='signup-input'
          placeholder='Email'
          autoFocus
        />
        {errors.email && <p className='err-msg'>{errors.email.message}</p>}

        <input
          {...register('password')}
          type='password'
          className='signup-input'
          placeholder='Password'
        />
        {errors.password && (
          <p className='err-msg'>{errors.password.message}</p>
        )}

        <input
          {...register('nickname')}
          type='text'
          className='signup-input'
          placeholder='Nickname'
        />
        {errors.nickname && (
          <p className='err-msg'>{errors.nickname.message}</p>
        )}

        <button
          type='submit'
          className='w-fit mx-auto px-3 py-1.5 font-bold hover:opacity-80 text-white bg-brand-color rounded-md'
        >
          {isLoading ? 'Loading...' : 'Sign up'}
        </button>
        {errMsg && <p className='err-msg text-center'>{errMsg}</p>}
      </form>
    </div>
  );
}
