import React, {useContext, useEffect, useState} from 'react'
import SignUp from "./SignUp";
import noteContext from "../context/notes/noteContext";
import {useNavigate} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function LogIn() {
    //
    // const togglePass = () => {
    //     const togglePassword = document.querySelector('#togglePassword');
    //     const password = document.querySelector('#log-pass');
    //     // toggle the type attribute
    //     const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    //     password.setAttribute('type', type);
    //     // toggle the eye slash icon
    //     togglePassword.classList.toggle('fa-eye-slash');
    // }
    //


    const context = useContext(noteContext);
    const {host} = context
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const connectHost = async () => {
            await fetch(`${host}`)
        };
        connectHost();
    // eslint-disable-next-line
    }, []);

    const [credentials, setCredentials] = useState({email: "", password: ""});

    const displaySign = (e) => {
        e.preventDefault();
        document.getElementById("sign-div").style.display = "block";
    }

    const logIn = async (e)=>{
        e.preventDefault();
        setProgress(30);
        const response = await fetch(`${host}/api/authen/login`,{
            method:"POST",
            headers:{
                'content-Type':'application/json'
            },
            body: JSON.stringify({"email":credentials.email, "password":credentials.password})
        });
        setProgress(50)
        const json = await response.json();
        if(json.success){
            sessionStorage.setItem("web-token",json.webToken);
            navigate("/notes")
            setProgress(100)
        }else{
            setProgress(100)
            alert("Invalid Credentials")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <>
            <LoadingBar
                height={3}
                color={"#00adee"}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className={"log-div"}>
                <div className={"log-title-div"}>
                    <h1 className={"log-title"}>cloudnotes</h1>
                    <p className={"log-subtitle"}>Store your notes on the cloud securely.</p>
                </div>
                <form className={"log-form"} onSubmit={logIn} >
                    <input type={"email"} placeholder={"Email address"} name={"email"} value={credentials.email} className={"log-email"} onChange={onChange}/>
                    <input type={"password"} placeholder={"Password"} name={"password"} className={"log-pass"} value={credentials.password} onChange={onChange} id={"log-pass"}/>
                    {/*<i className="far fa-eye" id="togglePassword" onClick={togglePass}></i>*/}
                    <br/>
                    <button type={"submit"} className={"log-in"} >Log In</button>
                    <hr className={"log-hr"}/>
                    <button type={"button"} className={"log-new-account"} onClick={displaySign}>Create New Account
                    </button>
                </form>
            </div>
            <SignUp host={host}/>
        </>
    )
}