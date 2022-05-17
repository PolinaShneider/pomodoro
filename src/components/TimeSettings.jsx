import React from "react";

const TIMES = {
    workingTimeValues: [
        1, 15, 20, 25, 30, 45, 50, 55, 60
    ].map(i => i * 60),
    shortRestTimeValues: [
        1, 3, 4, 5, 7
    ].map(i => i * 60),
    longRestTimeValues: [
        1, 5, 10, 15, 20, 25, 30
    ].map(i => i * 60),
};

export default ({timeConstants, onTimeConstChange}) => {
    const makeOptions = (array) => {
        return array.map((value, index) => <option key={index} value={value}>{value / 60}</option>)
    };

    const makeSelection = (options, timeConstName) => {
        return (
            <select name={timeConstName} id={timeConstName} onChange={e => onTimeConstChange(timeConstName, e)}
                    value={timeConstants[timeConstName]}>
                {options}
            </select>)
    };

    const workingTimeSelect = makeSelection(makeOptions(TIMES.workingTimeValues), "workingSessionTime");
    const shortRestTimeSelect = makeSelection(makeOptions(TIMES.shortRestTimeValues), "shortRestTime");
    const longRestTimeSelect = makeSelection(makeOptions(TIMES.longRestTimeValues), "longRestTime");

    return (
        <>
            <h4>Настройки времени</h4>
            <div>
                <section>
                    <label htmlFor="workingSessionTime">Рабочее время</label>
                    {workingTimeSelect}
                </section>
                <section>
                    <label htmlFor="shortRestTime">Короткий перерыв</label>
                    {shortRestTimeSelect}
                </section>
                <section>
                    <label htmlFor="longRestTime">Длиннный перерыв</label>
                    {longRestTimeSelect}
                </section>
            </div>
        </>
    )
}
