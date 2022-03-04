import { Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Order } from '../../../types-reducers/order';
import { lineSymbol } from '../../common/polyline';

interface Props {
  map: google.maps.Map;
  order: Order;
}

export const HandedOrder: FC<Props> = ({ order, map }) => {
  map.setCenter({ lat: order.startLat, lng: order.startLng });

  const mapsDiv = document.getElementById('map')!;
  mapsDiv!.className = 'map';

  useEffect(() => {
    let marker = new google.maps.Marker({
      map,
      icon: lineSymbol
    });
    drawMarker(order, marker);
    return () => {
      deleteMarker(marker);
    };
  }, [order]);

  return (
    <div>
      <Typography.Title style={{ textAlign: 'center', fontSize: '30px' }}>
        Номер {order.id} - {order.orderStatus}
      </Typography.Title>
    </div>
  );
};

function drawMarker(data: Order, marker: google.maps.Marker) {
  marker.setPosition({ lat: data.currentLat!, lng: data.currentLng! });
}

function deleteMarker(marker: google.maps.Marker) {
  marker.setMap(null);
}
