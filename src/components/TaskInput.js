import React, {useState} from "react";
import { TextField, Button } from "@mui/material";

const TaskInput = ({onAddTask}) => {
    const [task,setTask] = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(task.trim()) {
            onAddTask(task);
            setTask('');
        }
    }
    return (
        <form onSubmit={handleSubmit} style={{display:'flex',justifyContent:'center',margin:'20px 0'}}>
        {/* <input
            type="text"
            value={task}
            onChange={(e)=> setTask(e.target.value)}
            placeholder="Add a new task"
            style={{padding:'10px',width:'60%',marginRight:'10px'}}
            />
            <button type="submit" style={{padding: '10px 20px'}}>Add</button> */}
            <TextField
            label="Add a new task"
            variant="outlined"
            value={task}
            onChange={(e)=>setTask(e.target.value)}
            fullWidth
            />
            <Button type="Submit" variant="contained" color="primary">
                Add
            </Button>
    </form>
);
};
export default TaskInput;