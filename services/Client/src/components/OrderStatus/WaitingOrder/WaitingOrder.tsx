import { Button, Card, Table, Typography } from 'antd';
import { FC } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Order } from '../../../types-reducers/order';

interface Props {
  order: Order;
}

export const WaitingOrder: FC<Props> = ({ order }) => {
  const { id } = order;
  const { isLoadingPaid } = useTypedSelector((state) => state.order);
  const { PaymentConfirm } = useActions();
  const mapsDiv = document.getElementById('map')!;
  mapsDiv!.className = 'map__hidden';

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
        title={`Заказ номер: ${order.id} - ${order.orderStatus}`}
        style={{ width: '40%', margin: '20px auto 20px' }}
      >
        <Table
          columns={columns}
          dataSource={data}
          size="middle"
          pagination={false}
        >
          <Typography.Text>
            Координаты начала: {order.startLat}, {order.startLng}
          </Typography.Text>
        </Table>
        <Button
          type="primary"
          size="large"
          loading={isLoadingPaid}
          style={{ width: '100%', marginTop: '25px' }}
          onClick={() => {
            PaymentConfirm(id);
          }}
        >
          Оплатить
        </Button>
      </Card>
    </>
  );
};
