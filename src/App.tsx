import React, { FC, useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import { ITask } from "./Interfaces";
import TodoTask from "./components/TodoTask";






const App: FC= ( ) => {
  const [task, setTask]= useState<string>("");
  const [deadline, setDeadline]= useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]); 
  const [searchInput, setSearchInput]= useState<string>("");
  const [todoListFilter, setTodoListFilter] = useState<ITask[]>([]);

  useEffect(() => {
    const todoTmp= todoList.filter((task: ITask) => (
      task.taskName.startsWith(searchInput)    
    ))
    setTodoListFilter(todoTmp);
  },
  [searchInput, todoList]
  )




  const handleChange = (event: ChangeEvent<HTMLInputElement>) : void => {
    if(event.target.name=== "task"){
      setTask(event.target.value);
    }
    else if(event.target.name==="deadline"){
      setDeadline(Number(event.target.value));
    }
    else if(event.target.name=== "date"){
      setDate(event.target.value);
    }
  };

  const inputChange = (event: ChangeEvent<HTMLInputElement>) : void => {
    setSearchInput(event.target.value);
  }



  const addTask = (): void => {
    let n= todoList.length;
    console.log(n);
    
    const newTask: ITask = { taskName: task, deadline: deadline, date:date, index: n  }; 
    setTodoList([...todoList, newTask]);
    setTodoListFilter([...todoList, newTask]);
    setTask("");
    setDeadline(0);
    setDate(new Date().toISOString().split("T")[0]);  };


  


  const completeTask = ( index: number): void =>{
    let a : ITask[]= [];
    for(let i=0; i<todoList.length; i++){
      const todoTmp = todoList[i];
      if(i>index){
        todoTmp.index-=1;
        a = [...a, {...todoTmp }]
        
      }else if(i<index){
        a = [...a, {...todoTmp }]
      }
      
    }
    console.log(a);
    
    setTodoList(a);
  };

  return (
    <div className="App">
      <div className="beginn">
            <h1 className="question">What task would you like to add?</h1>
            <div>
              <input type="search" placeholder="search..." name= "inputsearch" value= {searchInput} onChange={inputChange}   />
            </div>
      </div>
      <div className="header">
        <div className="InputContainer">
          <input type="text" placeholder="Task..." name="task" value= {task} onChange={handleChange} />
          <input type="number" placeholder="DeadLine (in Day)..." name = "deadline" value= {deadline} onChange={handleChange}/>
          <input type="text"  name="date" value= {date} onChange={handleChange} />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoListFilter.map((task: ITask, key: number)=> {
          return <TodoTask key = {key} task= {task} completeTask={(key) => completeTask(key)} />
        })}
      </div>
    </div>
  )
}

export default App
