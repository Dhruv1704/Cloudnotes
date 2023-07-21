import React from 'react'
import {useNavigate} from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem("web-token")
        localStorage.removeItem('notes')
        navigate("/")
    }


    return (
        <nav className={"md:hidden py-2 px-4 flex mx-auto items-center justify-between w-full"}>
            <div className={"w-[44px]"}></div>
            <h1 className={"decoration-0 select-none font-bold text-3xl"}>cloudnotes</h1>
            <div onClick={logOut} className={"bg-black w-[44px] h-[44px] justify-center rounded-full flex items-center cursor-pointer select-none"}>
                <i className="fa-solid fa-arrow-right-from-bracket text-white"></i>
            </div>
        </nav>
    )
}
