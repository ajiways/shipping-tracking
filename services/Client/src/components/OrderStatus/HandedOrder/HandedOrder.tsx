import { Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Order } from '../../../types-reducers/order';
import { lineSymbol } from '../../common/polyline';

export const HandedOrder: FC = () => {
  const { order } = useTypedSelector((state) => state.order);

  const mapOptions: google.maps.MapOptions = {
    center: { lat: order!.startLat, lng: order!.startLng },
    zoom: 8
  };

  const mapsDiv = document.getElementById('map')!;
  mapsDiv!.className = 'map';
  let map = new google.maps.Map(mapsDiv, mapOptions);

  useEffect(() => {
    let marker = new google.maps.Marker({
      map,
      icon: lineSymbol
    });

    return () => {
      const maps = document.getElementById('map');
      maps!.className = 'map__hidden';
      deleteMarker(marker);
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
