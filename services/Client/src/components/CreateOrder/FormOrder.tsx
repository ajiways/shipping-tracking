import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { FC, useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export const FormOrder: FC = () => {
  const [form] = useForm();
  const { CreateOrder } = useActions();
  const { id } = useTypedSelector((state) => state.order);

  return (
    <>
      <Row gutter={10}>
        <Form
          form={form}
          style={{ margin: '30px auto' }}
          name="wrap"
          labelCol={{
            flex: '110px'
          }}
          onFinish={() => {
            CreateOrder(form.getFieldsValue());
          }}
        >
          <div style={{ marginBottom: '10px', textAlign: 'center' }}>
            <Typography.Text> Coordinates Start</Typography.Text>
          </div>
          <div style={{ display: 'flex' }}>
            <Col span={12}>
              <Form.Item
                style={{ marginBottom: '50px' }}
                name="startLat"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input placeholder="Введите широту" type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="startLng"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input placeholder="Введите долготу" type="number" />
              </Form.Item>
            </Col>
          </div>
          <div style={{ marginBottom: '10px', textAlign: 'center' }}>
            <Typography.Text> Coordinates Start</Typography.Text>
          </div>
          <div style={{ display: 'flex' }}>
            <Col span={12}>
              <Form.Item
                name="endLat"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input placeholder="Введите широту" type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endLng"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input placeholder="Введите долготу" type="number" />
              </Form.Item>
            </Col>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Row>
      {id ? (
        <Typography.Title style={{ fontSize: '25px', textAlign: 'center' }}>
          Номер заказа: {id}
        </Typography.Title>
      ) : (
        <></>
      )}
    </>
  );
};
