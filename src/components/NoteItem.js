import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
// import resume from '../../backend/uploads/apk/Prince-current-resume.pdf'
function NoteItem(props) {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, updateNote } = props
   
    let url = "http://localhost:8000/uploads/apk/" + note.database_fileName 
    const onButtonClick = () => {
        fetch(url).then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = note.database_fileName;
                alink.click();
            })
        })
    }
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.linkedin}</p>
                    <p className="card-text">{note.twitter}</p>
                    <p className="card-text">{note.instagram}</p>
                    <p className="card-text">{note.content}</p>
                    <div style={{width:"200px", height:"220px"}}>
                    <a href={url}>{note.database_fileName}</a>
   <button onClick={onButtonClick} style={{border:"none", outline:"none", textDecoration:"none", backgroundColor:"yellow",padding:"8px", borderRadius:"20px", marginTop:"10px", boxShadow:"0 6px 6px yellow", color:"#c06666"}}>
                    Download PDF
                </button>
                    </div>
                    <i className="fas fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully", "success")}}></i>
                    <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
