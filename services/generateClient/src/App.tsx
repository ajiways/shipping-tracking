import 'antd/dist/antd.min.css';
import './index.css';
import { MainC } from './components/Map/Map';
import { HeaderC } from './components/Header/Header';

export default function App() {
  return (
    <div>
      <HeaderC />
      <div style={{ width: '1440px', margin: '20px auto' }}>
        <MainC />
      </div>
    </div>
  );
}
