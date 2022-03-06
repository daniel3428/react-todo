import { useRef, useState, useEffect, useContext } from 'react'
import TodoList from './components/TodoList'
import {createUser} from './services/todoService';
import Web3 from 'web3'

let userID;

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        //const { ethereum } = window;
        e.preventDefault();
        try {
			const account = await window.ethereum.request({method: 'eth_accounts'});
            let data = await createUser(account[0]).then();
            //console.log(data);
            userID = data.id;
            if (userID == 7) {
                setSuccess(true);
            }
            //console.log(account);
		} catch (error) {
			console.error(error);
		}
    }

    return (
        <>
            {success ? (
                <TodoList userID={userID}/>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <button>Sign In</button>
                    </form>
                </section>
            )}
        </>
    )
}

export default Login