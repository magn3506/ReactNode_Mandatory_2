import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import "./Reset_password.css";

function Reset_password(props) {

    // STATE
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // GET PARAMS
    const { resetToken } = useParams();

    // HANDLERS
    const handleSetPassword = event => {
        setPassword(event.target.value);
    }

    const handleSetRepeatPassword = event => {
        setRepeatPassword(event.target.value);
    }

    const handleSubmitForm = async event => {
        event.preventDefault();

        if (!isPasswordsValidated()) {
            console.log("ERRO");
            return;
        }


        const payload = {
            newPassword: repeatPassword,
            resetToken: resetToken
        };

        const response = await fetch("/api/user/resetUserPassword", {
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: "PATCH",
            body: JSON.stringify(payload),

        });

        const result = await response;

        if (result.status !== 200) {
            console.log(result);
            console.log("ERROR IN FRONT");
        }

        if (result.status === 200) {
            props.history.push("/login");
        }

    }

    const isPasswordsValidated = () => {

        if (password.length === 0 || repeatPassword.length === 0) {
            setErrorMsg("PLEASE FILL OUT THE WHOLE FORM !");
            return false;
        }



        if (password !== repeatPassword) {
            setErrorMsg("PASSWORDS MUST MATCH");
            return false;
        }

        setErrorMsg("SUCCES");
        return true;
    };

    const baseClass = "reset_password";

    return (
        <div className={`${baseClass}_content_wrapper`}>
            <h1 className={`${baseClass}_title`} >RESET PASSWORD</h1>
            <form className={`${baseClass}_form`} onSubmit={handleSubmitForm}>
                <input className={`${baseClass}_password ${baseClass}_input`} type="text" placeholder="password" onChange={handleSetPassword} />
                <input className={`${baseClass}_repeat_password ${baseClass}_input`} type="text" placeholder="Retype password" onChange={handleSetRepeatPassword} />
                <div className={`${baseClass}_error-msg`} >{errorMsg && errorMsg}</div>
                <button className={`${baseClass}_submit-button`} type="submit">RESET</button>
            </form>
        </div>
    )
}

export default Reset_password
