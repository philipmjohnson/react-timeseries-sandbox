import React from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, BarChart, Resizable, styler } from 'react-timeseries-charts';
import { TimeSeries, sum } from 'pondjs';
import Moment from 'moment';
import WidgetPanel from './WidgetPanel';

class BarChart3 extends React.Component {
  render() { // eslint-disable-line class-methods-use-this
    const data = [
      [Moment('2017-01-24T00:00').valueOf(), 0.01],
      [Moment('2017-01-24T01:00').valueOf(), 0.13],
      [Moment('2017-01-24T02:00').valueOf(), 0.07],
      [Moment('2017-01-24T03:00').valueOf(), 0.04],
      [Moment('2017-01-24T04:00').valueOf(), 0.33],
      [Moment('2017-01-24T05:00').valueOf(), 0],
      [Moment('2017-01-24T06:00').valueOf(), 0],
      [Moment('2017-01-24T07:00').valueOf(), 0],
      [Moment('2017-01-24T08:00').valueOf(), 0.95],
      [Moment('2017-01-24T09:00').valueOf(), 1.12],
      [Moment('2017-01-24T10:00').valueOf(), 0.66],
      [Moment('2017-01-24T11:00').valueOf(), 0.06],
      [Moment('2017-01-24T12:00').valueOf(), 0.3],
      [Moment('2017-01-24T13:00').valueOf(), 0.05],
      [Moment('2017-01-24T14:00').valueOf(), 0.5],
      [Moment('2017-01-24T15:00').valueOf(), 0.24],
      [Moment('2017-01-24T16:00').valueOf(), 0.02],
      [Moment('2017-01-24T17:00').valueOf(), 0.98],
      [Moment('2017-01-24T18:00').valueOf(), 0.46],
      [Moment('2017-01-24T19:00').valueOf(), 0.8],
      [Moment('2017-01-24T20:00').valueOf(), 0.39],
      [Moment('2017-01-24T21:00').valueOf(), 0.4],
      [Moment('2017-01-24T22:00').valueOf(), 0.39],
      [Moment('2017-01-24T23:00').valueOf(), 0.28],
    ];

    const rawSeries = new TimeSeries({
      name: 'hilo rainfall points',
      columns: ['time', 'precip'],
      points: data,
    });

    const series = rawSeries.fixedWindowRollup({ windowSize: '1h', aggregation: { precip: { precip: sum() } } });
    const style = styler([{ key: 'precip', color: 'skyblue', selected: 'brown' }]);

    return (
        <WidgetPanel title='BarChart 3'>
          <Resizable>
            <ChartContainer timeRange={series.range()}>
              <ChartRow height='150'>
                <YAxis
                    id='rain'
                    label='Rainfall (inches/hr)'
                    min={0}
                    max={series.max('precip')}
                    format='.2f'
                    width='70'
                    type='linear'
                />
                <Charts>
                  <BarChart
                      axis='rain'
                      style={style}
                      spacing={1}
                      columns={['precip']}
                      series={series}
                      minBarHeight={1}
                  />
                </Charts>
              </ChartRow>
            </ChartContainer>
          </Resizable>
        </WidgetPanel>
    );
  }
}

export default BarChart3;
