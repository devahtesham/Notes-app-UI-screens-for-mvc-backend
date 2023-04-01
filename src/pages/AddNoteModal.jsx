import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import AlertBox from './AlertBox';
import NotesEntries from './NotesEntries';
import { addNote, getNotes, updateNote } from './store/Actions/Notes';
import { useNavigate } from 'react-router-dom';

function AddNoteModal() {
    
    const [show, setShow] = useState(false);
    const [noteTitle,setNoteTitle]=useState("")
    const [noteDescription,setNoteDescription]=useState("")
    const [noteStatus,setNoteStatus] = useState("In Progress")

// ================ states for update note (PUT) requests: start ==================== 
    const [isupdateNoteRequest,setIsUpdateNoteRequest] = useState(false) // this state for checking that it is the request of edit/put or not
    const [updatedNoteInfo,setUpdatedNoteInfo] = useState({})
// ================ states for update Note (PUT) requests: end ====================
    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    // getting values from an input
    const noteTitleHandler = (e)=>{
        setNoteTitle(e.target.value)

    }

    const noteDescriptionHandler = (e)=>{
        setNoteDescription(e.target.value)
    }

    // getting status
    const noteStatusHandler = (e)=>{
        setNoteStatus(e.target.value)
    }

    // getting updated note Info (note id, position in array or index number )
    const gettingUpdatedNoteInfo = (noteInfoObj)=>{
        setUpdatedNoteInfo(noteInfoObj)
    }

    // form handling 
    const formSubmitHandler = (e)=>{
        e.preventDefault()

        if (!noteTitle || !noteDescription || !noteStatus){
            // <AlertBox message = "Please Fill all Fields Properly !" />
            alert("Please Fill all Fields Properly")
            return
        }
        console.log("FORM SUBMITTED SUCCESSFULLY ...");

        // body for post request
        const body = {
            title:noteTitle,
            description:noteDescription,
            status:noteStatus
        }
        // sending data for post request in redux store
        // using axios, we dont need to stringify our body, we will pass in object form but in fetch we need to stringify body
        if (!isupdateNoteRequest){
            dispatch(addNote(body)) // for post data to our DB
        }else{
            const {_id,positionInArray} = updatedNoteInfo
            dispatch(updateNote({_id,...body},positionInArray))
            setIsUpdateNoteRequest(false)
        }
        handleClose();

        // reset all states
        setNoteTitle("");
        setNoteDescription("")
        setNoteStatus("In Progress")

    }

    // logout button
    const logoutUserHandler = ()=>{
        // localStorage.clear()
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        navigate("/login")
    }

    // Modal open and close function
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  
    


  return (
    <>
     <section className='dashboard'>
        <div className="container">
        <div className="row d-flex justify-content-center align-items-center mt-4">
            <div className="col-md-5 text-center">
            <Button variant="dark" onClick={handleShow}>Add New Note</Button>
            </div>
        </div>
        <div className='text-end'>
            <Button variant="warning" onClick={logoutUserHandler}>Logout</Button>
        </div>


        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create Note</Modal.Title>
        </Modal.Header>
            <form onSubmit={formSubmitHandler}>
                <Modal.Body>
                        <div className='mb-3'>
                            <label className='mb-2' htmlFor="title">Note Title</label>
                            <input type="text" name="" id="title" className='form-control' onChange={noteTitleHandler} value={noteTitle}/>
                        </div>
                        <div className='mb-3'>
                            <label className='mb-2' htmlFor="description">Note Description</label> <br />
                            <textarea name="" id="" cols="30" rows="4" className='w-100 form-control' onChange={noteDescriptionHandler} value={noteDescription}></textarea>
                        </div>
                        <div className='mb-3'>
                            <label className='mb-2' htmlFor="price">Note Status</label>
                            <select className="form-select" onChange={noteStatusHandler} value={noteStatus}>
                                <option defaultValue>In Progress</option>
                                <option value="Todo">Todo</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
            
                </Modal.Body>
                <div className='mb-4 text-center'>
                <Button variant="" className="add-note-btn" type='submit'>
                    Add Note
                </Button>
                </div>
            </form>
        </Modal>

        <NotesEntries
            handleClose={handleClose}
            handleShow={handleShow} 
            setNoteTitle={setNoteTitle} 
            setNoteDescription={setNoteDescription}
            setIsUpdateNoteRequest={setIsUpdateNoteRequest}
            gettingUpdatedNoteInfo={gettingUpdatedNoteInfo}
        />
        </div>
    </section>
    </>
  );
}
export default AddNoteModal

