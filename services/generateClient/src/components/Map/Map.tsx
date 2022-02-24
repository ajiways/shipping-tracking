import * as io from 'socket.io-client';
import { interpC } from './Map.interface';
import { lineSymbol, randomColor } from './polyline';
import * as polyline from 'google-polyline';

export interface OrderToWS {
  orderId: string;
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
  orderStatus: OrderStatus;
  data: string;
}

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен'
}

const socket = io.connect('http://localhost:3002');

export const MainC = () => {
  const mapOptions = {
    center: { lat: 16.064773, lng: 12.870019 },
    zoom: 13
  };

  const map = new google.maps.Map(document.getElementById('map')!, mapOptions);
  socket.on('generateCoords', (data: OrderToWS) => {
    draw(data, map);
  });
  return (
    <div>
      <div style={{ margin: '50px' }}></div>
    </div>
  );
};

async function draw(data: OrderToWS, map) {
  const pathCoordinat = polyline.decode(data.data);
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
    strokeColor: randomColor(),
    strokeWeight: 6
  });
  snappedPolyline.setMap(map);
  animateCircle(arraySnapped, data);
}

function animateCircle(pathCoordinates, data: OrderToWS) {
  let count = 0;
  // fallback icon if the poly has no icon to animate
  const length = pathCoordinates.length;
  let countLength = 0;
  const procent = 100 / length;
  const step = procent / 200;
  const interval = setInterval(() => {
    count = count + 1;
    let position = google.maps.geometry.spherical.interpolate(
      pathCoordinates[countLength],
      pathCoordinates[countLength + 1],
      count / 200
    );
    let obj = {
      orderId: data.orderId,
      coordinates: { lat: position.lat(), lng: position.lng() },
      count: `${Math.ceil(procent * (countLength + 1) + step * count)}%`,
      orderStatus: data.orderStatus,
      end: data.end,
      start: data.start
    };
    socket.emit('CoordinatesToServer', obj);
    if (count === 200) {
      count = 0;
      countLength += 1;
    }
    if (countLength === length - 1) {
      clearInterval(interval);
    }
  }, 50);
}
