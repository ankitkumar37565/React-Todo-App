import React, {useState, useEffect} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { List, ListItem, ListItemText, IconButton, Checkbox} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskItem from './TaskItem';
const TaskList = ({tasks,onDelete,onToggle,onEdit}) =>{
    // <div style={{'width':'60%',margin:'0 auto'}}>
    //     {tasks.map(task=>(
    //         <TaskItem
    //         key={task.id}
    //         task={task}
    //         onDelete={onDelete}
    //         onToggle={onToggle}
    //         />
    //     ))}
    // </div>
    // <List>
    //     {tasks.map((task)=>(
    //         <ListItem key={task.id} secondaryAction={
    //             <IconButton edge="end" aria-label="delete" onClick={()=> onDelete(task.id)}>
    //                 <DeleteIcon />
    //             </IconButton>
    //         }>
    //             <Checkbox
    //                 checked={task.completed}
    //                 onClick={()=>onToggle(task.id)}
    //             />
    //             <ListItemText primary={task.text} />
    //         </ListItem>
    //     ))}
    // </List>
    // <table style={{width:"100%",borderCollapse:"collapse",marginTop:"20px"}}>
    //     <thead>
    //         <tr style={{backgroundColor:"#f4f4f4" }}>
    //             <th style={{border:"1px solid #ddd",padding:"8px" }}>ID</th>
    //             <th style={{border:"1px solid #ddd",padding:"8px" }}>Text</th>
    //             <th style={{border:"1px solid #ddd",padding:"8px" }}>Completed</th>
    //             <th style={{border:"1px solid #ddd",padding:"8px" }}>Actions</th>
    //         </tr>
    //     </thead>
    //     <tbody>
    //         {tasks.map((task)=>(
    //             <tr key={task.id}>
    //                 <td style={{border:"1px solid #ddd", padding: "8px" }}>{task.id}</td>
    //                 <td style={{border:"1px solid #ddd", padding: "8px" }}>{task.text}</td>
    //                 <td style={{border:"1px solid #ddd", padding: "8px" }}>{task.completed ? "Yes" : "No" }</td>
    //                 <td style={{border:"1px solid #ddd", padding: "8px" }}>
    //                     <button onClick={() => onToggle(task.id)} style={{marginRight:"8px"}}>
    //                         {task.completed ? "Undo" : "Complete"}
    //                     </button>
    //                     <button onClick={() => onDelete(task.id)} style={{color: "red" }}>
    //                         Delete
    //                     </button>
    //                 </td>
    //             </tr>
    //         ))}
    //     </tbody>
    // </table>
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState(null);
    const [search,setSearch] = useState("")
    const [selectedTasks,setselectedTasks] = useState(tasks)
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending "desc" for descending
    const [pageSize,setPageSize] = useState(5);    
    useEffect(() => {
        setCurrentPage(1); // Reset to the first page when page size changes
    }, [pageSize]);

    const totalPages = Math.ceil(tasks.length / pageSize );
    const startIndex = (currentPage - 1) * pageSize;
    const currentTasks = tasks.slice(startIndex, startIndex + pageSize);
    const sortedTasks = [...currentTasks].sort((a,b)=>{
        console.log("Sorting by text:", a.text, b.text);
        console.log(sortBy);
        if (!sortBy) return 0; // No sorting
        const order = sortOrder === "asc" ? 1 : -1; // Ascending or descending
        if (sortBy === "id") return (a.id - b.id) * order;
        if (sortBy === "text") return String(a.text || "").localeCompare(String(b.text || "")) * order;
        if (sortBy === "completed") return (a.completed === b.completed ? 0 : a.completed ? 1 : -1) * order;
        return 0;
    })
    const searchTasks = (search) => {
        let searchedTasks = sortedTasks.filter((task)=>
        (task.id.toString().includes(search ? search : "") || (task.completed ? '1' : '0').includes(search ? search : "") || task.text.includes(search ? search : "")) ? true : false )
        setselectedTasks(searchedTasks);
    }
    const handleSort = (attribute) => {
        if (sortBy === attribute) {
            // If the same attribute is clicked toggle the order
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // If a new attribute is clicked, sort ascending by default
            setSortBy(attribute);
            setSortOrder("asc");
        }
        setselectedTasks(sortedTasks);
    };

    const handleSearch = (search) => {
        setSearch(search);
        searchTasks(search);
    }

    const handleNextPage = () => {
        if(currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage+1 );
        }
    };

    const handlePrevPage = () => {
        if( currentPage > 1 ) {
            setCurrentPage((prevPage) => prevPage-1);
        }
    };
    const [editingTaskId,setEditingTaskId]= useState(null);
    const [editedText,setEditedText]= useState("");
    const handleEditClick = (task) => {
        setEditingTaskId(task.id);
        setEditedText(task.text);
    }
    const handleSaveClick = (id) => {
        onEdit({id,editedText});
        setEditingTaskId(null);
        setEditedText("");
    }
    return (
    <>
    <h1>Task List</h1>
    <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
    />
    <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
    </select>
    <TableContainer component={Paper} style={{ marginTop:"20px" }}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <button onClick={() => handleSort("id")}>
                            ID {sortBy === "id" && (sortOrder === "asc" ? String.fromCharCode(0x2191) : String.fromCharCode(0x2193))}
                        </button>
                    </TableCell>
                    <TableCell>
                        <button onClick={() => handleSort("text")}>
                            Text {sortBy === "text" && (sortOrder === "asc" ? String.fromCharCode(0x2191) : String.fromCharCode(0x2193))}
                        </button>
                    </TableCell>
                    <TableCell>
                        <button onClick={() => handleSort("completed")}>
                            Completed {sortBy === "completed" && (sortOrder === "asc" ? String.fromCharCode(0x2191) : String.fromCharCode(0x2193))}
                        </button>
                    </TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {selectedTasks.map((task) =>(
                    <TableRow key={task.id}>
                        <TableCell>{task.id}</TableCell>
                        <TableCell>{
                            editingTaskId === task.id ? (
                                <input
                                    type="text"
                                    value={editedText}
                                    onChange={(e) => setEditedText(e.target.value)}
                                    />
                            ) : (
                                task.text
                            )}
                            </TableCell>
                        <TableCell>{task.completed ? "Yes" : "No"}</TableCell>
                        <TableCell>
                            {editingTaskId === task.id ? (
                                <button onClick={()=> handleSaveClick(task.id)}  style={{marginRight: "8px"}}>Save</button>
                            ) : (
                                <button onClick={()=> handleEditClick(task)}  style={{marginRight: "8px"}}>Edit</button>
                            )}                            
                            <Button
                                variant="outlined"
                                color={task.completed ? "secondary": "primary"}
                                onClick={() => onToggle(task.id)}
                                style={{marginRight: "8px"}}
                            >
                                {task.completed ? "Undo" : "Complete"}
                            </Button>                            
                            <Button variant="outlined" color="error" onClick={() => onDelete(task.id)}  style={{marginRight: "8px"}}>
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    <div style={{ marginTop:"10px" }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
        </button>
        <span style={{margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
        </button>
    </div>
    </>
);
};
export default TaskList;