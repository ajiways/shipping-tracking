import { Search } from './../Search/Search';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { OrderStatus } from '../../types-reducers/order';
import { DeliveredOrder } from '../OrderStatus/PackingOrder/PackingOrder';
import { PackingOrder } from '../OrderStatus/DeliveredOrder/DeliveredOrder';
import { WaitingOrder } from '../OrderStatus/WaitingOrder/WaitingOrder';
import { HandedOrder } from '../OrderStatus/HandedOrder/HandedOrder';
import Preloader from '../common/Preloader';
import { FC } from 'react';

export const MainOrder: FC = () => {
  const { order, isLoading, loaded } = useTypedSelector((state) => state.order);
  return (
    <>
      <Search />
      {isLoading ? (
        <Preloader />
      ) : loaded ? (
        order?.orderStatus ? (
          (order.orderStatus === OrderStatus.deliveredOrder ? (
            <DeliveredOrder />
          ) : (
            <></>
          ),
          order.orderStatus === OrderStatus.packingOrder ? (
            <PackingOrder />
          ) : (
            <></>
          ),
          order.orderStatus === OrderStatus.waitingOrder ? (
            <WaitingOrder />
          ) : (
            <></>
          ),
          order.orderStatus === OrderStatus.handedToCourier ? (
            <HandedOrder />
          ) : (
            <></>
          ))
        ) : (
          <>Заказ не найден</>
        )
      ) : (
        <></>
      )}
    </>
  );
};
