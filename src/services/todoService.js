import Web3 from 'web3'

const baseUrl = `${process.env.REACT_APP_API_URL}/todos`;
//const baseUrl = `http://localhost:8000/todos`;

export const loadTodos = () => {
    return fetch(baseUrl).then((res) => res.json());
}

export const getTodo = (id) => {
    return fetch(`${baseUrl}/${id}`).then((res) => res.json());
}

export const createTodo = (todo) => {
    return fetch(baseUrl, {
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

export const updateTodo = (todo) => {
    return fetch(`${baseUrl}/${todo.id}`, {
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

export const deleteTodo = (id) => {
    return fetch(`${baseUrl}/${id}`, {
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