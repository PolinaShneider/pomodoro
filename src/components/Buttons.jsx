import React from "react";
import styled from 'styled-components';

const MESSAGES = {
    'cancel': "Отменить Pomodoro",
    'launch': "Запустить Pomodoro",
    'skip': "Пропустить перерыв",
    'shortRest': "Начать короткий перерыв",
    'longRest': "Начать длинный перерыв",
};

export const Button = styled.button`
  color: black;
  background-color: snow;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 1px;
`;

const StartButton = styled(Button)`
  background-color: ${props => (props.signature === MESSAGES.launch) ? "rgba(108, 197, 81,0.9)" : "rgba(247, 75, 64,0.9)"};
`;

export default ({isRest, start, onStartClick, signature, onRestClick, onSkipClick}) =>
    (
        <div className="launch-buttons">
            {!isRest && <StartButton onClick={onStartClick} signature={signature}>{signature}</StartButton>}
            {!start && isRest && <Button onClick={e => onRestClick("shortRestTime", e)}>{MESSAGES.shortRest}</Button>}
            {!start && isRest && <Button onClick={e => onRestClick("longRestTime", e)}>{MESSAGES.longRest}</Button>}
            {isRest && <Button onClick={onSkipClick}>{MESSAGES.skip}</Button>}
        </div>
    );
