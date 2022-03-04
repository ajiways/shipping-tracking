import { Row, Col } from 'antd';
import { FC, useState } from 'react';
import { OrdersComp } from './OrdersComp';
import { Search } from './Search';

export const Main: FC<PropsMain> = ({ map }) => {
  const [query, setQuery] = useState('');

  return (
    <>
      <Row>
        <Col span={24}>
          <Search setQuerySave={setQuery} />
        </Col>
      </Row>
      <OrdersComp map={map} query={query} />
    </>
  );
};

interface PropsMain {
  map: google.maps.Map;
}
