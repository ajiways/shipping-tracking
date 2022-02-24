import 'antd/dist/antd.min.css';
import './index.css';
import { HeaderC } from './components/Header/Header';
import { MainOrder } from './components/Main/Main';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <HeaderC />
      <div style={{ width: '1440px', margin: '20px auto' }}>
        <Routes>
          <Route path="/" element={<MainOrder />} />
        </Routes>
      </div>
    </div>
  );
}
