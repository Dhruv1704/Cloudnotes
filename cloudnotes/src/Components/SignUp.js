import React, {useState} from 'react'
import LoadingBar from "react-top-loading-bar";

export default function SignUp(props) {

    const {host} = props;
    const [progress, setProgress] = useState(0);
    const closeModal = () => {
        document.getElementById("sign-form").reset();
        document.getElementById("sign-div").style.display = "none";
    }

    const [credentials, setCredentials] = useState({fname: "", lname: "", email: "", password: ""});

    const signUp = async (e) => {
        e.preventDefault();
        setProgress(30);
        const {fname, lname, email, password} = credentials;
        const response = await fetch(`${host}/api/authen/createuser`, {
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({"name": fname + " " + lname, email, password})
        });
        setProgress(50)
        const json = await response.json();
        if (json.success) {
            setProgress(100)
            sessionStorage.setItem("web-token", json.webToken);
            closeModal()
        } else {
            setProgress(100)
            alert("Already used credentials")
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }


    function validatePassword() {
        const password = document.getElementById("pwd");
        const confirm_password = document.getElementById("cpwd");
        if (password.value !== confirm_password.value) {
            confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
            confirm_password.setCustomValidity('');
        }
    }

    return (
        <>
            <LoadingBar
                height={3}
                color={"#00adee"}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className={"sign-div"} id={"sign-div"}>
                <form className={"sign-form"} id={"sign-form"} onSubmit={signUp}>
                    <div className={"sign-title-div"}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h1 className={"sign-title"}>Sign Up</h1>
                        <small className={"sign-subtitle"}>It's quick and easy</small>
                    </div>
                    <div className={"sign-name"}>
                        <input type={"text"} placeholder={"First Name"} name={"fname"} className={"sign-fname"}
                               onChange={onChange} minLength={3} required/>
                        <input type="text" placeholder={"Last Name"} name={"lname"} className={"sign-lname"}
                               onChange={onChange} required/>
                    </div>
                    <input type={"email"} placeholder={"Email Address"} name={"email"} className={"sign-input"}
                           onChange={onChange} required/>
                    <input type={"password"} placeholder={"New Password"} name={"password"} id="pwd"
                           className={"sign-input"} onChange={onChange} minLength={5} required/>
                    <input type={"password"} placeholder={"Confirm Password"} name={"cpassword"} id="cpwd"
                           className={"sign-input"} onChange={onChange} onKeyUp={validatePassword} minLength={5}
                           required/>
                    <button type={"submit"} className={"sign-btn"}>Sign Up</button>
                </form>
            </div>
        </>
    )
}