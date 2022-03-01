import { Button, Typography } from 'antd';
import { FC } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

export const WaitingOrder: FC = () => {
  const { order } = useTypedSelector((state) => state.order);
  return (
    <>
      <Typography.Title>Ожидается оплата</Typography.Title>
      <Typography.Text style={{ fontSize: '20px', marginRight: '40px' }}>
        Номер заказа {order}
      </Typography.Text>
      <Button>Оплатить</Button>
    </>
  );
};
