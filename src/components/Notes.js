import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'
import { useHistory } from 'react-router-dom'
import JoditEditor from 'jodit-react';


function Notes(props) {

    const context = useContext(noteContext)
    let history = useHistory()
    const { notes, getNote, editNoteWithoutImg, editNoteWithImg } = context
    const editor = useRef(null);
    const [econtent, setEContent] = useState('');
    const [eimage, setEImage] = useState('')
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", elinkedin: "", etwitter: "", einstagram: "" });
    const ref = useRef(null);
    const refClose = useRef(null);
    const [counter, setCounter] = useState(false);
    const [imageValue, setImageValue] = useState(false);
    const [fileImage, setfileImage] = useState();

    useEffect(() => {

        if (localStorage.getItem('token')) {
            getNote()
        }
        else {
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()

        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, elinkedin: currentNote.linkedin, etwitter: currentNote.twitter, einstagram: currentNote.instagram, })
        setEContent(currentNote.content)
        setEImage(currentNote.database_fileName)
    }

    const handleClick = (e) => {
        if (counter) {
            e.preventDefault()
            var formData_value = new FormData();
            formData_value.append('image', eimage);
            formData_value.append('id', note.id);
            formData_value.append('title', note.etitle);
            formData_value.append('description', note.edescription);
            formData_value.append('instagram', note.elinkedin);
            formData_value.append('linkedin', note.etwitter);
            formData_value.append('twitter', note.einstagram);
            formData_value.append('content', econtent)
            editNoteWithImg(formData_value);
            refClose.current.click()
            props.showAlert("Update Successfully", "success")
        }
        else {
            editNoteWithoutImg({ note, eimage, econtent })
        }
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
   
    const handleImage = (e) => {
        setImageValue(true);
        setCounter(true)
        setEImage(e.target.files[0]);
        setfileImage(URL.createObjectURL(e.target.files[0]));
    }
    
    let url = "http://localhost:6000/uploads/apk/" + eimage;

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button style={{ display: "none" }} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Student</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} minLength={5} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="linkedin" className="form-label">Location</label>
                                    <input type="text" className="form-control" id="elinkedin" name="elinkedin" onChange={onChange} value={note.elinkedin} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="twitter" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="etwitter" name="etwitter" onChange={onChange} value={note.etwitter} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="instagram" className="form-label">Contact no</label>
                                    <input type="number" className="form-control" id="einstagram" name="einstagram" onChange={onChange} value={note.einstagram} />
                                </div>
                                <div className="mb-3">
                                    <JoditEditor
                                        ref={editor}
                                        value={econtent}
                                        onChange={newContent => setEContent(newContent)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input type='file' name="file" onChange={handleImage} />
                                </div>
                                <div style={{ width: "200px", height: "220px" }}><img style={{ width: "100%" }} src={imageValue == true ? fileImage : url} /></div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>About Students</h2>
                <div className="container">
                    {notes.length === 0 && "You have no notes"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes


