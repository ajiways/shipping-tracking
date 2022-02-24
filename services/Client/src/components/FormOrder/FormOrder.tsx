import { Form, Button, Input, Modal, Select, Cascader } from 'antd';
import { Option } from 'antd/lib/mentions';
import { FC, useState } from 'react';

export const FormOrder: FC = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Finish:', values);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const data = { start: { lat: 54, lng: 53 }, end: { lat: 54.5, lng: 53.4 } };

  return (
    <>
      {' '}
      <Button type="primary" onClick={showModal}>
        Create Order
      </Button>
      <Modal
        title="Создай заказ"
        visible={isModalVisible}
        onOk={handleOk}
        footer={
          <>
            <Button
              onClick={() => {
                handleCancel();
              }}
              type="ghost"
            >
              Отмена
            </Button>
            <Button
              key="submit"
              htmlType="submit"
              onClick={() => {
                form.submit();
                handleOk();
              }}
              type="primary"
            >
              Принять
            </Button>
          </>
        }
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Form.Item name="start" label="Откуда" style={{ margin: '10px' }}>
              <Cascader
                options={[
                  {
                    label: 'Откуда',
                    children: [
                      {
                        value: { end: { lat: 11.5, lng: 20 } },
                        label: 'Рушкина'
                      },
                      {
                        value: { end: { lat: 11, lng: 21 } },
                        label: 'Хрюшкина'
                      }
                    ]
                  }
                ]}
              />
            </Form.Item>
            <Form.Item name="end" label="Куда" style={{ margin: '10px' }}>
              <Cascader
                options={[
                  {
                    value: 'end',
                    label: 'Куда',
                    children: [
                      {
                        value: { end: { lat: 10, lng: 20 } },
                        label: 'Пушкина'
                      },
                      {
                        value: { end: { lat: 12, lng: 21 } },
                        label: 'Тушкина'
                      }
                    ]
                  }
                ]}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
