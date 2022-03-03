import { FC, useEffect } from 'react';
import { FormOrder } from './FormOrder';

interface Props {
  map: google.maps.Map;
}

export const CreateOrder: FC<Props> = ({ map }) => {
  const divMap = document.getElementById('map');

  useEffect(() => {
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

  return (
    <>
      <FormOrder />
    </>
  );
};
