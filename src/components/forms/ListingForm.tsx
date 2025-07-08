'use client';

import { useForm, Controller } from 'react-hook-form';
import Dropzone from './Dropzone';
import PreviewCard from './PreviewCard';
import PriceInput from './PriceInput';
import CategorySelect from './CategorySelect';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export type ListingFormData = {
  title: string;
  price: string; // ✅ originally string from PriceInput
  email: string;
  category: string;
  images: File[];
  location: string;
  description: string;
};

interface ListingFormProps {
  onSuccess: () => void;
}

export default function ListingForm({ onSuccess }: ListingFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
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

  const onSubmit = async (data: ListingFormData) => {
    const loadingToast = toast.loading('Posting...');
    
    try {
      let imageUrl = '';

      if (data.images.length > 0) {
        const imageFile = data.images[0];
        const filePath = `listing-${Date.now()}-${imageFile.name}`;

        const { error: uploadError } = await supabase.storage
          .from('listing-images')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: imageFile.type || 'image/jpeg',
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error('Image upload failed');
        }

        const { publicUrl } = supabase.storage
          .from('listing-images')
          .getPublicUrl(filePath).data;

        if (!publicUrl) {
          throw new Error('Could not retrieve public image URL');
        }

        imageUrl = publicUrl;
      }

      // ✅ Create payload with correct types
      const payload = {
        title: data.title,
        price: parseFloat(data.price),
        email: data.email,
        category: data.category,
        location: data.location,
        description: data.description,
        image_url: imageUrl,
      };

      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error('Failed to post listing');
      }

      reset();
      onSuccess();
      toast.success('Listing posted successfully!', { id: loadingToast });

    } catch (error) {
      if (error instanceof Error) {
        console.error('Listing post failed:', error.message);
        toast.error(error.message, { id: loadingToast });
      } else {
        console.error('Unknown error', error);
        toast.error('An unexpected error occurred.', { id: loadingToast });
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* 📋 Form on the Left */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-1/3 space-y-4"
      >
        <Controller
          control={control}
          name="images"
          rules={{
            validate: (value) =>
              value && value.length > 0 || 'At least one image is required.',
          }}
          render={({ field, fieldState }) => (
            <>
              <Dropzone onDrop={field.onChange} value={field.value} />
              {fieldState.error && (
                <p className="text-red-600 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full cursor-pointer  disabled:cursor-not-allowed"
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