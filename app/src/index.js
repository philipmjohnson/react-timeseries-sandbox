import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import BarChart1 from './BarChart1';
import BarChart2 from './BarChart2';
import BarChart3 from './BarChart3';

class ReactTimeSeriesSandbox extends React.Component {
  render() {
    return (
        <div>
          <BarChart1/>
          <BarChart2/>
          <BarChart3/>
        </div>
    );
  }
}

ReactDOM.render(<ReactTimeSeriesSandbox/>, document.getElementById('root')); // eslint-disable-line
