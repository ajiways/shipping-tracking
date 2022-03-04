import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
export const HeaderC = () => {
  const [pathName, setPathName] = useState('');
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = pathName;
  });

  return (
    <Header>
      <Menu
        mode="horizontal"
        theme="dark"
        style={{ justifyContent: 'center' }}
        selectedKeys={[location.pathname]}
      >
        <Menu.Item
          key={'/order/search'}
          onClick={() => {
            navigate('order/search');
            setPathName('Search');
          }}
          icon={<SearchOutlined />}
        >
          Search
        </Menu.Item>
        <Menu.Item
          style={{ marginLeft: '20px' }}
          key={'/order/create'}
          icon={<PlusCircleOutlined />}
          onClick={() => {
            navigate('order/create');
            setPathName('Create');
          }}
        >
          Create
        </Menu.Item>
      </Menu>
    </Header>
  );
};
