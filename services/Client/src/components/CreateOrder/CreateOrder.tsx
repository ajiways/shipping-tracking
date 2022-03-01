import { useEffect, useState } from 'react';
import { FormOrder } from './FormOrder';
import * as io from 'socket.io-client';

export interface OrderCoordinates {
  id: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  orderStatus: OrderStatus;
  currentLat: number;
  currentLng: number;
}

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен'
}

export const CreateOrder = () => {
  const [position, setPosition] = useState({ lat: 51.77, lng: 55.1 });
  const divMap = document.getElementById('map');
  const mapOptions: google.maps.MapOptions = {
    center: position,
    zoom: 12
  };
  const map = new google.maps.Map(document.getElementById('map')!, mapOptions);

  const marker = new google.maps.Marker({
    map,
    position: { lat: 55, lng: 55 }
  });
  const socket = io.connect('http://localhost:3002');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });

    divMap!.className = 'map';
    return () => {
      divMap!.className = 'map__hidden';
    };
  }, []);

  socket.on('coordinatesServer', (data: OrderCoordinates) => {
    console.log(data);
    marker.setPosition({ lat: data.currentLat, lng: data.currentLng });
  });

  useEffect(() => {
    let infoWindow = new google.maps.InfoWindow({});
    map.addListener('click', (mapsMouseEvent) => {
      infoWindow.close();
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng
      });
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
      infoWindow.open(map);
    });
  }, [position]);

  return (
    <>
      <FormOrder />
    </>
  );
};
