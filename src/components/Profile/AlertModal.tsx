import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApiPrivate from '../../hooks/useApiPrivate';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AlertProps {
  userId: string | undefined;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AlertModal({
  userId,
  showModal,
  setShowModal,
}: AlertProps) {
  const queryClient = useQueryClient();
  const apiPrivate = useApiPrivate();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => apiPrivate.delete(`api/members/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['members', userId]);
      window.localStorage.clear();
      window.location.replace('/');
    },
    onError: (err: AxiosError) => {
      if (err.response?.status !== 403) {
        toast.error('Something went wrong: ' + err.message);
      }
    },
  });

  return (
    <div
      className={`${
        !showModal && 'opacity-0 pointer-events-none'
      } duration-300`}
    >
      <section
        onClick={() => setShowModal(false)}
        className='bg-overlay fixed top-0 left-0 bottom-0 right-0 z-30'
      />
      <section className='space-y-5 p-5 rounded-md bg-white top-1/2 z-30 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed '>
        <p className='text-lg font-bold'>Are you sure?</p>
        <article className='flex space-x-2'>
          <button
            onClick={() => mutate()}
            disabled={isLoading}
            className='disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 border-2 rounded-md hover:shadow-md px-2 py-0.5 text-brand-color w-1/2'
          >
            {isLoading ? 'Removing...' : 'Yes'}
          </button>
          <button
            onClick={() => setShowModal(false)}
            className='w-1/2 bg-brand-color hover:bg-hovered text-white rounded-md'
          >
            No
          </button>
        </article>
      </section>
    </div>
  );
}
