import { Card } from 'antd';
import { FC } from 'react';

export const UndefinedOrder: FC<PropsUndefinedOrder> = ({ query }) => {
  const divMap = document.getElementById('map');
  divMap!.className = 'map__hidden';
  return (
    <Card
      headStyle={{ color: '#2f54eb' }}
      title={`Заказа c номером: ${query} - нет`}
      style={{ width: '40%', margin: '20px auto 20px' }}
      bodyStyle={{ display: 'none' }}
    ></Card>
  );
};

interface PropsUndefinedOrder {
  query: string;
}
