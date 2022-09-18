import React, {useState} from 'react'

export default function SignUp(props) {

    const {host} = props;
    const closeModal = () => {
        document.getElementById("sign-div").style.display = "none";
    }

    const [credentials, setCredentials] = useState({fname:"",lname:"",email: "", password: "",cpassword:""});

    const signUp = async (e)=>{
        e.preventDefault();
        const {fname,lname,email,password,cpassword} = credentials;
        const response = await fetch(`${host}/api/authen/createuser`,{
            method:"POST",
            headers:{
                'content-Type':'application/json'
            },
            body: JSON.stringify({"name":fname+" "+lname,email,password})
        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem("web-token",json.webToken);
            closeModal()
        }else{
            alert("Already used credentials")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }



    return (
        <div className={"sign-div"} id={"sign-div"}>
            <form className={"sign-form"} id={"sign-form"} onSubmit={signUp}>
                <div className={"sign-title-div"}>
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h1 className={"sign-title"}>Sign Up</h1>
                    <small className={"sign-subtitle"}>It's quick and easy</small>
                </div>
                <div className={"sign-name"}>
                    <input type={"text"} placeholder={"First Name"} name={"fname"} className={"sign-fname"} onChange={onChange} minLength={3} required/>
                    <input type="text" placeholder={"Last Name"} name={"lname"} className={"sign-lname"} onChange={onChange} required/>
                </div>
                <input type={"text"} placeholder={"Email Address"} name={"email"}  className={"sign-input"} onChange={onChange}/>
                <input type={"password"} placeholder={"New Password"} name={"password"}  className={"sign-input"} onChange={onChange} minLength={5} required/>
                <input type={"password"} placeholder={"Confirm Password"} name={"cpassword"} className={"sign-input"}onChange={onChange} minLength={5} required/>
                <button type={"submit"} className={"sign-btn"} >Sign Up</button>
            </form>
        </div>
    )
}