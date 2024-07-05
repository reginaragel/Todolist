import React,{useState,useEffect} from "react";
import './TodoList.css';
import {v4 as uuidv4} from 'uuid';

const TodoList=()=>{
    const initialState=JSON.parse(localStorage.getItem("todos")) || [];
    const [input,setInput]=useState('')
    const [todos,setTodos]=useState(initialState)
    const [edittodo,setEditTodo]=useState(null)

    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todos));
    },[todos])

    const updateTodo=(title,id,completed)=>{
        const newTodo=todos.map((todo)=>
            todo.id===id?{title,id,completed}:todo
        );
        setTodos(newTodo);
        setEditTodo('')
    }
    useEffect(()=>{
        if(edittodo){
            setInput(edittodo.title);
        }else{
            setInput('');
        }
    },[setInput,edittodo])

    const  onFormSubmit=(e)=>{
        e.preventDefault();
        if(!edittodo){
            setTodos([...todos,{id:uuidv4(),title:input,completed:false}])
            setInput("");
        }else{
            updateTodo(input,edittodo.id,edittodo.completed)
        }
        
    }
    const handleDelete=({id})=>{
        setTodos(todos.filter((todo)=>todo.id !==id));
    }
    const handleComplete=(todo)=>{
        setTodos(
            todos.map((item)=>{
                if(item.id=== todo.id){
                    return {...item,completed:!item.completed}
                }
                return item;
            })
        )
    }
    const handleEdit=({id})=>{
        const findTodo=todos.find((todo)=>todo.id===id);
        setEditTodo(findTodo)
    }
    return(
        <div className="container">
            <div className="app-wrapper">
                <h1>Todos List</h1>
                <form onSubmit={onFormSubmit}>
                    <input type="text" placeholder="Enter a Todo..." className="task-input" value={input}
                    onChange={(e)=>setInput(e.target.value)}/>
                    <button className="button-add" type="submit">{edittodo?'OK':'Add'}</button>
                    
                    </form>
                    <div>
                        <ul>
                        { todos.map((todo)=>(
                            <li className="todo-item" key={todo.id}>
                             <input type="text" value={todo.title} className={`list ${todo.completed?"complete":" "}`} onChange={(e)=>e.preventDefault()}/>
                             <button className="button-complete task-button"  onClick={()=>handleComplete(todo)}>
                                <i className="fa fa-check circle"></i>
                             </button>
                             <button className="button-edit task-button" onClick={()=>handleEdit(todo)}>
                                <i className="fa fa-edit circle"></i>
                             </button>
                             <button className="button-delete task-button" onClick={()=>handleDelete(todo)}>
                                <i className="fa fa-trash circle"></i>
                             </button>
                            </li>
                        ))
                        }
                        </ul>
                        </div>
                
            </div>
        
        </div>
    )
}

export default TodoList