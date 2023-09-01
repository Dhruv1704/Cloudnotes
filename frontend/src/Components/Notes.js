import React, {useEffect, useContext, useState} from 'react'
import AddNote from "./AddNote";
import noteContext from "../context/notes/noteContext";
import NoteCard from "./NoteCard";
import {useNavigate} from "react-router-dom";
import AddButton from "./AddButton";
import DeleteNote from "./DeleteNote";
import LoadingBar from "react-top-loading-bar";


export default function Notes() {

    const [scroll, setScroll] = useState(window.scrollY);
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        const onScroll = () => {
            // check if we scroll up then true or [(if device is not mobile and scroll<25) and if scroll<60 for mobile]
            // we need false to be invisible
            const v= window.scrollY < scroll || ((window.innerWidth>768 && window.scrollY<25) || ((window.innerWidth<769 && window.scrollY<65)))
            setVisible(v)
            setScroll(window.scrollY)
        }
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    });

    const context = useContext(noteContext);
    const {notes, getNotes, showColors, progress, setProgress} = context
    const navigate = useNavigate();
    const [color, setColor] = useState("#71ffaf");

    const [noteID, setNoteID] = useState("");

    useEffect(() => {
        if (localStorage.getItem("web-token")) {
            getNotes()
        } else {
            navigate("/")
        }
        // eslint-disable-next-line
    }, []);


    const search = () => {
        const input = document.getElementById("search").value;
        const notes = document.getElementsByClassName("notes")
        Array.from(notes).forEach((element) => {
            let noteText = element.getElementsByTagName("p")[0].textContent;
            let noteTitle = element.getElementsByTagName("h3")[0].textContent;
            let noteTag = element.getElementsByTagName("small")[0].textContent;
            if (noteText.toLowerCase().includes(input.toLowerCase()) || noteTitle.toLowerCase().includes(input.toLowerCase()) || noteTag.toLowerCase().includes(input.toLowerCase())) {
                element.classList.remove("hidden")
                element.classList.add("visible")
            } else {
                element.classList.remove("visible")
                element.classList.add("hidden")
            }
        })
    }


    return (
        <>
            <LoadingBar
                height={3}
                color={"#00adee"}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div
                className={`absolute md:hidden top-0 w-full h-full ${showColors ? "block" : "hidden"} bg-[#ffffffcc] z-20`}></div>
            <div className={"xl:basis-10/12 lg:basis-4/5 md:basis-9/12 md:pt-5 mx-auto md:mr-0 md:ml-auto"}>
                <div className={"mx-auto px-4 md:px-8 pb-2"}>
                    <div className={`sticky top-[20px] z-10 transition-transform ease-out duration-500 ${visible?"translate-y-0":"-translate-y-20"}`}>
                        <input type={"text"} className={"select-none w-full mt-2 mb-2 md:mb-0 md:mt-0 py-[0.25em] pl-[2em] font-semibold rounded-2xl bg-[#f5f6f7] box-border"} id={"search"} placeholder={"Type to Search"}
                               onInput={search}/>
                        <i className="fa fa-search absolute top-[33%] md:top-[24%] left-3" aria-hidden="true"></i>
                    </div>
                    <h1 className={"text-5xl font-bold my-4 mb-6 select-none hidden md:block"}>Notes</h1>
                    {(notes.length === 0 || notes===null || notes===undefined) ?
                        <p className="whitespace-pre-line">Nothing To Display!</p> : ""}
                    <div className={"grid grid-cols-[repeat(auto-fill,348px)] gap-y-10 gap-x-4 justify-around mb-10 mt-6 lg:justify-between"}>
                        {notes.slice().reverse().map((note) => {
                            return (<NoteCard key={note._id} note={note} noteID={noteID} setNoteID={setNoteID}/>
                            )
                        })}
                    </div>
                    <AddButton setColor={setColor}/>
                    <AddNote color={color}/>
                    <DeleteNote/>
                </div>
            </div>
        </>
    )
}
