import react, { useState } from "react";
import NoteContext from "./noteContext";

import axios from 'axios'
const NoteState = (props) => {
    const host = "http://localhost:8000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

     //Get all Note
     const getNote = async() => {

        //API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')

            },
            
        });

        const json = await response.json();
        
        setNotes(json);
    }

    //Add a Note
    const addNote = async(formData_value) => {
        for (var pair of formData_value.entries()) {
            console.log(pair[0] + ", " + pair[1]);
        }
        console.log(formData_value,'formdata')
        const response = await axios.post(`${host}/api/notes/addnote`,formData_value,
        { headers: {"auth-token" : ` ${localStorage.getItem('token')}`} }
        ).then((response)=>console.log(response.data)).catch((err)=>console.log(err))
        getNote();
    }


    //Delete a Note
    const deleteNote = async(id) => {

           //API CALL
           const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')

            },
            body: JSON.stringify()
        });
        const json = response.json();

        setNotes(notes.filter(note => note._id !== id));
    }

    //Edit a Note
    const editNoteWithoutImg = async ({note, eimage, econtent} ) => {
        console.log("this is em note", note , eimage, econtent)
        //API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${note.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')

            },
            body: JSON.stringify({note, eimage, econtent})
        });
        getNote();

        
    }
    const editNoteWithImg = async (formData_value) => {
        console.log("this is em formdata", formData_value )
        let formDataId ;
        for (var pair of formData_value.entries()) {
            console.log(pair[0] + ", " + pair[1], "IDS");
            if(pair[0] === "id"){
                formDataId = pair[1]
            }
        }
        const response = await axios.post(`${host}/api/notes/updatenote/${formDataId}`, formData_value,{
            headers: {"auth-token" : ` ${localStorage.getItem('token')}`} 
        })
        getNote();
    }

    
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNoteWithoutImg,editNoteWithImg, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;

