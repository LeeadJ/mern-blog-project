import { useState } from "react"

export default function RegisterPage(){
    const [userName, setUserName] = useState('');
    const [password, setPassowrd] = useState('');
    
    const handleUserChange = (event) => {
        setUserName(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassowrd(event.target.value);
    }

    async function register(event){
        event.preventDefault();
        await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({userName, password}),
            headers: {'Content-Type' : 'application/json'}
        })
    }
    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input 
                type="text" 
                placeholder="username" 
                value={userName}
                onChange={handleUserChange}
                />
            <input 
                type="password" 
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
                />
            <button>Register</button>
        </form>
    )
}
   