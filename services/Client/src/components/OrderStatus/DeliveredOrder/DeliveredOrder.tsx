import { Card, Table, Typography } from 'antd';
import { FC } from 'react';
import { Order } from '../../../types-reducers/order';

interface Props {
  order: Order;
}

export const DeliveredOrder: FC<Props> = ({ order }) => {
  const divMap = document.getElementById('map');
  divMap!.className = 'map__hidden';
  const columns = [
    {
      title: '',
      dataIndex: 'name'
    },
    {
      title: 'Lat',
      dataIndex: 'Lat'
    },
    {
      title: 'Lng',
      dataIndex: 'Lng'
    }
  ];

  const data = [
    {
      key: '1',
      name: 'Начальные координаты',
      Lat: order.startLat,
      Lng: order.startLng
    },
    {
      key: '2',
      name: 'Конечные координаты',
      Lat: order.endLat,
      Lng: order.endLng
    }
  ];

  return (
    <>
      <Card
        headStyle={{ color: '#2f54eb' }}
        title={`Заказ номер: ${order.id} - ${order.orderStatus}`}
        style={{ width: '40%', margin: '20px auto 20px' }}
      >
        <Table
          columns={columns}
          dataSource={data}
          size="middle"
          pagination={false}
        ></Table>
      </Card>
    </>
  );
};
