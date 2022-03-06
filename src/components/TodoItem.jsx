import React, {useState, useEffect, useCallback} from "react";
import {TooltipProps, Tag, List, Button, Popconfirm, Switch, Tooltip, Form, Input, Typography, Row, Col} from 'antd';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons';
import {updateTodo} from '../services/todoService';

const Todo = ({todo, onTodoRemoval, onTodoToggle, onTodoUpdate }) => {
    const [form] = Form.useForm();
    const { Title } = Typography;
    
    return (
        
        <List.Item
            actions={[
                <Form
                form={form}
                layout="horizontal"
                className='todo-note'>
                        <Form.Item
                            name={'note'}
                            rules={[{ required: false, message: 'Note' }]}>
                                
                                
                            <Input placeholder="Take some note"></Input>
                        </Form.Item>
                </Form>,
                <Tooltip
                    title={todo.completed?'Mark as uncompleted':'Mark as completed'}>
                    <Switch
                        checkedChildren={<CheckOutlined/>}
                        unCheckedChildren={<CloseOutlined/>}
                        onChange={() => onTodoToggle(todo)}
                        defaultChecked={todo.completed}
                    />

                </Tooltip>,
                <Popconfirm
                title={'Are you sure you want to update?'}
                onConfirm={() => {
                    todo.note = form.getFieldValue('note');
                    console.log(todo);
                    onTodoUpdate(todo);
                    //form.setFieldsValue('note', todo.note);
                    form.resetFields();
                }}>
                    <Button className="update-todo-button" type="primary">
                        ◎
                    </Button>
                    </Popconfirm>,
                <Popconfirm
                title={'Are you sure you want to delete?'}
                onConfirm={() => {
                    onTodoRemoval(todo);
                }}>
                    <Button className="remove-todo-button" type="primary" danger>
                        X
                    </Button>
                    
                </Popconfirm>
                
                
            ]}
            className="list-item"
            key={todo.id}
            >
                
                
            <Row>
            
            
            <div>
                <Tag color={todo.completed?'cyan':'red'} className="todo-tag">
                    {todo.itemclass}
                </Tag>
                </div>
                
                <div style={{ marginRight: '.5rem' }}>
                <Title level={4} className="todo-title">
                    {todo.title}
                </Title>
                </div>
                <div>
                <Title level={4} className="todo-title">
                    {todo.note}
                </Title>
                </div>

              
             
      
                </Row>
                
            
            
            

            

            
        </List.Item>
        
       

    )
}

export default Todo;