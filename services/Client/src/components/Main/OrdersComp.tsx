import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Order, OrderStatus } from '../../types-reducers/order';
import { HandedOrder } from '../OrderStatus/HandedOrder/HandedOrder';
import Preloader from '../common/Preloader';
import { FC } from 'react';
import { DeliveredOrder } from '../OrderStatus/DeliveredOrder/DeliveredOrder';
import { PackingOrder } from '../OrderStatus/PackingOrder/PackingOrder';
import { WaitingOrder } from '../OrderStatus/WaitingOrder/WaitingOrder';
import { UndefinedOrder } from '../OrderStatus/UndefinedOrder/UndefinedOrder';

export const OrdersComp: FC<PropsOrdersC> = ({ map, query }) => {
  const { order, error, isLoading, loaded } = useTypedSelector(
    (state) => state.order
  );
  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : loaded ? (
        error ? (
          <>Ошибка</>
        ) : order?.orderStatus ? (
          <>{StatusReturn(order, map)}</>
        ) : (
          <UndefinedOrder query={query} />
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

interface PropsOrdersC {
  map: google.maps.Map;
  query: string;
}
