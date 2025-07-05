'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';

type DropzoneProps = {
  onDrop: (files: File[]) => void;
};

export default function Dropzone({ onDrop }: DropzoneProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      onDrop(files);

      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviews(urls);
    },
    [onDrop]
  );

  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={preventDefaults}
      onDragEnter={preventDefaults}
      className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center"
    >
      <p className="text-gray-600 mb-2">Drag & drop files here</p>
      <div className="flex gap-2 overflow-x-auto">
        {previews.map((url, i) => (
          <Image
            key={i}
            src={url}
            alt={`preview-${i}`}
            className="w-24 h-24 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}
