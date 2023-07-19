import React, {useEffect, useContext, useState} from 'react'
import AddNote from "./AddNote";
import noteContext from "../context/notes/noteContext";
import NoteCard from "./NoteCard";
import {useNavigate} from "react-router-dom";
import AddButton from "./AddButton";
import DeleteNote from "./DeleteNote";
import LoadingBar from "react-top-loading-bar";


export default function Notes() {

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
        const notes = document.getElementsByClassName("note-pad")
        Array.from(notes).forEach((element) => {
            let noteText = element.getElementsByTagName("p")[0].textContent;
            let noteTitle = element.getElementsByTagName("h3")[0].textContent;
            let noteTag = element.getElementsByTagName("small")[0].textContent;
            if (noteText.toLowerCase().includes(input.toLowerCase()) || noteTitle.toLowerCase().includes(input.toLowerCase()) || noteTag.toLowerCase().includes(input.toLowerCase())) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
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
                className={`absolute md:hidden top-0 w-full h-full ${showColors ? "block" : "hidden"} bg-[#ffffffcc] z-10`}></div>
            <div className={"xl:basis-10/12 lg:basis-4/5 md:basis-9/12 md:pt-5 mx-auto md:mr-0 md:ml-auto"}>
                <div className={"mx-auto px-4 md:px-8 pb-2"}>
                    <div className={"relative"}>
                        <input type={"text"} className={"select-none w-full mt-2 mb-2 md:mb-0 md:mt-0 py-[0.25em] pl-[2em] font-semibold rounded-2xl bg-[#f5f6f7] box-border"} id={"search"} placeholder={"Type to Search"}
                               onInput={search}/>
                        <i className="fa fa-search absolute top-[33%] md:top-[24%] left-3" aria-hidden="true"></i>
                    </div>
                    <h1 className={"text-5xl font-bold my-4 mb-6 select-none hidden md:block"}>Notes</h1>
                    {notes.length === 0 ?
                        <p className="whitespace-pre-line">Nothing to show! Use "Add a note" button to add notes</p> : ""}
                    <div className={"grid grid-cols-[repeat(auto-fill,348px)] gap-y-10 justify-around mb-20 mt-6 lg:justify-between"}>
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
