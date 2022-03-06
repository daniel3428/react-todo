import React, {useEffect} from "react";
import {Tabs, Layout, Row, Col, List} from 'antd';
import TodoItem from './TodoItem';

const TodoTab = ({todos, onTodoRemoval, onTodoToggle, onTodoUpdate, onSecTodoAdd}) => {
    return (
        <><List
                locale={{emptyText: "There's nothing to do...",}}
                dataSource={todos}
                renderItem={(todo) => (

                    <TodoItem
                        todo={todo}
                        onTodoToggle={onTodoToggle}
                        onTodoRemoval={onTodoRemoval}
                        onTodoUpdate={onTodoUpdate}
                        onSecTodoAdd={onSecTodoAdd}
                    />
                )}
                pagination={{
                    position: 'bottom',
                    pageSize: 30,
                }}
            /></>
    )
}

export default TodoTab;