import React from 'react'
import {useState, useContext} from "react";
import noteContext from "../context/notes/noteContext";


export default function AddNote() {

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
        addNote(note.title, note.description, note.tag)
        setNote({title: "", description: "", tag: ""})   // value= ""  form.reset not working due to e.preventDefault(), form input value={note.title}
        closeModal()
    }


    return (
        <div id={"add-div"} className={"add-div"}>
            <div className="textarea-div">
                <span className="close" onClick={closeModal}>&times;</span>
                <form id={"add-form"} onSubmit={handleAdd}>
                    <p className="sub-heading">Title</p>
                    <input placeholder="Enter title.  Min-3 characters. Should be unique" id="title-input" name={"title"} value={note.title} onChange={onChange} minLength={3} required/>
                    <p className="sub-heading">Description</p>
                    <textarea id="textarea" placeholder={"Enter notes here. Min-5 characters"} name={"description"} value={note.description}
                              onChange={onChange} minLength={5} required></textarea>
                    <p className="sub-heading">Tag</p>
                    <input placeholder="Enter tag. Ex-Work,Personal etc" id="title-input" name={"tag"} value={note.tag}
                           onChange={onChange} required/>
                    <br/>
                    <button type="submit"  className="button-modal" id="add_button">Add Note</button>
                </form>
            </div>
        </div>
    )
}