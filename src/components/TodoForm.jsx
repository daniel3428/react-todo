import React from 'react';
import { Form, Row, Col, Button, Input } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { render } from '@testing-library/react';

const TodoForm = ({ onFormSubmit }) => {
    const [form] = Form.useForm();

    const onFinish = () => {
        onFormSubmit({
            title: form.getFieldValue('title'),
            itemclass: form.getFieldValue('itemclass'),
            note: "",
            completed: false
        });
        console.log(form.getFieldValue('title'));

        form.resetFields();
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout="horizontal"
            className='todo-form'>
            <Row gutter={10}>
                
                <Col xs={4} sm={4} md={3} lg={3} xl={4}>
                    <Form.Item
                        name={'itemclass'}
                        rules={[{ required: true, message: 'This field is required' }]}>
                        <Input placeholder="Clasify this item" />
                    </Form.Item>


                </Col>
                <Col xs={20} sm={20} md={16} lg={16} xl={16}>
                    <Form.Item
                        name={'title'}
                        rules={[{ required: true, message: 'This field is required' }]}>
                        <Input placeholder="What needs to be done?" />
                    </Form.Item>


                </Col>
                <Col xs={24} sm={24} md={5} lg={5} xl={4}>
                    <Button type="primary" htmlType="submit" block>
                        <PlusCircleFilled />
                        Add Todo
                    </Button>
                </Col>

            </Row>

        </Form>
    );
}

export default TodoForm;

