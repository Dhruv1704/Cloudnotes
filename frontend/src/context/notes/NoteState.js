import NoteContext from "./noteContext";
import {useState} from "react";
import { toast } from 'react-toastify';

const NoteState = (props) => {

    const [notes, setNotes] = useState([]);
    const [progress, setProgress] = useState(0);

    const tst = (msg, type) => {
        const data = {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        }
        if (type === "success") {
            toast.success(`${msg}`, data);
        } else {
            toast.error(`${msg}`, data);
        }
    }


    //Get all notes
    const getNotes = async () => {
        setProgress(75)
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/note/fetchNotes`, {
            method: "GET",
            headers: {
                'content-Type': 'application/json',
                'web-token': localStorage.getItem('web-token')   // is only present for current tab and survives refresh. Will not be accessible in other tabs. Is deleted after the tab or browser is closed.
            },
        });

        const json = await response.json();
        setNotes(json)
        setProgress(100)
    }

    //Add note
    const addNote = async (title, description, tag, color) => {
        setProgress(30)
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/note/addNote`, {
            method: "POST",
            headers: {
                'content-Type': 'application/json',
                'Accept': 'application/json',
                'web-token': localStorage.getItem('web-token')
            },
            body: JSON.stringify({title, description, tag, color})
        });
        setProgress(50)

        const res = await response.json()
        tst(res.message,res.type)
        if(res.type==="success") {
            const note = res.savedNote
            setNotes(notes.concat(note))
        }
        setProgress(100)
    }

    //Delete note
    const deleteNote = async (id) => {
        const newNote = notes.filter((notes) => {
            return notes._id !== id
        })
        setNotes(newNote)

        const response = await fetch(`${process.env.REACT_APP_HOST}/api/note/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                'content-Type': 'application/json',
                'web-token': localStorage.getItem('web-token')
            },
        });

        const res = await response.json();
        tst(res.message, res.type)

        /*map, filter and reduce , spread operator, multiple function arguments operator.*/
    }


    //Edit note
    const editNote = async (id, title, description, tag, color) => {

        const newNotes = JSON.parse(JSON.stringify(notes))                          // error when directly changing notes as useState does not allow therefore creating a copy

        const response = await fetch(`${process.env.REACT_APP_HOST}/api/note/updateNote/${id}`, {
            method: "PUT",
            headers: {
                'content-Type': 'application/json',
                'web-token': localStorage.getItem('web-token')
            },
            body: JSON.stringify({title, description, tag, color})
        });
        const res = await response.json()
        if(res.type==="same"){
            return false;
        }
        tst(res.message, res.type)
        if(res.type==="success"){
            for (let i = 0; i < newNotes.length; i++) {
                const element = newNotes[i]
                if (element._id === id) {
                    element.title = title
                    element.description = description
                    element.tag = tag
                    element.color = color
                    break;
                }
            }
            setNotes(newNotes)
            return true;
        }
        return false;
    }

    const [showColors, setShowColors] = useState(false);

    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes, showColors, setShowColors, tst, progress, setProgress}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
