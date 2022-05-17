import React from "react";
import styled from "styled-components";

const StatsDiv = styled.div`
  border: 2px solid rgba(0, 0, 0, .1);
  border-radius: 10px;
  padding: 0;
  margin-bottom: 30px;
  width: 300px;
  margin: 0 auto;
  background: rgba(255,255,255,.7);

  h3 {
    margin-left: 20px;
  }
  div {
    border-bottom: 2px solid rgba(0, 0, 0, .1);
  }
  
`;

const Total = styled.h4`
  margin: 20px;
`;

export default ({tasks, tasksList}) => {
    const total = tasks.reduce((sum, task) => sum + task.total_duration, 0);
    return (
        <>
            <StatsDiv>
                <h3>Задачи:</h3>
                {tasksList}
            <Total>Общее время: {total / 60} минут</Total>
            </StatsDiv>
        </>

    )
}
