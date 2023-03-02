import React, {useEffect, useContext, useState} from 'react'
import Navbar from "./Navbar";
import AddNote from "./AddNote";
import noteContext from "../context/notes/noteContext";
import NoteCard from "./NoteCard";
import {useNavigate} from "react-router-dom";



export default function Notes() {

    const context = useContext(noteContext);
    const {notes, getNotes, getUserName} = context
    const navigate = useNavigate();

    const [name, setName] = useState("User");

    useEffect(() => {
        getUserName().then(userName=>{
            setName(userName.split(" ")[0])
        });
        document.body.style.background = "white";
        if(sessionStorage.getItem("web-token")){
            getNotes()
        }else{
            navigate("/")
        }
        // eslint-disable-next-line
    }, []);


    const displayAddNotes = () => {
        document.getElementById("add-div").style.display = "block"
    }


    const search = ()=>{
        const input = document.getElementById("search").value;
        const notes = document.getElementsByClassName("note-pad")
        Array.from(notes).forEach((element)=>{
            let noteText = element.getElementsByTagName("p")[0].textContent;
            let noteTitle = element.getElementsByTagName("h3")[0].textContent;
            let noteTag = element.getElementsByTagName("small")[0].textContent;
            if(noteText.toLowerCase().includes(input.toLowerCase()) || noteTitle.toLowerCase().includes(input.toLowerCase())|| noteTag.toLowerCase().includes(input.toLowerCase())){
                element.style.display = "block";
            }
            else {
                element.style.display = "none";
            }
        })
    }

    return (
        <>
            <Navbar/>
            <div className={"container"}>
                <h1>Welcome Back! {name}</h1>
                <hr className={"note-hr"}/>
                <i className="fa fa-search" aria-hidden="true"></i>
                <input type={"text"} className={"search"} id={"search"} placeholder={"Type to Search"} onInput={search}/>
                <div className="outer">
                    <div className="button" onClick={displayAddNotes}>
                        <div className="text">Add Note</div>
                    </div>
                </div>
                {notes.length === 0 ?
                    <p className="note-pad-p">Nothing to show! Use "Add a note" button to add notes</p> : ""}
                <div className={"notes"}>
                    {notes.map((note) => {
                        return (<NoteCard key={note._id} note={note}/>
                        )
                    })}
                </div>
                <AddNote/>
            </div>
        </>
    )
}