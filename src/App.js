import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, toggleTask, deleteTask, editTask } from "./components/tasksSlice";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./index.css";
const App = () =>{
  const tasks = useSelector((state)=> state.tasks);
  const dispatch = useDispatch();
  // const [tasks,setTasks] = useState([]);
  const [filter,setFilter] = useState("All");
  // const addTask = (text)=>{
  //   if(!text.trim()) return;
  //   const newTask = {id:Date.now(),text:text.trim(),completed:false};
  //   setTasks([...tasks,newTask]);
  // };
  // const deleteTask = (id)=>{
  //   setTasks(tasks.filter(task=>task.id!==id));
  // };
  const filteredTasks = tasks.filter((task)=>{
    if(filter === 'Completed') return task.completed;
    if(filter === 'Incomplete') return !task.completed;
    return true;
  })
  // const toggleTask = (id)=>{
  //   setTasks(tasks.map(task=>task.id===id?{...task,completed:!task.completed}:task));
  // };
  return (
    <div>
      <Header />
      <TaskInput onAddTask={(text) => dispatch(addTask(text))} />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{marginBottom:"20px"}}
        >
          <option value='All'>All</option>
          <option value='Completed'>Completed</option>
          <option value='InComplete'>InComplete</option>
        </select>
      <TaskList 
        tasks={filteredTasks} 
        onDelete={(id) => dispatch(deleteTask(id))}
        onToggle={(id) => dispatch(toggleTask(id))} 
        onEdit={(id) => dispatch(editTask(id))} 
      />
    </div>
  );
};
export default App;