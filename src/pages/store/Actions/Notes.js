import { ActionTypes } from "@mui/base"
import axios from "axios"
import ACTION_TYPE from "../ReduxConstants/Actiontype"
import { toast } from "react-hot-toast"

// Action for getting all products from db
const getNotes = ()=>{
    return async(dispatch)=>{
        dispatch({
            type:ACTION_TYPE.NOTES_DATA_LOADING
        })
        // call get products api which is created in nodejs
        // this is a private api, so we need to pass a token in this to authrize user

        try {
            const response = await axios.get("https://notes-app-dev-ak.cyclic.app/api/notes",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            
            const data = response.data.data
            // console.log(data);
            dispatch({
                type:ACTION_TYPE.NOTES_DATA_LOADING_SUCCESS,
                payload:data
            })
            toast.success(response.data.message)
        } catch (error) {
            dispatch({
                type:ACTION_TYPE.NOTES_DATA_LOADING_ERROR,
            })
            toast.error(error.response.data.message)
            // console.log("error",error);
        }
    }
}

// Action for send/create product in db
const addNote = (body)=>{
    return async (dispatch)=>{
        try {
            // this is a private api, so we need to pass a token in this to authrize user
            const response = await axios.post("https://notes-app-dev-ak.cyclic.app/api/note",body,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = response.data.data
            dispatch({
                type:ACTION_TYPE.ADD_NOTE,
                payload:data
            })
            // react toast library for displaying notifications
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            // console.log("error",error);
        }
    }
}
// Action for update product in db
const updateNote = (body,index)=>{
    return async (dispatch)=>{
        try {
            // this is a private api, so we need to pass a token in this to authrize user

            const response = await axios.put("https://notes-app-dev-ak.cyclic.app/api/note",body,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = response.data.data
            dispatch({
                type:ACTION_TYPE.UPDATE_NOTE,
                payload:{data,index}
            })
            toast.success(response.data.message)
        } catch (error) {
            // console.log("error",error);
            toast.error(error.response.data.message)
        }
    }
}

// Action for delete product in db
const deleteNote = (noteId)=>{
    return async (dispatch)=>{
        try {
            // this is a private api, so we need to pass a token in this to authrize user
            const response = await axios.delete(`https://notes-app-dev-ak.cyclic.app/api/note/${noteId}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = response.data.data
            dispatch({
                type:ACTION_TYPE.DELETE_NOTE,
                payload:data
            })
            toast.success(response.data.message)
        } catch (error) {
            // console.log("error",error);
            toast.error(error.response.data.message)
        }
    }
}

export { getNotes,addNote,updateNote,deleteNote }