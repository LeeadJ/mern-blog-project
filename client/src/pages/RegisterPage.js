import { useState } from "react"
import { Navigate } from "react-router-dom"

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [password, setPassowrd] = useState('');
    // const [redirect, setRedirect] = useState(false);
    const handleUserChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassowrd(event.target.value);
    }

    async function register(event){
        event.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type' : 'application/json'}
        })
        if(response.status === 200){
            alert('Registration Successful');
            // setRedirect(true);
        } else {
            alert('Registration Failed');
        }
    }

    // if(redirect){
    //     return <Navigate to={'/'} />
    // }
    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input 
                type="text" 
                placeholder="username" 
                value={username}
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
   