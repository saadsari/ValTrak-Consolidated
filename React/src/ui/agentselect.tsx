//import { Card, Image, Text, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { ComboboxItem, Select } from '@mantine/core';

interface AgentSelectProps {
  onSelect: (value: string | null) => void;
}
function AgentSelect({onSelect}:AgentSelectProps) {
    const [value, setValue] = useState<ComboboxItem | null>(null);
    const handleChange = (_value: string | null, option: ComboboxItem | null) => {
      setValue(option);
      onSelect(option ? option.value : null);
      };
  return (
    <div>
    <Select
    label='Agent:'
      data={[
        { value: 'sova', label: 'Sova' },
        { value: 'viper', label:'Viper'},
        { value:'brimstone', label: 'Brimstone'}]
      }
      placeholder="Select an Agent"
      value={value ? value.value : null}
      onChange= {handleChange}
    />
    </div>
  );
}
 export default AgentSelect;