import { QueryClient, useMutation } from '@tanstack/react-query';
import { signup } from '../api/NFTeamApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export interface UserInfo {
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

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfo>({
    resolver: yupResolver(SignupSchema),
  });

  const [errMsg, setErrMsg] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const queryClient = new QueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (userInfo: UserInfo) => signup(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSuccess(true);
    },
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

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate(from, { replace: true });
    }
  }, [from]);

  return (
    <div className='flex items-center justify-center h-screen'>
      {success ? (
        <section className='space-y-3 text-center'>
          <h1 className='text-2xl font-bold text-brand-color'>Success!</h1>
          <Link to='/signin' className='auth-btn inline-block'>
            Sign in
          </Link>
        </section>
      ) : (
        <>
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
              {errors.email && (
                <p className='err-msg'>{errors.email.message}</p>
              )}
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

            <section className='space-y-1.5'>
              <input
                {...register('nickname')}
                type='text'
                className='signup-input'
                placeholder='Nickname'
              />
              {errors.nickname && (
                <p className='err-msg'>{errors.nickname.message}</p>
              )}
            </section>

            <button
              type='submit'
              disabled={isLoading}
              className='disabled:opacity-80 auth-btn'
            >
              {isLoading ? 'Loading...' : 'Sign up'}
            </button>

            {errMsg && <p className='err-msg text-center'>{errMsg}</p>}

            <section className='text-brand-color'>
              Already registered? <br />
              <Link to='/signin' className='underline'>
                Sign in
              </Link>
            </section>
          </form>
        </>
      )}
    </div>
  );
}
