import React, {useEffect, useState} from 'react';
import './App.css';
import Technical from "./components/Technical";
import Buttons, {Button} from "./components/Buttons";
import Time from "./components/Time"
import Stats from "./components/Stats";
import TaskForm from "./components/TaskForm";
import uuid from "react-uuid";
import TasksDropSelect from "./components/TasksDropSelect";
import TimeSettings from "./components/TimeSettings";
import TasksList from "./components/TasksList";
import Menu from "./components/Menu";
import styled from "styled-components";

const Sets = styled(Button)`
  border: 1px;
  border-radius: 5px;
  background-color: gainsboro;
  cursor: pointer;
  color: #282c34;

  &:hover {
    color: black;
  }
`;
const ControlsDiv = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
    const DEFAULT_QUANTITY = 1;
    const [time, setTime] = useState(1);

    const [timeConstants, setTimeConstants] = useState({
        shortRestTime: 5 * 60,
        longRestTime: 15 * 60,
        workingSessionTime: 25 * 60
    });
    const [launchMessage, setLaunchMessage] = useState("Запустить Pomodoro");
    const [tasks, setTasks] = useState(() => {
        const all = JSON.parse(localStorage.getItem("items"));
        if (!all) {
            return [];
        } else return all;
    });
    const [currentTaskId, setCurrentTaskId] = useState("");
    const [start, setStart] = useState(false);
    const [isRest, setIsRest] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [estQuantity, setEstQuantity] = useState(DEFAULT_QUANTITY);
    const [timeSpeed, setTimeSpeed] = useState(1000);
    const [taskFormVisible, setTaskFormVisible] = useState(false);
    const [tabVisible, setTabVisible] = useState(false);
    const [statsVisible, setStatsVisible] = useState(false);


    const MESSAGE_TEXTS = [
        "Отменить Pomodoro",
        "Запустить Pomodoro",
        "Пропустить перерыв",
        "Начать короткий перерыв",
        "Начать длинный перерыв"
    ];

    const id = React.useRef(0);
    const clear = () => {
        window.clearInterval(id.current);
    };
    useEffect(() => {
        if (start && time > 0) {
            setLaunchMessage(isRest ? MESSAGE_TEXTS[2] : MESSAGE_TEXTS[0])
            id.current = window.setInterval(() => {
                setTime((time) => time - 1);
            }, 1000);
        }

        return () => clear();
    }, [start]);

    React.useEffect(() => {
        if (time === 0) {
            setStart(_ => false);
            setTime(_ => timeConstants.shortRestTime);
            setIsRest(e => !e);
            setLaunchMessage(MESSAGE_TEXTS[3]);
            addInterval(currentTaskId);
            clear();
        }
    }, [time]);

    React.useEffect(() => {
        document.title = isRest ? `Чилим!)` : `Воркаем! ${finalTime}`;
    }, [time, isRest]);

    React.useEffect(() => {
        if (!start) {
            if (isRest) {
                document.title = `Решаем... `;
            } else {
                document.title = `Готовимся... ${finalTime}`;
                setLaunchMessage(MESSAGE_TEXTS[1])
            }
        }
    }, [start]);

    useEffect(() => {
        if (!start) {
            setTime(_ => timeConstants.workingSessionTime)
        }
    }, [start, timeConstants]);

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(tasks));
    }, [tasks]);


    useEffect(() => {
        if (isRest) {
            setTime(_ => timeConstants.shortRestTime)
        } else if (!isRest) {
            setTime(_ => timeConstants.workingSessionTime)
        }

    }, [timeConstants, isRest])

    function addInterval(id) {
        if (!isRest) {
            setTasks(tasks.map(task => {
                if (task.id === id) {
                    return {
                        ...task,
                        total_duration: task.total_duration -= -timeConstants.workingSessionTime,
                        quantity: task.quantity += 1
                    }
                }
                return task
            }))

        }
    }

    const handleStartClick = () => setStart(e => !e);

    const handleRestClick = typeName => {
        setTime(_ => timeConstants[typeName])
        setStart(e => !e)
    };

    const handleLongRestClick = () => {
        setTime(_ => timeConstants.longRestTime)
        setStart(e => !e)
    };

    const handleSkipClick = () => {
        setStart(_ => false)
        setIsRest(_ => false)
    };


    const handleDefTimeClick = plus => {
        plus ? setTime(time - (-60)) : setTime(time - 60)
    };

    const handleTimeConstChange = (timeConstType, e) => {
        setTimeConstants({...timeConstants, [timeConstType]: e.target.value})
    };

    const handleTimeSpeedChangeChange = () => {
        (timeSpeed < 1000) ? setTimeSpeed(e => e * 10) : setTimeSpeed(10)
    };

    const handleTaskFormSubmit = e => {
        e.preventDefault();
        setTaskFormVisible(a => !a)
        const id = uuid().toString();
        setTasks([...tasks, {
            taskName,
            estimated: estQuantity,
            quantity: 0,
            id,
            total_duration: 0,
            isDone: false
        }]);
        setTaskName("");
        setEstQuantity(DEFAULT_QUANTITY);
        setCurrentTaskId(id)
    };

    const handleTaskDeleteClick = id => {
        setTasks(tasks.filter((task) => task.id !== id));
        if (currentTaskId === id) {
            setCurrentTaskId("")
        }
    };

    const handleTaskFormClose = () => {
        setTaskFormVisible(a => !a);
        if (currentTaskId === "") {
            setCurrentTaskId(tasks[0].id)
        }
    };

    const handleTabClose = () => setTabVisible(a => !a);

    const handleStatsClose = () => setStatsVisible(a => !a);

    const handleTaskDoneChange = id =>
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return {...task, isDone: !task.isDone}
            }
            return task
        }));


    const handleNewTaskAdd = () => setTaskFormVisible(a => !a);

    const handleNameChange = e => setTaskName(e.currentTarget.value);

    const handleQuantityChange = e => setEstQuantity(parseInt(e.currentTarget.value, 10));

    const handleCurrentTaskChange = e => setCurrentTaskId(e.currentTarget.value);

    const prettyTime = string => (new Array(3).join("0") + string).slice(-2);

    let finalTime = prettyTime(Math.floor(time / 60).toString()) + ':' + prettyTime((time % 60).toString());
    let currentTask = tasks.filter(task => task.id === currentTaskId)[0];


    return (
        <div className="App">
            <Time isRest={isRest} time={time} start={start} onDefTimeClick={handleDefTimeClick}/>
            <TaskForm
                onTaskSubmit={handleTaskFormSubmit}
                taskFormVisible={taskFormVisible}
                onNewTaskAdd={handleNewTaskAdd}
                onNameChange={handleNameChange}
                onQuantityChange={handleQuantityChange}
                quantity={estQuantity}
                taskName={taskName}
                onFormClose={handleTaskFormClose}
                taskDropdownList={<
                    TasksDropSelect
                    tasks={tasks}
                    onCurrentTaskChange={handleCurrentTaskChange}
                    currentTaskId={currentTaskId}/>}
                currentTaskName={currentTask?.taskName}
                currentTask={currentTask}
            />


            <Buttons
                onSkipClick={handleSkipClick}
                onLongRestClick={handleLongRestClick}
                onRestClick={handleRestClick}
                onStartClick={handleStartClick}
                isRest={isRest}
                start={start}
                signature={launchMessage}
            />
            <ControlsDiv>
                <Sets onClick={handleStatsClose}>Статистика</Sets>
                <Sets onClick={handleTabClose}>Настройки</Sets>
            </ControlsDiv>

            <Technical isRest={isRest} start={start} show={false} time={time} children={
                <>
                    <Stats
                        tasks={tasks}
                        tasksList={<TasksList
                            tasks={tasks}
                            onTaskDeleteClick={handleTaskDeleteClick}
                            onTaskDoneChange={handleTaskDoneChange}
                        />}/>

                    <button onClick={handleTimeSpeedChangeChange}>boost) {timeSpeed}</button>
                </>

            }/>

            {statsVisible &&
            <Stats tasks={tasks}
                   tasksList={<TasksList
                       tasks={tasks}
                       onTaskDeleteClick={handleTaskDeleteClick}
                       onTaskDoneChange={handleTaskDoneChange}
                   />}
            />}

            {tabVisible && <Menu
                title={"Настройки"}
                onCrossClick={handleTabClose}
                children={
                    <TimeSettings
                        timeConstants={timeConstants}
                        onTimeConstChange={handleTimeConstChange}
                    />}
            />}


        </div>
    );
}

export default App;
