import 'antd/dist/antd.min.css';
import './index.css';
import { HeaderC } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CreateOrder } from './components/CreateOrder/CreateOrder';
import { useEffect } from 'react';

export default function App() {
  const mapOptions: google.maps.MapOptions = {
    center: { lat: 55, lng: 55 },
    zoom: 12
  };
  const map = new google.maps.Map(document.getElementById('map')!, mapOptions);
  const divMap = document.getElementById('map');
  divMap!.className = 'map__hidden';

  let location = useLocation();
  useEffect(() => {
    let title = `Market ${location.pathname}`;
    document.title = title;
  });

  return (
    <div>
      <HeaderC />
      <div style={{ maxWidth: '1440px', margin: '20px auto' }}>
        <Routes>
          <Route path="/order/search" element={<Main map={map} />} />
          <Route path="/order/create" element={<CreateOrder map={map} />} />
          <Route path="*" element={<Navigate to={'/order/search'} />} />
        </Routes>
      </div>
    </div>
  );
}
