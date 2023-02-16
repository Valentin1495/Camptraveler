import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RxCross2 } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Inputs, SuccessRes } from '../Collection/CreateBio';
import { getUser } from '../../api/NFTeamApi';
import useApiPrivate from '../../hooks/useApiPrivate';
import { ColInfo } from '../Home/Banner';
import SelectCollection from './SelectCollection';
import { toast } from 'react-toastify';

interface Profile {
  collections?: ColInfo[];
}

interface Image {
  itemFile: File | null;
  itemName: string;
}

interface ItemInfo {
  itemCollectionId: number | undefined;
  itemName: string;
  itemDescription: string;
  itemImgName: string;
}

const schema = yup.object({
  name: yup.string().required('This field is required.'),
  description: yup.string().required('This field is required.'),
});

export default function CreateAsset({ itemFile, itemName }: Image) {
  const [nameFocus, setNameFocus] = useState(false);
  const [descFocus, setDescFocus] = useState(false);
  const [collections, setCollections] = useState<ColInfo[] | []>([]);
  const [item, setItem] = useState<SuccessRes>();
  const navigate = useNavigate();
  const [colSelected, setColSelected] = useState<ColInfo>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const id = localStorage.getItem('id');

  const { isLoading: loading } = useQuery<Profile>({
    queryKey: ['members', id],
    queryFn: () => getUser(id!),
    onSuccess: (data) => {
      if (data.collections?.length) {
        setCollections(data.collections);
      }
    },
  });

  const apiPrivate = useApiPrivate();

  const { mutate, isLoading } = useMutation({
    mutationFn: (item: ItemInfo) =>
      apiPrivate.post('/api/items', item).then((res) => res.data),
    onSuccess: (data) => {
      setItem(data);
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error('Something went wrong: ' + err.message);
      }
    },
  });

  const onSubmit = async (data: Inputs) => {
    if (itemFile) {
      mutate({
        itemCollectionId: colSelected?.collectionId,
        itemName: data.name,
        itemDescription: data.description,
        itemImgName: itemName,
      });
    }
  };

  useEffect(() => {
    if (item) {
      navigate(`/collection/${colSelected?.collectionId}`);
      toast.success('Your item has been created!');
    }
  }, [item, navigate]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='text-center w-full space-y-10'
    >
      <div className='space-y-3'>
        <label htmlFor='name' className='mx-auto font-bold text-lg'>
          Name{' '}
          <span className='text-red-500 text-xl font-bold align-top'>*</span>
        </label>
        <div
          className={`border-2 duration-300 rounded-lg ${
            errors.name
              ? 'border-red-600'
              : nameFocus
              ? 'border-focused'
              : 'border-gray-300'
          }
          `}
        >
          <input
            type='text'
            {...register('name')}
            placeholder='Item name'
            className='w-full rounded-lg p-3 text-lg group outline-none h-full dark:bg-[#3d3d41]'
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
          />
        </div>
        {errors.name && (
          <p className='text-red-600 flex items-center space-x-0.5'>
            <RxCross2 className='h-6 w-6' />
            <span>{errors.name.message}</span>
          </p>
        )}
      </div>

      <div className='space-y-3'>
        <label htmlFor='description' className='mx-auto font-bold text-lg'>
          Description{' '}
          <span className='text-red-500 text-xl font-bold align-top'>*</span>
        </label>
        <div
          className={`border-2 rounded-lg duration-300 ${
            errors.description
              ? 'border-red-600'
              : descFocus
              ? 'border-focused'
              : 'border-gray-300'
          }`}
        >
          <textarea
            {...register('description')}
            className='w-full overflow-hidden -mb-1 h-52 min-h-[52px] outline-none p-3 rounded-lg text-lg dark:bg-[#3d3d41]'
            onFocus={() => setDescFocus(true)}
            onBlur={() => setDescFocus(false)}
            placeholder='Provide a detailed description of your item.'
          />
        </div>
        {errors.description && (
          <p className='text-red-600 flex items-center space-x-0.5'>
            <RxCross2 className='h-6 w-6' />
            <span>{errors.description.message}</span>
          </p>
        )}
      </div>

      <SelectCollection
        isLoading={loading}
        collections={collections}
        colSelected={colSelected}
        setColSelected={setColSelected}
      />

      <input
        type='submit'
        className='bg-brand-color disabled:cursor-not-allowed disabled:opacity-50 hover:bg-hovered cursor-pointer font-bold text-white rounded-lg px-5 py-3 text-lg'
        value='Create'
        disabled={!itemFile || !colSelected}
      />
      {isLoading && (
        <h5
          className='
        font-bold text-gray-500'
        >
          Creating an item...
        </h5>
      )}
    </form>
  );
}
