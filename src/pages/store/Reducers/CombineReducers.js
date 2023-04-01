import { combineReducers } from "redux";
import { GetNotesReducer } from "./NotesReducer";

const CombineReducers = combineReducers({
    GetNotesReducer:GetNotesReducer,
})

export default CombineReducers