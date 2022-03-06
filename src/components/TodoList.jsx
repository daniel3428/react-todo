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
        todo.user_id=props.userID;
        console.log('Todo to create', todo);
        createTodo(todo).then(onRefresh());
        message.success('Todo added!');
    }

    const handleRemoveTodo = (todo) => {
        deleteTodo(todo.id).then(onRefresh());
        message.warn('Todo removed');
    }

    const handleToggleTodoStatus = (todo) => {
        todo.completed = !todo.completed;
        updateTodo(todo).then(onRefresh());
        message.info('Todo status updated!');
    }

    const handleUpdateTodo = (todo) => {
        updateTodo(todo).then(onRefresh());
        message.info('Todo updated!');
    }

    const refresh = () => {
        loadTodos()
            .then(json => {
                console.log(json);
                json.sort(compareID);
                setTodos(json.sort(compareID));
                setActiveTodos(json.filter(todo => todo.completed === false).sort(compareID));
                setCompletedTodos(json.filter(todo => todo.completed === true).sort(compareID));
            }).then(console.log('fetch completed'));
    }

    const onRefresh = useCallback(async() => {
        setRefreshing(true);
        let data = await loadTodos();
        setTodos(data.sort(compareID));
        setActiveTodos(data.filter(todo => todo.completed === false).sort(compareID));
        setCompletedTodos(data.filter(todo => todo.completed === true).sort(compareID));
        setRefreshing(false);
        console.log('Refresh state', refreshing);
    }, [refreshing]);

    useEffect(() => {
        refresh();
    }, [onRefresh])

    return (

        
        <Layout className="Layout">
            <Content style={{padding: '0 50px'}}>
                <div className="todolist">
                    <Row>
                        <Col span={14} offset={5}>

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

