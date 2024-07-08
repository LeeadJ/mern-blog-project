import { useContext, useState } from "react";
import { Navigate } from 'react-router-dom';
import { UserContext } from "../UserContext";


export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    const handleUserNameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    async function login(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type' : 'application/json'},
            credentials: 'include',
        });
        if(response.ok){
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true)
            })
        }
        else {
            alert('wrong creditials');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    
    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input 
                type="text" 
                placeholder="username"
                value={username}
                onChange={handleUserNameChange}
                />
            <input 
                type="password" 
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
                />
            <button>Login</button>
        </form>
    )
}
   