import { createContext , useContext } from "react";

export const ToDoContext = createContext({
    todos : [
        {
            id : 1,
            todo : "todo msg",
            completed : false
        }
    ],

    addtodo : (todo) => {},
    deletetodo : (id) => {},
    updatetodo : (id , todo) => {},
    toggleCompleted : (id) => {},
});


export const ToDoProvider = ToDoContext.Provider


export const useToDo = () =>{
    return useContext(ToDoContext)
}