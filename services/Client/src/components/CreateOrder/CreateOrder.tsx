import { FC, useEffect, useState } from 'react';
import { FormOrder } from './FormOrder';

interface Props {
  map: google.maps.Map;
}

export const CreateOrder: FC<Props> = ({ map }) => {
  const divMap = document.getElementById('map');
  const [position, setPosition] = useState({ lat: 51.77, lng: 55.1 });

  useEffect(() => {
    // Запрос на получение геолокации
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });

    let infoWindow = new google.maps.InfoWindow({});
    divMap!.className = 'map';
    const listener = map.addListener('click', (mapsMouseEvent) => {
      infoWindow.close();
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng
      });
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
      infoWindow.open(map);
    });
    return () => {
      divMap!.className = 'map__hidden';
      infoWindow.close();
      listener.remove();
    };
  }, []);

  map.setCenter(position);

  return (
    <>
      <FormOrder />
    </>
  );
};
