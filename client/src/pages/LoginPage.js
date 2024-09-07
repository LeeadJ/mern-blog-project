import { useContext, useState } from "react";
import { Navigate } from 'react-router-dom';
import { UserContext } from "../UserContext";


export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function login(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
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
                type="email"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                required
            />
            <input 
                type="password" 
                placeholder="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                />
            <button>Login</button>
        </form>
    )
}
   