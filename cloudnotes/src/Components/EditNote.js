import React, {useContext, useState} from 'react'  //problem note_id in id edit-div and closemodal in updateNote
import noteContext from "../context/notes/noteContext";

export default function EditNote(props) {

    const context = useContext(noteContext)
    const {editNote} = context

    const {note} = props
    const closeModal = () => {
        setNotes({id:note._id,etitle:note.title,edescription:note.description,etag:note.tag})
        document.getElementById(`edit-div ${note._id}`).style.display = "none";  // problem with closemodal and updateNote  ,try commenting updateNote setNotes.
    }

    const [notes, setNotes] = useState({id:note._id,etitle:note.title,edescription:note.description,etag:note.tag})

    const onChange = (e) => {
        setNotes({...notes, [e.target.name]: e.target.value}) //spread operator
    }

    const updateNote = (e)=>{
        e.preventDefault();
        editNote(notes.id,notes.etitle,notes.edescription,notes.etag)
        document.getElementById(`edit-div ${note._id}`).style.display = "none";  // problem with closemodal and updateNote  ,try commenting updateNote setNotes.
    }

    return (
        <div id={`edit-div ${note._id}`} className={"add-div"}>
            <div className="textarea-div">
                <span className="close" onClick={closeModal}>&times;</span>
                <form id={"add-form"} onSubmit={updateNote}>
                    <p className="sub-heading">Title</p>
                    <input placeholder="Enter title. Min-3 characters" id="title-input" name={"etitle"} value={notes.etitle} onChange={onChange} minLength={3} required/>
                    <p className="sub-heading">Description</p>
                    <textarea id="textarea" placeholder={"Enter notes here. Min-5 characters"} name={"edescription"} value={notes.edescription} onChange={onChange} minLength={5} required></textarea>
                    <p className="sub-heading">Tag</p>
                    <input placeholder="Enter tag. Ex-Work,Personal etc" id="title-input" name={"etag"} value={notes.etag} onChange={onChange} required/>
                    <br/>
                    <button type="submit" className="button" id="add_button">Edit Note</button>
                </form>
            </div>
        </div>
    )
}