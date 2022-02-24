import { Input } from 'antd';
import { FC, useState } from 'react';
import { useActions } from '../../hooks/useActions';
export const Search: FC = () => {
  const [query, setQuery] = useState('');
  const { FetchOrder } = useActions();
  return (
    <div>
      <Input.Search
        placeholder="Введите заказ"
        allowClear
        style={{ margin: '0 0 10px 0' }}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={() => FetchOrder(query)}
      ></Input.Search>
    </div>
  );
};
