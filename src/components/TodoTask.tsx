import React from "react";
import { ITask } from "../Interfaces";

interface Props{
    task: ITask;
    completeTask( index: number): void;

}

const TodoTask = ({task, completeTask}: Props) => {
    return (
    <div className="task">
        <div className="content">
            <span>{task.taskName}</span>
            <span>{task.deadline} </span>
            <span> {task.date}</span>
        </div>
        <button onClick={() => {
            completeTask( task.index);
        }}
        >X</button>
    </div>
    );
};

export default TodoTask;