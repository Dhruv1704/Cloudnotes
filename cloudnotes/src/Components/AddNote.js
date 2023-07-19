import React from 'react'
import {useState, useContext} from "react";
import noteContext from "../context/notes/noteContext";


export default function AddNote({color}) {

    const closeModal = () => {
        setNote({title: "", description: "", tag: ""});
        document.getElementById("add-div").style.display = "none";
    }
    const context = useContext(noteContext);
    const {addNote} = context

    const [note, setNote] = useState({title: "", description: "", tag: ""});

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value}) //spread operator
    }

    const handleAdd = (e) => {
        e.preventDefault();
        addNote(note.title.trim(), note.description.trim(), note.tag.trim(), color)
        setNote({title: "", description: "", tag: ""})   // value= ""  form.reset not working due to e.preventDefault(), form input value={note.title}
        closeModal()
    }


    return (
        <div id={"add-div"} className={"hidden fixed top-0 left-0 box-border px-2 w-full h-full bg-[#ffffffcc] z-50"}>
            <div className="relative top-[25%] bg-white max-w-4xl m-auto p-4 pt-0 pb-1 rounded-xl shadow-2xl">
                <form id={"add-form"} onSubmit={handleAdd}>
                    <div className={"flex items-center justify-between"}>
                        <p className="text-xl self-end">Title</p>
                        <span
                            className="text-[#aaaaaa] font-bold text-[28px] cursor-pointer hover:text-black decoration-0"
                            onClick={closeModal}>&times;</span>
                    </div>
                    <input placeholder="Min-3 characters (Should be unique)" name={"title"}
                           value={note.title} className={"border-[1px] rounded-md my-2 p-2 w-full"} onChange={onChange} minLength={3} required/>
                    <p className="text-xl">Description</p>
                    <textarea placeholder={"Min-5 characters"} name={"description"}
                              value={note.description} className={"w-full border-[1px] rounded-md my-2 p-2 resize-y"}
                              onChange={onChange} minLength={5} required></textarea>
                    <p className="text-xl">Tag</p>
                    <input placeholder="Ex-Work,Personal etc" className={"border-[1px] rounded-md my-2 p-2 w-full"} name={"tag"} value={note.tag}
                           onChange={onChange} required/>
                    <button type="submit" className="button active:scale-95" id="add_button">
                        <span className={"text"}>Add Note</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
