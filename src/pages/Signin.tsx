import { QueryClient, useMutation } from '@tanstack/react-query';
import { login } from '../api/NFTeamApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserInfo } from './Register';
import useAuth from '../hooks/useAuth';

export type User = Omit<UserInfo, 'nickname'>;

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
  })
  .required();

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(SignupSchema),
  });

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const setAuth = useAuth()?.setAuth;
  const [errMsg, setErrMsg] = useState<string>('');
  const queryClient = new QueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (user: User) => login(user),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      if (setAuth) {
        setAuth({
          id: res.data.id,
          email: res.data.email,
          profileImageName: res.data.profileImageName,
          accessToken: res.headers.authorization,
          refreshToken: res.headers.refreshtoken,
        });
        navigate(from, { replace: true });
      }
    },
    onError: (error: AxiosError) => {
      if (!error.response) {
        setErrMsg('No server response');
      } else if (error.response.status === 403) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login failed');
      }
    },
  });

  const onSubmit = (data: User) => {
    mutate(data);
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='border-2 space-y-5 p-10 flex flex-col w-3/5 md:w-1/3 xl:w-1/5 rounded-md'
      >
        <h1 className='text-center text-brand-color text-2xl font-bold'>
          NFTeam
        </h1>

        <section className='space-y-1.5'>
          <input
            {...register('email')}
            type='text'
            className='signup-input'
            placeholder='Email'
            autoFocus
          />
          {errors.email && <p className='err-msg'>{errors.email.message}</p>}
        </section>

        <section className='space-y-1.5'>
          <input
            {...register('password')}
            type='password'
            className='signup-input'
            placeholder='Password'
          />
          {errors.password && (
            <p className='err-msg'>{errors.password.message}</p>
          )}
        </section>

        <button type='submit' className='auth-btn'>
          {isLoading ? 'Loading...' : 'Sign in'}
        </button>

        {errMsg && <p className='err-msg text-center'>{errMsg}</p>}

        <section className='text-brand-color'>
          Need an account? <br />
          <Link to='/signup' className='underline'>
            Sign up
          </Link>
        </section>
      </form>
    </div>
  );
}
