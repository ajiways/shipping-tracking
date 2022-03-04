import { OrderStatus } from '../service-definitons/navigation.service.interface';

export interface OrderInterface {
  id: number;
  orderStatus: OrderStatus;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  currentLat?: number;
  currentLng?: number;
}
