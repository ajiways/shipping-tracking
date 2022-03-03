import 'antd/dist/antd.min.css';
import './index.css';
import { MainC } from './components/Map/Map';
import { HeaderC } from './components/Header/Header';
import * as io from 'socket.io-client';
import * as polyline from 'google-polyline';
import { useEffect } from 'react';
import { COORDSFROMSERVER, COORDSTOSERVER } from './constants/constants';
import {
  interpC,
  OrderToServer,
  OrderWS
} from './components/Map/Map.interface';

const socket = io.connect('http://localhost:3002');
export default function App() {
  const mapOptions = {
    center: { lat: 55.999773, lng: 92.870019 },
    zoom: 13
  };

  const map = new google.maps.Map(document.getElementById('map')!, mapOptions);

  useEffect(() => {
    socket.on(COORDSFROMSERVER, (data: OrderWS) => {
      draw(data, map);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <div>
        <div style={{ margin: '50px' }}></div>
      </div>
    </div>
  );
}

async function draw(data: OrderWS, map) {
  const pathCoordinat = polyline.decode(data.data);
  console.log(pathCoordinat);
  let arraySnapped: interpC[] = [];
  for (let i = 0; i < pathCoordinat.length; i++) {
    let latlng = {
      lat: pathCoordinat[i][0],
      lng: pathCoordinat[i][1]
    };
    arraySnapped.push(latlng);
  }
  let snappedPolyline = new google.maps.Polyline({
    path: arraySnapped,
    strokeColor: '#fc9c9c',
    strokeWeight: 6
  });
  snappedPolyline.setMap(map);
  animateCircle(arraySnapped, data);
}

function animateCircle(pathCoordinates, data: OrderWS) {
  let count = 0;
  // fallback icon if the poly has no icon to animate
  const length = pathCoordinates.length;
  let countLength = 0;
  const interval = setInterval(() => {
    count = count + 1;
    let position = google.maps.geometry.spherical.interpolate(
      pathCoordinates[countLength],
      pathCoordinates[countLength + 1],
      count / 200
    );
    let obj: OrderToServer = {
      id: data.id,
      currentLat: position.lat(),
      currentLng: position.lng(),
      orderStatus: data.orderStatus,
      startLat: data.startLat,
      startLng: data.startLng,
      endLat: data.endLat,
      endLng: data.endLng
    };
    socket.emit(COORDSTOSERVER, obj);
    if (count === 200) {
      count = 0;
      countLength += 1;
    }
    if (countLength === length - 1) {
      console.log('SMENA');
      socket.emit('CoordinatesEnd', data);
      clearInterval(interval);
    }
  }, 100);
}
