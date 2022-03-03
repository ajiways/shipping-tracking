import { Search } from './../Search/Search';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { Order, OrderStatus } from '../../types-reducers/order';
import { HandedOrder } from '../OrderStatus/HandedOrder/HandedOrder';
import Preloader from '../common/Preloader';
import { FC } from 'react';
import { Col, Row } from 'antd';
import { DeliveredOrder } from '../OrderStatus/DeliveredOrder/DeliveredOrder';
import { PackingOrder } from '../OrderStatus/PackingOrder/PackingOrder';
import { WaitingOrder } from '../OrderStatus/WaitingOrder/WaitingOrder';

interface Props {
  map: google.maps.Map;
}

export const MainOrder: FC<Props> = ({ map }) => {
  const { order, error, isLoading, loaded } = useTypedSelector(
    (state) => state.order
  );

  let mockData: Order = {
    endLat: 10,
    id: 20,
    startLat: 30.12321321321321321,
    startLng: 30.12321321321321321,
    endLng: 1,
    orderStatus: OrderStatus.packingOrder
  };
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
          <>{StatusReturn(order, map)}</>
        ) : (
          <>Такого заказа нет</>
        )
      ) : (
        <></>
      )}
    </>
  );
};

function StatusReturn(order: Order, map: google.maps.Map) {
  switch (order.orderStatus) {
    case OrderStatus.deliveredOrder:
      return <DeliveredOrder order={order} />;
    case OrderStatus.handedToCourier:
      return <HandedOrder order={order} map={map} />;
    case OrderStatus.packingOrder:
      return <PackingOrder order={order} />;
    case OrderStatus.waitingOrder:
      return <WaitingOrder order={order} />;
    default:
      break;
  }
}

// id={order.id}
// startLat={order.startLat}
// startLng={order.startLng}
// endLat={order.endLat}
// endLng={order.endLng}
// orderStatus={order.orderStatus}
