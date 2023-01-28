import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext";
import EditNote from "./EditNote";

export default function NoteCard(props) {
    const {note} = props;

    const context = useContext(noteContext);
    const {deleteNote} = context

    const displayEditNotes = () => {
        document.getElementById(`edit-div ${note._id}`).style.display = "block"
    }

    return (
        <>
            <div className="note-pad">
                <div className={"tag-flex"}>
                    <div className={"delete-edit-icon-div"}>
                        <h3 className="note-pad-title">{note.title}</h3>
                        <i className="fa-solid fa-pen-to-square fa" onClick={displayEditNotes}></i>
                        <i className="fa fa-trash" aria-hidden="true" onClick={() => {
                            deleteNote(note._id)
                        }}></i> {/*note is from props*/}
                    </div>
                    <div>
                        <small>{note.tag}</small>
                    </div>
                </div>
                <p className="note-pad-p">{note.description}</p>
            </div>
            <EditNote note={note}/>
        </>
    )
}