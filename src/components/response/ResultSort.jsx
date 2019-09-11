import React, { Component } from 'react';
import Chart from './Chart';


class ResultSort extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { questions } = this.props;
    return (
      <div>
        <Chart data={questions} />
      </div>
    );
  }
}

export default ResultSort;