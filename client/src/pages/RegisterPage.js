import { useContext, useState } from "react";
import { Navigate } from "react-router-dom"
import { UserContext } from "../UserContext";

export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassowrd] = useState('');
    const [confirmPassword, setConfirmPassowrd] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function register(event){
        event.preventDefault();
        if(password !== confirmPassword){
            return alert('Registration Failed. \nPasswords do not match, please try again.')
        }
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({email, username, password}),
            headers: {'Content-Type' : 'application/json'}
        })
        if(response.status === 200){
            alert('Registration Successful');

            // after registering, automatically be redirected to homepage
            const response = await fetch('http://localhost:4000/login', {
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
        } else {
            alert('Registration Failed, must be valid email (i.e. someone@aaa.com)');
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }
    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                required
            />
            <input 
                type="text" 
                placeholder="username" 
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                />
            <input 
                type="password" 
                placeholder="password" 
                value={password}
                onChange={(ev) => setPassowrd(ev.target.value)}
                />
            <input 
                type="password" 
                placeholder="confirm - password" 
                value={confirmPassword}
                onChange={(ev) => setConfirmPassowrd(ev.target.value)}
                />
            <button>Register</button>
        </form>
    )
}
   