import React from "react";
import styled from "styled-components";

const Select = styled.select`
  width: 100%;
`;

export default ({tasks, onCurrentTaskChange, currentTaskId}) => {
    const total = tasks.map((task) => <option key={task.id} value={task.id}>{task.taskName}</option>)
    return (
        <Select name="tasks" id="tasksDropdown" onChange={onCurrentTaskChange} value={currentTaskId}>
            {total}
        </Select>
    )
}
