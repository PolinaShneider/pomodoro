import React from "react";

export default ({tasks, onCurrentTaskChange, currentTaskId}) => {
    const total = tasks.map((task) => <option key={task.id} value={task.id}>{task.taskName}</option>)
    return (
        <select name="tasks" id="tasksDropdown" onChange={onCurrentTaskChange} value={currentTaskId}>
            {total}
        </select>
    )
}
