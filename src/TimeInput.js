import React from 'react';

const timeFormatRegex = /^\d+$/;

const TimeInput = ({ onCountdownChange, started, proposedTime, onStartClick }) => {
  const canStart = timeFormatRegex.test(proposedTime) && (parseInt(proposedTime * 60) > 0);
  const isButtonDisabled = !canStart || started;
  const countdownValue = started || proposedTime === '0' ? '' : proposedTime;

  return (
    <div className="time-input-container">
      <span className="countdown-label">Countdown:</span>
      <input
        className="countdown-input"
        type="text"
        placeholder="(Min)"
        onChange={onCountdownChange}
        disabled={started}
        value={countdownValue}
      />
      <button
        className="countdown-button"
        onClick={onStartClick}
        disabled={isButtonDisabled}>
        START
      </button>
    </div>);
};

export default TimeInput;
