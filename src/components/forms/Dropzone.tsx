'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type DropzoneProps = {
  onDrop: (files: File[]) => void;
  value?: File[]; // optional controlled prop to track external reset
};

export default function Dropzone({ onDrop, value = [] }: DropzoneProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewsRef = useRef<string[]>([]); // used for cleanup tracking

  const handleFiles = useCallback(
    (files: File[]) => {
      onDrop(files);

      // Revoke old previews first to prevent memory leaks
      previewsRef.current.forEach((url) => URL.revokeObjectURL(url));

      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviews(urls);
      previewsRef.current = urls;
    },
    [onDrop]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    },
    [handleFiles]
  );

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  // Clear previews if value is reset externally
  useEffect(() => {
    if (value.length === 0 && previewsRef.current.length > 0) {
      previewsRef.current.forEach((url) => URL.revokeObjectURL(url));
      previewsRef.current = [];
      setPreviews([]);
    }
  }, [value]);

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      previewsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={preventDefaults}
      onDragEnter={preventDefaults}
      onClick={handleClick}
      className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center cursor-pointer hover:bg-gray-50"
    >
      <input
        type="file"
        ref={inputRef}
        multiple
        accept="image/*"
        onChange={handleSelect}
        className="hidden"
      />
      <p className="text-gray-600 mb-2">Click or drag & drop images here</p>
      <div className="flex gap-2 overflow-x-auto">
        {previews.map((url, i) => (
          <div key={i} className="relative w-24 h-24">
            <Image
              src={url}
              alt={`preview-${i}`}
              fill
              className="object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
