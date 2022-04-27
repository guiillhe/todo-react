import * as React from 'react'
import {useEffect, useState} from "react"
import { FaCheck, FaTrash, FaCheckDouble} from 'react-icons/fa'



const API = "http://localhost:5000";


function List() {
  const [loading, setLoading] = useState("");
  useEffect(()=>{

    const loadData = async() =>{
      setLoading(true)
      const res = await fetch(API +"/todos")
      .then((res)=> res.json())
      .then((data)=> data)
      .catch((err)=> console.log(err)); 
    setLoading(false)
    setTodos(res)
    };
    loadData();
  },[]);
  const handleDelete = async (id) => {
    await fetch(API + "/todos" +id,{
      method:"DELETE",    
  });
    setTodos((prevState) => prevState.filter((todo)=>todo.id !== id))
}
  
const [todos, setTodos] = useState([]);

if(loading){
  return <h2>Carregando tarefas...</h2>
} 


return(
<div className="list-todo">
  <h2>Lista de tarefas</h2>
  {todos.length === 0 && <p> Não há tarefas</p>}
  {todos.map((todo)=> (
    <div className="todo" key={todo.id}>
      <h3 className={todo.done ? "todo-done" : ""} >{todo.title}</h3>
      <h4>Duração: {todo.time>1? todo.time+" horas":todo.time+" hora"} </h4>
      <span>
        {!todo.done ? <FaCheck/>: <FaCheckDouble/>}
      </span>
      <FaTrash onClick={()=> handleDelete(todo.id)}/>
    </div>
  ))}
</div>)

}

export default List