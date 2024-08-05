//import { Card, Image, Text, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { ComboboxItem, Select } from '@mantine/core';
import '@mantine/core/styles.css';



interface MapSelectProps {
    onSelect: (value: string | null) => void;
  }


function MapSelect({onSelect}:MapSelectProps) {
    const [value, setValue] = useState<ComboboxItem | null>(null);
    const handleChange = (_value: string | null, option: ComboboxItem | null) => {
    setValue(option);
    onSelect(option ? option.value : null);
    };
  return (
    <div>
    <Select
      label = 'Map:'
      placeholder="Select a Map"
      data={[
        { value: 'haven', label: 'Haven' },
        { value: 'bind', label:'Bind'},
        { value:'ascent', label: 'Ascent'}
        ]}
      
      value={value ? value.value : null}
      onChange= {handleChange}//{(_value, option) => setValue(option)}
    />
    </div>
  );
}
 export default MapSelect;