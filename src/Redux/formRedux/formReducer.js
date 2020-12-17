import {User_Data,Delete_Data,Update_Data} from "./formType";

const initialState = {
    Data:[]
}

const Reducer = (state= initialState,action) => {
    switch (action.type) {
        case User_Data: return{
            ...state,
           Data: [...state.Data,action.payload]
        }
        case Delete_Data: return {
            ...state,
            Data: state.Data.filter((Data)=> Data.id !== action.payload)
        }
        case Update_Data:
            const UserDetails = state.Data.map(user => {
                if(user.id === action.payload.id) {
                    return action.payload
                }else {
                    return user
                }
             })
            return {
            ...state,
            Data: UserDetails
        }
        default:return state;
    }
}

export default Reducer;