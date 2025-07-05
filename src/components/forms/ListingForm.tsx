'use client';

import { useForm, Controller } from 'react-hook-form';
import Dropzone from './Dropzone';
import PreviewCard from './PreviewCard';
import PriceInput from './PriceInput';
import CategorySelect from './CategorySelect';

// ✅ Define your form structure
type ListingFormData = {
  title: string;
  price: string;
  email: string;
  category: string;
  images: File[];
};

export default function ListingForm() {
  // ✅ Use form with typed generic
  const { register, handleSubmit, watch, control } = useForm<ListingFormData>();
  const formData = watch();

  // ✅ onSubmit is now strongly typed
  const onSubmit = (data: ListingFormData) => {
    console.log('Submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      {/* 🔽 Dropzone with custom file input */}
      <Controller
        control={control}
        name="images"
        defaultValue={[]}
        render={({ field }) => (
          <Dropzone onDrop={(files) => field.onChange(files)} />
        )}
      />

      {/* 📝 Item Title */}
      <input
        {...register('title', { required: true })}
        placeholder="Item Title"
        className="w-full border px-3 py-2 rounded-md"
      />

      {/* 💰 PriceInput via Controller */}
      <Controller
        control={control}
        name="price"
        defaultValue=""
        render={({ field }) => (
          <PriceInput value={field.value} onChange={field.onChange} />
        )}
      />

      {/* 📧 Email input */}
      <input
        {...register('email', {
          required: true,
          pattern: /^\S+@\S+$/i,
        })}
        placeholder="Contact Email"
        className="w-full border px-3 py-2 rounded-md"
      />

      {/* 🧭 CategorySelect as controller */}
      <Controller
        control={control}
        name="category"
        defaultValue=""
        render={({ field }) => (
          <CategorySelect value={field.value} onChange={field.onChange} />
        )}
      />

      {/* 🖼️ Live Preview */}
      <PreviewCard data={formData} />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Post Listing
      </button>
    </form>
  );
}
