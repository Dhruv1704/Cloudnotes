import React from 'react'
import {Link, useNavigate} from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();
    const logOut = ()=>{
        localStorage.removeItem("web-token")
        navigate("/")
    }

    return (
        <nav className={"navbar"}>
            <div>
                <Link to={"/"} className={"site-title"}>CLOUDNOTES</Link>
            </div>
            <div>
                <button className={"button logout"} onClick={logOut}>Log Out</button>
            </div>
        </nav>
    )
}