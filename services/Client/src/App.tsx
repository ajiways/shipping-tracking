import 'antd/dist/antd.min.css';
import './index.css';
import { HeaderC } from './components/Header/Header';
import { MainOrder } from './components/Main/Main';
import { Route, Routes } from 'react-router-dom';
import { CreateOrder } from './components/CreateOrder/CreateOrder';

export default function App() {
  const divMap = document.getElementById('map');
  divMap!.className = 'map__hidden';
  const mapOptions: google.maps.MapOptions = {
    center: { lat: 51.77, lng: 55.1 },
    zoom: 12
  };
  const map = new google.maps.Map(document.getElementById('map')!, mapOptions);
  return (
    <div>
      <HeaderC />
      <div style={{ maxWidth: '1440px', margin: '20px auto' }}>
        <Routes>
          <Route path="/order/search" element={<MainOrder map={map} />} />
          <Route path="/order/create" element={<CreateOrder map={map} />} />
        </Routes>
      </div>
    </div>
  );
}
