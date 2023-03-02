import React from 'react'
import {Link, useNavigate} from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();
    const logOut = () => {
        sessionStorage.removeItem("web-token")
        navigate("/")
    }

    const removeWebToken = () => {
        sessionStorage.removeItem("web-token");
    }

    return (
        <nav className={"navbar"}>
            <div>
                <Link to={"/"} className={"site-title"} onClick={removeWebToken}>CLOUDNOTES</Link>
            </div>
            <div>
                <div className="button logout" onClick={logOut}>
                    <div className="text">Log Out</div>
                </div>
            </div>
        </nav>
    )
}