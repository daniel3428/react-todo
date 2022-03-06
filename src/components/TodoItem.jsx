import React, {useState, useEffect, useCallback} from "react";
import {TooltipProps, Tag, List, Button, Popconfirm, Switch, Tooltip, Form, Input} from 'antd';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons';
import {updateTodo} from '../services/todoService';

const Todo = ({todo, onTodoRemoval, onTodoToggle, onTodoUpdate }) => {
    const [form] = Form.useForm();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async() => {
        setRefreshing(true);
        setRefreshing(false);
        console.log('Refresh todoItem', refreshing);
    }, [refreshing]);

    useEffect(() => {
    }, [onRefresh])

    const onFinish = () => {
    }
    
    return (
        <List.Item
            actions={[
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
                    updateTodo(todo).then(onRefresh());
                    form.setFieldsValue('note', todo.note);
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

            
            <div className="todo-item">
                <Tag color={todo.completed?'cyan':'red'} className="todo-tag">
                    {todo.title}
                </Tag>
                
            </div>

            <Form
            form={form}
            onFinish={onFinish}
            layout="horizontal"
            className='todo-note'>
                    <Form.Item
                        name={'note'}
                        rules={[{ required: false, message: 'Note' }]}
                        initialValue={todo.note}>
                            
                        <Input placeholder="Take some note"></Input>
                    </Form.Item>
            </Form>

            

            
        </List.Item>
    )
}

export default Todo;