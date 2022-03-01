export interface interpC {
  lat: number;
  lng: number;
}

export interface interpolitedCoordinates {
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface CoordinatesData {
  coordinates: { lat: number; lng: number };
  count: string;
  start: number;
  end: number;
}

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен'
}

export interface OrderWS {
  id: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  orderStatus: OrderStatus;
  data: string;
}

export interface OrderToServer {
  id: number;
  currentLat: number;
  currentLng: number;
  orderStatus: OrderStatus;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}
