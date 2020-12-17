import {User_Data,Delete_Data,Update_Data} from "./formType";

export const UserData = (Data) => {
    return{
        type:User_Data,
        payload: Data
    }
}
export const DeleteData = (Data) => {
    return{
        type:Delete_Data,
        payload: Data
    }
}
export const UpdateData = (Data) => {
    return{
        type:Update_Data,
        payload: Data
    }
}


