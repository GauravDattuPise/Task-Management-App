import {configureStore, createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name : "Auth",
    initialState : {
        isLogin : false,
        myTasks : []
    },
    reducers : {
        login(state){
            state.isLogin = true
        },

        logout(state){
            state.isLogin = false
        }
    }
});

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer : authSlice.reducer
});