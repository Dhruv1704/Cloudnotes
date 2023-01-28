import NoteContext from "./noteContext";
import {useState} from "react";

const NoteState = (props) => {

    const host = "https://cloudnotes-backend.vercel.app"

    const initialNotes = []

    const [notes, setNotes] = useState(initialNotes);


    //Get all notes
    const getNotes = async ()=> {
        const response = await fetch(`${host}/api/note/fetchNotes`, {
            method: "GET",
            headers: {
                'content-Type': 'application/json',
                'web-token': sessionStorage.getItem('web-token')   // is only present for current tab and survives refresh. Will not be accessible in other tabs. Is deleted after the tab or browser is closed.
            },
        });

        const json = await response.json();
        setNotes(json)
    }

    //Add note
    const addNote = async (title, description, tag)=>{
        const response = await fetch(`${host}/api/note/addNote`,{
            method:"POST",
            headers:{
                'content-Type': 'application/json',
                'Accept':'application/json',
                'web-token': sessionStorage.getItem('web-token')
            },
            body: JSON.stringify({title, description, tag})
        });


        const note = await response.json()
        setNotes(notes.concat(note))
    }

    //Delete note
    const deleteNote = async (id)=>{
        const newNote = notes.filter((notes)=>{return notes._id!==id})
        setNotes(newNote)

        await fetch(`${host}/api/note/deleteNote/${id}`,{
            method:"DELETE",
            headers:{
                'content-Type':'application/json',
                'web-token': sessionStorage.getItem('web-token')
            },
        });
        /*map, filter and reduce , spread operator, multiple function arguments operator.*/
    }


    //Edit note
    const editNote = async (id, title, description, tag)=>{

        const newNotes = JSON.parse(JSON.stringify(notes))                          // error when directly changing notes as useState does not allow therefore creating a copy
        for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i]
            if(element._id===id){
                newNotes[i].title = title
                newNotes[i].description = description
                newNotes[i].tag = tag
                break;
            }
        }
        setNotes(newNotes)

        await fetch(`${host}/api/note/updateNote/${id}`,{
            method:"PUT",
            headers:{
                'content-Type':'application/json',
                'web-token': sessionStorage.getItem('web-token')
            },
            body: JSON.stringify({title, description, tag})
        });
    }

    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes, host}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;