import Web3 from 'web3'

const baseUrl = `${process.env.REACT_APP_API_URL}/users/`;
//const baseUrl = `http://localhost:8000/todos`;

export const loadTodos = (user_id) => {
    return fetch(`${baseUrl}/${user_id}/todos`).then((res) => res.json());
}

export const getTodo = (user_id, id) => {
    return fetch(`${baseUrl}/${user_id}/todos/${id}`).then((res) => res.json());
}

export const createTodo = (user_id, todo) => {
    return fetch(`${baseUrl}/${user_id}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            itemclass: todo.itemclass,
            title: todo.title,
            note: todo.note,
            user_id: todo.user_id,
            completed: todo.completed
        })
    }).then((res) => res.json());
};

export const updateTodo = (user_id, todo) => {
    console.log(todo);
    return fetch(`${baseUrl}/${user_id}/todos/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: todo.id,
            title: todo.title,
            note: todo.note,
            user_id: todo.user_id,
            completed: todo.completed
        })
    }).then((res) => res.json());
};

export const deleteTodo = (user_id, id) => {
    return fetch(`${baseUrl}/${user_id}/todos/${id}`, {
        method: "DELETE"
    }).then(res => res.json);
}

export const createUser = (account) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userwallet: String(account)
        })
    }).then((res) => res.json());
};

export const getUser = (userWallet) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`).then((res) => res.json());
};