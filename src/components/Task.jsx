import React from "react";
import styled from "styled-components";

const TaskDiv = styled.div`
  padding: 20px;

  h4 {
    margin-top: 0;
  }

  &:hover {
    backdrop-filter: saturate(80%);
    background-color: rgba(92, 92, 92, 0.05); 
  }
`;
const TaskName = styled.span`
  text-decoration: ${props => (props.isDone) ? 'line-through' : 'none'};
`;

export default({tasks, id, checkBox, children}) => {
    const task = tasks.find(obj => obj.id === id);
    return (
        <TaskDiv>
            <h4>{checkBox} <TaskName isDone={task.isDone}>{task.taskName}</TaskName></h4>
            <ul>
                <li>кол-во: {task.quantity} из {task.estimated}</li>
                <li>время: {task.total_duration / 60} мин.</li>
            </ul>
            {children}
        </TaskDiv>
    )
}
