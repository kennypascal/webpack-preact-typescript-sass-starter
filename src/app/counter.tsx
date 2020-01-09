import { Component, h } from 'preact';

interface CounterProps {
  initialCount: number
}

interface CounterState {
  count: number
}

export default class Counter extends Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);

    this.state = {
      count: props.initialCount,
    };
  };

  render() {
    const increment = () => this.setState(({ count }) => ({
      count: count + 1,
    }));

    return (
      <div>
        Current value: {this.state.count}
        <button onClick={increment}>Increment</button>
      </div>
    );
  }
}