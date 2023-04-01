import React, { useEffect } from 'react'
import "./Notes.css"
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import {RxCross2} from "react-icons/rx"
import {MdModeEdit} from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, getNotes, updateNote } from './store/Actions/Notes';
import Loader from './Loader/Loader';

const NotesEntries = (props) => {
    const {
        handleShow,
        setNoteTitle,
        setNoteDescription,
        setIsUpdateNoteRequest,
        gettingUpdatedNoteInfo
    } =  props
    const dispatch = useDispatch() // for calling an action
    const { allNotes,dataLoading } = useSelector(state => state.GetNotesReducer) // for recieving state which is managing in redux

    useEffect(()=>{
        dispatch(getNotes())
    },[])

    // edit note
    const noteEditHandler = (_id,title,description,positionInArray)=>{
        handleShow()        // for openning a modal 
        setNoteTitle(title)
        setNoteDescription(description)
        // to tell that this time it is put request not post, because i am using same component for POST and UPDATE request
        setIsUpdateNoteRequest(true)

        let noteInfo = {
            _id:_id,
            positionInArray:positionInArray
        }
        gettingUpdatedNoteInfo(noteInfo)
    }

    // delete note
    const noteDeleteHandler = (_id)=>{
        dispatch(deleteNote(_id))
    }

  return (
    <>

        <div className="row d-flex justify-content-between mt-5">
            {
                dataLoading ? <Loader />
                :
                allNotes.map((note,index)=> <div className="col-xl-4 col-lg-4 col-md-6 mb-4 mt-5" key={index}>
                    <div className="product-card ">
                        <div >
                            <div className='text-end mb-3'> 
                                <span className='edit-btn' onClick={()=>{
                                    noteEditHandler(note._id,note.title,note.description,index)
                                }}>
                                    {/* <BiEdit size={20} /> */}
                                    <MdModeEdit size={19} color={"#000"}/>
                                </span>
                            </div>
                            <h2 className='main-heading'>{note.title}</h2>
                            <div>
                                <span className='delete-btn' onClick={()=>{
                                    noteDeleteHandler(note._id)
                                }}          
                                >
                                    {/* <MdDelete size={20} /> */}
                                    <RxCross2 size={20} color={"white"}/>
                                </span>
                            </div>
                        </div>
                        {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus, minus quo velit ratione nesciunt eos?</p> */}
                        <p className='description'>{note.description}</p>
                        <h6 className='status text-end'>{note.status}</h6>
                    </div>
                </div>)

            }




            
        </div>
        
    </>
  )
}

export default NotesEntries