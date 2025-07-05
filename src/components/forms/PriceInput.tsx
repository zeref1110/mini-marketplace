'use client';

import { useState } from 'react';

type PriceInputProps = {
  value?: string;
  onChange: (val: string) => void;
};

export default function PriceInput({ value = '', onChange }: PriceInputProps) {
  const [rawValue, setRawValue] = useState(value);

  const formatPrice = (val: string) => {
    const numeric = val.replace(/[^0-9]/g, '');
    if (!numeric) return '';
    return parseInt(numeric, 10).toLocaleString('en-US');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    const numeric = inputVal.replace(/[^0-9]/g, '');
    setRawValue(formatPrice(numeric));
    onChange(numeric); // Send unformatted value to parent/form
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      placeholder="Price"
      value={rawValue}
      onChange={handleInput}
      className="w-full border px-3 py-2 rounded-md"
    />
  );
}
