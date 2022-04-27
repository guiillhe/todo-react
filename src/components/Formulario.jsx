import * as React from "react";
import {useState} from 'react'

const API = "http://localhost:5000";
function Formulario() {

  const [title, setTitle]= useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const todo = {
      id: Math.random(),
      title,
      time,
      done: false

    };
    await fetch(API + "/todos",{
      method:"post",
      body:JSON.stringify(todo),
      headers:{
        "Content-Type": "application/json",
      },
      
    });

    setTodos((prevState)=> [...prevState, todo])
    
    setTitle("");
    setTime("");

  }
  return(
    <div className="form-todo">
      <h2> Insira a sua próxima Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">O que você vai fazer?</label>
          <input 
          type="text" 
          name="title" 
          placeholder="Título da tarefa" 
          onChange={(e)=> setTitle(e.target.value)}
          value={title || ""}
          required
        />
        </div>
        <div className="form-control">
          <label htmlFor="time">Duração:</label>
          <input 
          type="text" 
          name="time" 
          placeholder="Tempo estimado em horas" 
          onChange={(e)=> setTime(e.target.value)}
          value={time || ""}
          required
        />
        </div>
        <input type="submit" value="Criar tarefa" />
      </form>
      
    </div>
  )
  
}

export default Formulario