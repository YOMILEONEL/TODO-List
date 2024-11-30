import React, { FC, useState, ChangeEvent } from "react";
import "./App.css";
import { ITask } from "./Interfaces";
import TodoTask from "./components/TodoTask";

const App: FC= ( ) => {
  const [task, setTask]= useState<string>("");
  const [deadline, setDeadline]= useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]); 


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



  const addTask = (): void => {
    const newTask: ITask = { taskName: task, deadline: deadline, date:date }; 
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
    setDate(new Date().toISOString().split("T")[0]);  };

  const completeTask = (taskNameToDelete: string, dateToDelete: string): void =>{
    setTodoList(
      todoList.filter((task) => {
        return !(task.taskName === taskNameToDelete ); // i need to update to : !(task.taskName === taskNameToDelete && task.date === dateToDelete); 
      })
    );
  };

  return (
    <div className="App">
      <div className="beginn">
            <h1 className="question">What task would you like to add?</h1>
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
        {todoList.map((task: ITask, key: number)=> {
          return <TodoTask key = {key} task= {task} completeTask={completeTask} />
        })}
      </div>
    </div>
  )
}

export default App
