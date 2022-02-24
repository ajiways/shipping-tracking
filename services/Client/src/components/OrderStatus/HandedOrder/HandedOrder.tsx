import { Typography } from 'antd';
import { FC, useEffect } from 'react';
import * as io from 'socket.io-client';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Order } from '../../../types-reducers/order';
import { lineSymbol } from '../../common/polyline';

export const HandedOrder: FC = () => {
  const { order } = useTypedSelector((state) => state.order);
  const socket = io.connect('http://localhost:3002');

  const mapOptions: google.maps.MapOptions = {
    center: { lat: order!.start.lat, lng: order!.start.lng },
    zoom: 8
  };
  console.log(order);
  const map = new google.maps.Map(document.getElementById('map')!, mapOptions);

  useEffect(() => {
    let marker = new google.maps.Marker({
      map,
      icon: lineSymbol
    });
    socket.on('coordinatesServer', (data: Order) => {
      drawMarker(data, marker);
    });

    return () => {
      deleteMarker(marker);
      socket.close();
    };
  }, []);

  return (
    <>
      <Typography.Title>Передан курьеру</Typography.Title>
    </>
  );
};

function drawMarker(data: Order, marker: google.maps.Marker) {
  marker.setPosition(data.coordinates);
}

function deleteMarker(marker: google.maps.Marker) {
  marker.setMap(null);
}
