import React, {useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";

const AddButton = ({setColor}) => {
    const context = useContext(noteContext);
    const {showColors, setShowColors} = context

    const [plusTrue, setPlusTrue] = useState(true);
    function plusToMinus() {
        const button = document.getElementById("plus-button")
        const plus = document.getElementById("plus-sign")
        const minus = document.getElementById("minus-sign")
        if (plusTrue) {
            button.style.transform = "rotate(0deg)";
            plus.style.opacity = 0;
            minus.style.opacity = 1;
            setPlusTrue(false);
            setShowColors(true)
        } else {
            button.style.transform = "rotate(-90deg)";
            plus.style.opacity = 1;
            minus.style.opacity = 0;
            setPlusTrue(true);
            setShowColors(false)
        }
    }

    const displayAddNotes = (color) => {
        setColor(color)
        document.getElementById("add-div").style.display = "block"
        plusToMinus()
    }

    return (
        <>
            <div
                className={"bg-black z-30 w-[56px] h-[56px] rounded-full select-none flex items-center justify-center fixed bottom-10 right-[17px] cursor-pointer transition-all duration-500 ease-out md:left-[74.5px] md:top-32"}
                onClick={plusToMinus} id={"plus-button"}>
                <i className="fa-solid fa-plus rotate-90 text-white plus absolute opacity-1 transition-all duration-500 ease-out"
                   id={"plus-sign"}></i>
                <i className="fa-solid fa-minus text-white minus absolute opacity-0 transition-all duration-500 ease-out"
                   id={"minus-sign"}></i>
            </div>
            <div className={"fixed z-20 bottom-10 flex items-center flex-col w-[56px] h-[56px] right-[17px] md:left-[74.5px] md:top-32"}>
                <div
                    className={`bg-[#71ffaf] ${showColors ? "translate-y-[-40px] md:translate-y-[80px]" : ""} cursor-pointer transition-all duration-300 ease-in-out absolute rounded-full w-6 h-6 active:scale-75`} onClick={()=>displayAddNotes("#71ffaf")}></div>
                <div
                    className={`bg-[#ffc972] ${showColors ? "translate-y-[-80px] md:translate-y-[120px]" : ""} absolute cursor-pointer transition-all duration-300 ease-in-out rounded-full w-6 h-6 active:scale-75`} onClick={()=>displayAddNotes("#ffc972")}></div>
                <div
                    className={`bg-[#ff9b74] ${showColors ? "translate-y-[-120px] md:translate-y-[160px]" : ""} absolute cursor-pointer transition-all duration-300 ease-in-out rounded-full w-6 h-6 active:scale-75`} onClick={()=>displayAddNotes("#ff9b74")}></div>
                <div
                    className={`bg-[#b692fe] ${showColors ? "translate-y-[-160px] md:translate-y-[200px]" : ""} absolute transition-all cursor-pointer duration-300 ease-in-out rounded-full w-6 h-6 active:scale-75`} onClick={()=>displayAddNotes("#b692fe")}></div>
                <div
                    className={`bg-[#00d4ff] ${showColors ? "translate-y-[-200px] md:translate-y-[240px]" : ""} absolute cursor-pointer transition-all duration-300 ease-in-out rounded-full w-6 h-6 active:scale-75`} onClick={()=>displayAddNotes("#00d4ff")}></div>
                <div
                    className={`bg-[#e6ee92] ${showColors ? "translate-y-[-240px] md:translate-y-[280px]" : ""} absolute cursor-pointer transition-all duration-300 ease-in-out rounded-full w-6 h-6 active:scale-75`} onClick={()=>displayAddNotes("#e6ee92")}></div>
            </div>
        </>
    )
}

export default AddButton;
