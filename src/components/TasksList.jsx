import React from "react";
import Task from "./Task";
import styled from "styled-components";

const DeleteBtn = styled.button`
    color: black;
    background: #D6DF23;
    padding: 0.25em 1em;
    margin-top: 8px;
    border: 2px solid black;
    border-radius: 1px;
`;

export default ({tasks, onTaskDoneChange, onTaskDeleteClick}) => {
    const detailedTaskList = tasks.map((task) => {
            const checkbox = <input
                type="checkbox"
                onChange={(e) => onTaskDoneChange(task.id, e)}
                checked={task.isDone}
            />;
            const deleteButton = <DeleteBtn
                className="btn-delete"
                onClick={(e) => onTaskDeleteClick(task.id, e)}
            >
                Удалить
            </DeleteBtn>;

            return (
                <li key={task.id}>
                    <Task id={task.id} key={task.id} tasks={tasks} checkBox={checkbox} children={deleteButton}/>
                </li>
            )
        }
    );
    return (
        <ul className={"tasks-list"}>
            {detailedTaskList}
        </ul>
    )

}
