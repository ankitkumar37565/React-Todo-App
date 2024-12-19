import { createSlice } from "@reduxjs/toolkit";
const tasksSlice = createSlice({
    name:"tasks",
    initialState:[],
    reducers:{
        addTask:(state,action)=>{
            state.push({id:Date.now(),text:action.payload,completed:false});
        },
        toggleTask:(state,action)=>{
            const task = state.find((task)=>task.id === action.payload);
            if (task) task.completed=!task.completed;
        },
        deleteTask:(state,action)=>{
            return state.filter((task)=> task.id !== action.payload)
        },
        editTask:(state,action)=>{
            const { id, editedText } = action.payload;
            let task = state.find((task)=> task.id === id);
            if (task) {
                task.text = editedText;
            }
        },
    },
});
export const {addTask,toggleTask,deleteTask,editTask} =tasksSlice.actions;
export default tasksSlice.reducer;