import { createSlice } from '@reduxjs/toolkit'



let initialUser = {};
let isLoggedIn = false;


const savedSession = JSON.parse(localStorage.getItem('authData'));
if (savedSession && savedSession.expiry > Date.now()) {
    initialUser = savedSession.userData;
    isLoggedIn = true;
} 

const initialState = {
    userData: initialUser,
    isLoggedIn: isLoggedIn ,
}

export const userSlice = createSlice({

    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.userData = action.payload
            state.isLoggedIn = true


            const expiryTime = Date.now() + 60 * 60 * 1000;

            const sessionData = {
                userData: action.payload,
                expiryTime: expiryTime,
            };

            


        },
        logoutUser: (state) => {
            
            state.isLoggedIn = false
            state.userData = {}
           
            
        },
        updateUser: (state, action) => {
            state.userData = { ...state.userData, ...action.payload }
        },
    },
})

export const { saveUser, logoutUser, updateUser } = userSlice.actions

export default userSlice.reducer