import React from 'react';

export const SoundNotification = {
  apply() {
    const source = `${process.env.PUBLIC_URL}/notification.mp3`;
    const audio = new Audio(source);
    return audio.play();
  }
};

const Halfway = ({ time, proposedTime, started }) => {
  const timeProgress = time / (parseInt(proposedTime) * 60);
  const isProgressHalfOrLess = timeProgress <= 0.5;
  const timesUpOrNull = proposedTime === '0' ? 'Time\'s up!' : null;
  const label = started && isProgressHalfOrLess ? 'More than halfway there!' : timesUpOrNull;
  const labelRendering = label !== null ? (<span>{label}</span>) : null;

  if (timesUpOrNull) {
    SoundNotification.apply();
  }

  return (
    <div className="halfway-container">
      {labelRendering}
    </div>
  );
};

export default Halfway;