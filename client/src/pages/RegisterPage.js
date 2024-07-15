import { useContext, useState } from "react";
import { Navigate } from "react-router-dom"
import { UserContext } from "../UserContext";

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [password, setPassowrd] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

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

            // after registering, automatically be redirected to homepage
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
        } else {
            alert('Registration Failed');
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }
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
   