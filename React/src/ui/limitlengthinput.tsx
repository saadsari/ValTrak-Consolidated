import { NumberInput, NumberInputProps } from '@mantine/core';
import { useState } from 'react';

interface LimitedNumberInputProps extends NumberInputProps {
  maxLength?: number;
}

export default function LimitedNumberInput({ maxLength = 3, ...props }: LimitedNumberInputProps) {
  const [value, setValue] = useState<number | ''>('');

  const handleChange = (newValue: string | number) => {
    let numValue: number | '' = '';

    // If the value is a string, process it
    if (typeof newValue === 'string') {
      // Remove any non-digit characters and ensure it's an integer
      const sanitizedValue = newValue.replace(/[^\d]/g, '');
      numValue = parseInt(sanitizedValue, 10);
    } else {
      numValue = Math.floor(newValue);
    }

    // Convert number to string and check its length
    const numValueStr = numValue.toString();

    // Truncate the value if it exceeds maxLength
    if (numValueStr.length > maxLength) {
      numValue = parseInt(numValueStr.slice(0, maxLength), 10);
    }

    setValue(numValue);
  };

  return (
    <NumberInput
      {...props}
      value={value}
      onChange={handleChange}
    />
  );
}
