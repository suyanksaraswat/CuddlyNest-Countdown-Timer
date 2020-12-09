import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons';
import Halfway from './Halfway';
import React, { PureComponent } from 'react';
import TimeDisplay from './TimeDisplay';
import TimeInput from './TimeInput';
import TimeSpeed from './TimeSpeed';
import './App.css';

library.add(faPlayCircle, faPauseCircle);
dom.watch();

const initialState = {
  time: 0,
  run: false,
  basePace: 1000,
  actualPace: 1000,
  proposedTime: '',
  started: false,
  speed: 1,
};

class App extends PureComponent {
  constructor() {
    super();
    this.state = initialState;
    this.onCountdownClick = this.onCountdownClick.bind(this);
    this.onSpeedChange = this.onSpeedChange.bind(this);
    this.onCountdownChange = this.onCountdownChange.bind(this);
    this.onStartClick = this.onStartClick.bind(this);
    this.timeout = null;
  }

  onCountdownClick(clickable) {
    return () => {
      if (clickable) {
        const { run } = this.state;
        clearTimeout(this.timeout);
        this.setState(state => ({ ...state, run: !run }));
      }
    };
  }

  onSpeedChange(speed) {
    return () => {
      const { basePace } = this.state;
      const actualPace = Math.floor(basePace / speed);
      this.setState(state => ({ ...state, actualPace, speed }));
    };
  }

  onCountdownChange(evt) {
    const { started } = this.state;

    if (!started) {
      const proposedTime = evt.currentTarget.value;
      this.setState(state => ({ ...state, proposedTime }));
    }
  }

  onStartClick() {
    const { proposedTime } = this.state;

    if (!isNaN(proposedTime)) {
      const time = parseInt(proposedTime) * 60;
      this.setState(state => ({
        ...state,
        time,
        run: true,
        started: true,
      }));
    }
  }

  componentDidUpdate() {
    const { time, actualPace, run } = this.state;
    const countdownZero = time === 0;

    if (run && !countdownZero) {
      this.timeout = setTimeout(
        () => this.setState(state => ({ ...state, time: time - 1 })),
        actualPace
      );
    } else if (!countdownZero) {
      this.setState(state => ({ ...state, run: false }));
    } else if (run) {
      this.setState({ ...initialState, proposedTime:'0' });
    }
  }

  render() {
    const { time, run, started, proposedTime, speed } = this.state;
    const onCountdownClick = this.onCountdownClick(started);

    return (
      <div className="App">
        <TimeInput
          onCountdownChange={this.onCountdownChange}
          started={started}
          proposedTime={proposedTime}
          onStartClick={this.onStartClick} />
        <Halfway
          time={time}
          proposedTime={proposedTime}
          started={started} />
        <TimeDisplay
          run={run}
          started={started}
          time={time}
          onCountdownClick={onCountdownClick} />
        <TimeSpeed
          started={started}
          speed={speed}
          onSpeedChange={this.onSpeedChange}
          run={run} />
      </div>
    );
  }
}

export default App;
