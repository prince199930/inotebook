import React, { useRef } from 'react'
import { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import JoditEditor from 'jodit-react';

function AddNote(props) {
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const editor = useRef(null);
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", instagram: "", linkedin: "", twitter: "", })
    
    const handleClick = (e) => {
        var formData_value = new FormData();
        formData_value.append('image', image);
        formData_value.append('title', note.title);
        formData_value.append('description', note.description);
        formData_value.append('instagram', note.instagram);
        formData_value.append('linkedin', note.linkedin);
        formData_value.append('twitter', note.twitter);
        formData_value.append('content', content)
        for (var pair of formData_value.entries()) {
            console.log(pair[0] + ", " + pair[1]);
        }
        e.preventDefault()
        
        addNote( formData_value)
        setNote({ title: "", description: "", instagram: "", linkedin: "", twitter: ""
        })
        setContent('')
        props.showAlert("Note added successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value, })
    }
    const [fileImage, setfileImage] = useState();

    const handleImage = (e)=>{
        setImage(e.target.files[0])
        setfileImage(URL.createObjectURL(e.target.files[0]));
        
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Name</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required value={note.title} />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Email</label>
                    <input type="email" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required value={note.description} />
                </div>
                <div className="mb-3">
                    <label htmlFor="instagram" className="form-label">Contact no</label>
                    <input type="number" className="form-control" id="instagram" name="instagram" onChange={onChange} value={note.instagram} />
                </div>
                <div className="mb-3">
                    <label htmlFor="linkedin" className="form-label">Location</label>
                    <input type="text" className="form-control" id="linkedin" name="linkedin" onChange={onChange} value={note.linkedin} />
                </div>
                <div className="mb-3">
                    <label htmlFor="twitter" className="form-label">Desciption</label>
                    <input type="text" className="form-control" id="twitter" name="twitter" onChange={onChange} value={note.twitter} />
                </div>
                <div className="mb-3">
                    <JoditEditor
                        ref={editor}
                        value={content}
                        
                        onChange={newContent => setContent(newContent)}
                    />
                </div>
                <div className="mb-3">
                    <input type='file' name="file" onChange={handleImage}/>
                </div>

                <button disabled={note.title=="" || note.description==""} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
