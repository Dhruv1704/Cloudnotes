import React, {useEffect, useState, useContext} from 'react'
import SignUp from "./SignUp";
import {useNavigate} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import noteContext from "../context/notes/noteContext";

export default function LogIn() {

    const context = useContext(noteContext);
    const {progress, setProgress, tst} = context;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("web-token")) {
            navigate("/notes")
        }

        // eslint-disable-next-line
    }, []);

    const [credentials, setCredentials] = useState({email: "", password: ""});

    const displaySign = (e) => {
        e.preventDefault();
        document.getElementById("sign-div").style.display = "block";
    }

    const logIn = async (e) => {
        e.preventDefault();
        setProgress(30);
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/authen/login`, {
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({"email": credentials.email, "password": credentials.password})
        });
        setProgress(50)
        const json = await response.json();
        tst(json.message,json.type)
        if (json.type==="success") {
            localStorage.setItem("web-token", json.webToken);
            navigate("/notes")
            setProgress(75)
        } else {
            setProgress(100)
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    function passwordHideShow(n) {
        const passwordInput = document.querySelector("#password" + n)
        const eye = document.querySelector("#eye" + n)
        eye.classList.toggle("fa-eye-slash")
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
        passwordInput.setAttribute("type", type)
    }


    return (
        <>
            <LoadingBar
                height={3}
                color={"#00adee"}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className={"md:flex md:items-center md:justify-around md:max-w-5xl md:mx-auto md:h-[90vh] "}>
                <div>
                    <h1 className={"text-center text-5xl font-bold text-[#1877f2] select-none mt-8 md:text-left"}>cloudnotes</h1>
                    <p className={"text-center text-xl my-2 mb-5 font-normal"}>Store your notes on the cloud
                        securely.</p>
                </div>
                <form
                    className={"flex flex-col mx-auto content-center relative shadow-xl w-[348px] bg-white rounded-2xl p-4 md:mx-0"}
                    onSubmit={logIn}>
                    <input type={"email"} placeholder={"Email address"} name={"email"} value={credentials.email}
                           className={"border-[1px] p-3 mb-4 rounded-md"} onChange={onChange} required={true}/>
                    <input type={"password"} placeholder={"Password"} name={"password"}
                           className={"border-[1px] p-3 rounded-md"} value={credentials.password} onChange={onChange}
                           id={"password1"} required={true}/>
                    <i className="fa-solid fa-eye cursor-pointer absolute top-[100px] right-9 text-[#7A7A85]" id="eye1" onClick={()=>passwordHideShow(1)}></i>
                    <button type={"submit"} className={"bg-[#1877f2] text-white text-xl font-bold rounded-lg py-3 my-3 active:scale-95"}>Log In</button>
                    <hr/>
                    <button type={"button"} className={"bg-[#42b72a] text-white text-xl font-semibold mx-auto w-[210px] rounded-lg py-3 mt-2 active:scale-95"} onClick={displaySign}>Create New Account
                    </button>
                </form>
            </div>
            <SignUp passwordHideShow={passwordHideShow}/>
        </>
    )
}
