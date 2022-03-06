import React, {useEffect, useState, useCallback} from "react";
import {Tabs, Layout, Row, Col, Input, message} from 'antd';
import './TodoList.css';
import TodoTab from './TodoTab';
import TodoForm from "./TodoForm";
import {createTodo, deleteTodo, loadTodos, updateTodo} from '../services/todoService';
const {TabPane} = Tabs;
const {Content} = Layout;

const TodoList = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [todos, setTodos] = useState([]);
    const [activeTodos, setActiveTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState();

    function compareID(a, b) {
        return a.id - b.id;
    }

    const handleFormSubmit = (todo) => {
        todo.user_id=props.user_id;
        console.log('Todo to create', todo);
        createTodo(props.user_id, todo).then(onRefresh());
        message.success('Todo added!');
    }

    const handleRemoveTodo = (todo) => {
        deleteTodo(props.user_id, todo.id).then(onRefresh());
        message.warn('Todo removed');
    }

    const handleToggleTodoStatus = (todo) => {
        todo.completed = !todo.completed;
        updateTodo(props.user_id, todo).then(onRefresh());
        message.info('Todo status updated!');
    }

    const handleUpdateTodo = (todo) => {
        console.log(todo);
        updateTodo(props.user_id, todo).then(onRefresh());
        message.info('Todo updated!');
    }

    const refresh = () => {
        loadTodos(props.user_id)
            .then(json => {
                //console.log(json);
                setTodos(json);
                setActiveTodos(json.filter(todo => todo.completed === false));
                setCompletedTodos(json.filter(todo => todo.completed === true));
            }).then(console.log('fetch completed'));
    }

    const onRefresh = useCallback(async() => {
        setRefreshing(true);
        let data = await loadTodos(props.user_id);
        setTodos(data);
        setActiveTodos(data.filter(todo => todo.completed === false));
        setCompletedTodos(data.filter(todo => todo.completed === true));
        setRefreshing(false);
        console.log('Refresh state', refreshing);
    }, [refreshing]);

    useEffect(() => {
        refresh();
    }, [onRefresh])

    return (

        
        <Layout className="Layout">
            <Content style={{padding: '0 0px'}}>
                <div className="todolist">
                    <Row>
                        <Col span={24} offset={0}>

                            <TodoForm onFormSubmit={handleFormSubmit}/>
                            <br />
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="All" key="all">
                                    <TodoTab todos={todos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} onTodoUpdate={handleUpdateTodo}/>
                                </TabPane>
                                <TabPane tab="Active" key="active">
                                    <TodoTab todos={activeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} onTodoUpdate={handleUpdateTodo}/>
                                </TabPane>
                                <TabPane tab="Complete" key="Complete">
                                    <TodoTab todos={completedTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} onTodoUpdate={handleUpdateTodo}/>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>

    )
}

export default TodoList;

