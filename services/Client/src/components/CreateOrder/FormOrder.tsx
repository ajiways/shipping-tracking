import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { FC } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import s from './order.module.css';

export const FormOrder: FC = () => {
  const [form] = useForm();
  const { CreateOrder } = useActions();
  const { id, isLoadingCreate } = useTypedSelector((state) => state.order);

  return (
    <div>
      <Row gutter={10}>
        <Form
          form={form}
          className={s.form}
          name="wrap"
          onFinish={() => {
            CreateOrder(form.getFieldsValue());
          }}
        >
          <div className={s.form_name}>
            <Typography.Text> Coordinates Start</Typography.Text>
          </div>
          <div className={s.form_content}>
            <Col span={12}>
              <Form.Item
                className={s.form_items}
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
          <div className={s.form_name}>
            <Typography.Text> Coordinates End</Typography.Text>
          </div>
          <div className={s.form_content}>
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
            <Button
              loading={isLoadingCreate}
              type="primary"
              htmlType="submit"
              className={s.form_btn}
            >
              Submit
            </Button>
          </Form.Item>
          {id ? (
            <div className={s.form_success}>
              <span className={s.form_success__title}>
                Заказ: <span className={s.form_success__text}>{id}</span>{' '}
                успешно создан!
              </span>
            </div>
          ) : (
            <></>
          )}
        </Form>
      </Row>
    </div>
  );
};
