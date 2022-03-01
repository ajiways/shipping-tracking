import 'antd/dist/antd.min.css';
import './index.css';
import { HeaderC } from './components/Header/Header';
import { MainOrder } from './components/Main/Main';
import { Route, Routes } from 'react-router-dom';
import { CreateOrder } from './components/CreateOrder/CreateOrder';

export default function App() {
  return (
    <div>
      <HeaderC />
      <div style={{ maxWidth: '1440px', margin: '20px auto' }}>
        <Routes>
          <Route path="/order/search" element={<MainOrder />} />
          <Route path="/order/create" element={<CreateOrder />} />
        </Routes>
      </div>
    </div>
  );
}
