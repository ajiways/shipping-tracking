import { Input } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useActions } from '../../hooks/useActions';

export const Search: FC = () => {
  const [query, setQuery] = useState('');
  const { FetchOrder, SendOrder } = useActions();

  return (
    <div>
      <Input.Search
        placeholder="Введите заказ"
        style={{ margin: '0 0 10px 0' }}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={() => {
          FetchOrder(query);
        }}
      ></Input.Search>
      <Input.Search
        placeholder="Введите заказsss"
        style={{ margin: '0 0 10px 0' }}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={() => {
          SendOrder(query);
        }}
      ></Input.Search>
    </div>
  );
};
