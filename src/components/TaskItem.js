import React from "react";
const TaskItem = ({task,onDelete,onToggle}) =>(
    <div style={{
        display:'flex',justifyContent:'space-between', padding:'10px 0',borderBottom:'1px solid #ccc'
    }}>
        <span
        onClick={()=> onToggle(task.id)}
        style={{
            textDecoration:task.completed?'line-through':'none',
            cursor:'pointer'
        }}>
            {task.text}
        </span>
        <button onClick={()=> onDelete(task.id)} style={{color:'red'}}>Delete</button>
    </div>
);
export default TaskItem;