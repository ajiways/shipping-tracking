import { Search } from './../Search/Search';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { Order, OrderStatus } from '../../types-reducers/order';
import { DeliveredOrder } from '../OrderStatus/PackingOrder/PackingOrder';
import { PackingOrder } from '../OrderStatus/DeliveredOrder/DeliveredOrder';
import { WaitingOrder } from '../OrderStatus/WaitingOrder/WaitingOrder';
import { HandedOrder } from '../OrderStatus/HandedOrder/HandedOrder';
import Preloader from '../common/Preloader';
import { FC } from 'react';
import { FormOrder } from '../CreateOrder/FormOrder';
import { Col, Row } from 'antd';

export const MainOrder: FC = () => {
  const { order, error, isLoading, loaded } = useTypedSelector(
    (state) => state.order
  );
  return (
    <>
      <Row>
        <Col span={24}>
          <Search />
        </Col>
      </Row>
      {isLoading ? (
        <Preloader />
      ) : loaded ? (
        error ? (
          <span>Такого заказа нет</span>
        ) : order?.orderStatus ? (
          <>{StatusReturn(order)}</>
        ) : (
          <>Такого заказа нет</>
        )
      ) : (
        <></>
      )}
    </>
  );
};

function StatusReturn(order: Order) {
  switch (order.orderStatus) {
    case OrderStatus.deliveredOrder:
      return <DeliveredOrder />;
    case OrderStatus.handedToCourier:
      return <HandedOrder />;
    case OrderStatus.packingOrder:
      return <PackingOrder />;
    case OrderStatus.waitingOrder:
      return <WaitingOrder />;
    default:
      break;
  }
}
