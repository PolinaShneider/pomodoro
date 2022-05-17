import React from "react";
import {Button} from "./Buttons";
import styled from "styled-components";

const Div = styled.div`
  box-sizing: border-box;
  border: #282c34 solid 3px;
  width: min-content;
  margin: 50px auto;
  background: rgba(255,255,255,.35);
  padding: 15px;
`;

const AddButton = styled.input`
    color: black;
    background: #F63422;
    padding: 0.25em 1em;
    margin-top: 8px;
    border: 2px solid black;
    border-radius: 1px;
`;

const Heading = styled.h4`
    margin: 10px 0 5px;
`;

const AcceptButton = styled.button`
    color: black;
    background: white;
    padding: 0.25em 1em;
    margin-top: 8px;
    border: 2px solid black;
    border-radius: 1px;
`;
export default ({
                    taskFormVisible, onNewTaskAdd, currentTaskName, currentTask,
                    onTaskSubmit, onNameChange, onQuantityChange, taskName, quantity,
                    taskDropdownList, onFormClose
                }) =>
    (
        <>
            {!taskFormVisible &&
            <Button onClick={onNewTaskAdd}>{(currentTaskName) ? currentTaskName : "Выбрать дело"}
                <br/> {(currentTask) ? "Сделано: " + currentTask.quantity : null}</Button>}
            {taskFormVisible && (
                <Div>
                    <form action="" onSubmit={onTaskSubmit}>
                        <Heading><label htmlFor={'taskAdd'}>Добавить дело:</label></Heading>

                        <input type="text" name={'taskAdd'} onChange={onNameChange} value={taskName}
                               placeholder={"Что делать?"}/>
                        <input type="number" onChange={onQuantityChange} value={quantity}
                               placeholder={"Сколько делать?"}/>
                        <div>
                            <AddButton type="submit" value={"добавить"}/>
                        </div>

                        <Heading><label htmlFor={'taskChoose'}>Выбрать дело:</label></Heading>
                        {taskDropdownList}
                        <AcceptButton onClick={onFormClose}>ОК</AcceptButton>
                    </form>
                </Div>

            )}
        </>
    )
