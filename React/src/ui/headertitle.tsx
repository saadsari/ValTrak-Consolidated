import { Link } from 'react-router-dom';
import { Title } from '@mantine/core';

export default function ValTrakTitle() {
  return (
    <Link to="/">
      <Title c='#EFEFEF' order={4}>ValTrak</Title>
    </Link>
  );
};

