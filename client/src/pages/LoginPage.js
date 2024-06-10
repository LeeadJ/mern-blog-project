import { useState } from "react"
export default function LoginPage(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    async function login(event) {
        event.preventDefault();
        await fetch('http://localhost/login', {
            method: 'GET',
            body: JSON.stringify({userName, password}),
            headers: {'Content-Type' : 'application/json'},
        })
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input 
                type="text" 
                placeholder="username"
                value={userName}
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
   