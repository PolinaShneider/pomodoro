import React from "react";
import styled from "styled-components";
import {Button} from "./Buttons";

const PlusButton = styled(Button)`
  font-family: 'Roboto Mono', monospace;
  font-size: larger;
`;

export default ({start, isRest, time, onDefTimeClick}) => {
    const result = pretty(Math.floor(time / 60).toString()) + ':' + pretty((time % 60).toString());

    function pretty(string) {
        return (new Array(3).join("0") + string).slice(-2);
    }

    return (
        <>
            <h1>{result}</h1>
            <div className="edit-time-div">
                {(!isRest && !start) && <div>
                    <PlusButton onClick={(e) => onDefTimeClick(true, e)}
                                disabled={start || time >= 59 * 60 || isRest}>+
                    </PlusButton>
                    <PlusButton onClick={(e) => onDefTimeClick(false, e)} disabled={start || time <= 60 || isRest}>-
                    </PlusButton>
                </div>}

            </div>
        </>
    )
}
