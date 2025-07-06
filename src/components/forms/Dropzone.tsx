'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type DropzoneProps = {
  onDrop: (files: File[]) => void;
};

export default function Dropzone({ onDrop }: DropzoneProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: File[]) => {
    onDrop(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  }, [onDrop]);

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

  // 🔁 Cleanup on unmount
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

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
