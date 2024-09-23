import { useEffect, useState } from "react";
import "./App.css";
import { ToDoProvider } from "./Context/Context";
import TodoForm from "./Component/ToDoForm";
import TodoItem from "./Component/ToDoItem";

function App() {

  const [todos , settodos] = useState([])

  const addtodo = (todo) =>{
    settodos((prev) => [...prev , {id : Date.now() , ...todo }] );
  }

  const deletetodo = (id) =>{
    settodos((prev) => prev.filter((todo)=>  todo.id !== id));
  }

  const updatetodo = (id , todo) =>{
    settodos((prev) => prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo)));
  }

  const toggleCompleted = (id) => {
    settodos((prev) => prev.map((prevtodo) => prevtodo.id === id ? {...prevtodo , completed : !prevtodo.completed} : prevtodo));
  }


  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0){
        settodos(todos)
    }
  } , [])


  useEffect(()=>{
    localStorage.setItem("todos" , JSON.stringify(todos));
  },[todos])

  return (
    <>
      <ToDoProvider value={{ addtodo, deletetodo, updatetodo, toggleCompleted }}>
        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">
              Manage Your Todos
            </h1>
            <div className="mb-4">
                <TodoForm/>
            </div>
            <div className="flex flex-wrap gap-y-3">
              {
                todos.map((todo)=>(
                  <div key={todo.id} className="w-full">
                    <TodoItem todo={todo}/>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </ToDoProvider>
    </>
  );
}

export default App;
