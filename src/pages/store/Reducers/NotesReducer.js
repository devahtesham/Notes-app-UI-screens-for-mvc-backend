import ACTION_TYPE from "../ReduxConstants/Actiontype"

const INITIAL_STATE = {
    dataLoading:false,
    allNotes:[],
}

const GetNotesReducer = (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case ACTION_TYPE.NOTES_DATA_LOADING:
            return{
                ...state,
                dataLoading:true
            }
        case ACTION_TYPE.NOTES_DATA_LOADING_SUCCESS:
            return{
                allNotes:[...state.allNotes,...action.payload]
            }

        case ACTION_TYPE.NOTES_DATA_LOADING_ERROR:
            return{
                ...state,
                dataLoading:false
            }

        case ACTION_TYPE.ADD_NOTE:
            return{
                allNotes:[...state.allNotes,action.payload]
            }

        case ACTION_TYPE.UPDATE_NOTE:
                const totalNotes = [...state.allNotes];
                totalNotes[action.payload.index] = action.payload.data
                // console.log("totalNotes",totalNotes);
            return{
                allNotes:[...totalNotes]
            }

        case ACTION_TYPE.DELETE_NOTE:
            const total_Notes = [...state.allNotes];
            const filteredItems = total_Notes.filter((note,i) => note._id !== action.payload._id)
            return{
                allNotes:[...filteredItems]
            }

        default:
            return {
                ...state
            }
    }
}



export {GetNotesReducer}