import React, { useState } from 'react';
import { Link } from "react-router-dom";


function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSetEmail = event => {
        setEmail(event.target.value);
    }

    const handleSetPassword = event => {
        setPassword(event.target.value);
    }


    const handleSubmitForm = async event => {
        event.preventDefault();


        const payload = {
            email: email,
            password: password
        };


        const response = await fetch("api/auth/login", {
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(payload),

        });

        const result = await response;

        if (result.status === 200) {
            props.history.push("/app");
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmitForm}>
                <input type="email" placeholder="email" onChange={handleSetEmail} />
                <input type="text" placeholder="password" onChange={handleSetPassword} />
                <Link to="/forgot_password">Forgot Password?</Link>
                <button type="submit" >Login</button>
            </form>
            <Link to="/signup">Sign up</Link>
        </div>
    )
}

export default Login
