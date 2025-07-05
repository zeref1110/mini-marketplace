'use client';

import { useForm, Controller } from 'react-hook-form';
import Dropzone from './Dropzone';
import PreviewCard from './PreviewCard';
import PriceInput from './PriceInput';
import CategorySelect from './CategorySelect';

export type ListingFormData = {
  title: string;
  price: string;
  email: string;
  category: string;
  images: File[];
  location: string;
  description: string;
};

export default function ListingForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
  } = useForm<ListingFormData>({
    defaultValues: {
      title: '',
      price: '',
      email: '',
      category: '',
      images: [],
      location: '',
      description: '',
    },
  });

  const formData = watch();

  const onSubmit = (data: ListingFormData) => {
    console.log('Submitted:', data);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* 📋 Form on the Left */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-1/3 space-y-4"
      >
        {/* 🖼 Dropzone */}
        <Controller
          control={control}
          name="images"
          render={({ field }) => (
            <Dropzone onDrop={(files: File[]) => field.onChange(files)} />
          )}
        />

        <input
          {...register('title', { required: true })}
          placeholder="Item Title"
          className="w-full border px-3 py-2 rounded-md"
        />

        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <PriceInput value={field.value} onChange={field.onChange} />
          )}
        />

        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <CategorySelect value={field.value} onChange={field.onChange} />
          )}
        />

        <input
          {...register('location', { required: true })}
          placeholder="Location"
          className="w-full border px-3 py-2 rounded-md"
        />
        
        <input
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          placeholder="Contact Email"
          className="w-full border px-3 py-2 rounded-md"
        />

        <textarea
          {...register('description', { required: true })}
          placeholder="Description"
          rows={4}
          className="w-full border px-3 py-2 rounded-md resize-none"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Post Listing
        </button>
      </form>

      {/* 🖼 Live Preview on the Right */}
      <div className="w-full lg:w-2/3">
        <PreviewCard data={formData} />
      </div>
    </div>
  );
}
