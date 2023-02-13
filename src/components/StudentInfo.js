import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
// import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'


function StudentInfo(props) {
    const [noteItem, setNoteItem] = useState([]);

    const context = useContext(noteContext)
    // let navigate = useNavigate()
    const { notes, getNote, } = context
   
   useEffect(()=>{
    let token =  localStorage.getItem('token')
    console.log(token,"jbsj")
    axios('http://localhost:8000/api/notes/fetchallnotesStudent',{ headers: {"Authorization" : ` ${token}`} }).then((res)=>setNoteItem(res.data)).catch((err)=>console.log(err))
   },[])

   


    return (
        <>
           
            <div className="row my-3">
                <h2>Student Details</h2>
                <div className="container">
                    {noteItem.length === 0 && "You have no notes"}
                </div>
                {noteItem.map((note) => {
                    return <NoteItem key={note._id} showAlert={props.showAlert}  note={note} />
                })}
            </div>
        </>
    )
}

export default StudentInfo


