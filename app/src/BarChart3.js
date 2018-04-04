import React from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, BarChart, Resizable, styler, Legend }
  from 'react-timeseries-charts';
import { TimeSeries, sum } from 'pondjs';
import Moment from 'moment';
import WidgetPanel from './WidgetPanel';

class BarChart3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = { timerange: null };
  }

  render() { // eslint-disable-line class-methods-use-this
    const rainData = [
      [Moment('2017-01-24T00:00').valueOf(), 2.21],
      [Moment('2017-01-24T01:00').valueOf(), 2.13],
      [Moment('2017-01-24T02:00').valueOf(), 2.07],
      [Moment('2017-01-24T03:00').valueOf(), 2.04],
      [Moment('2017-01-24T04:00').valueOf(), 2.33],
      [Moment('2017-01-24T05:00').valueOf(), 2.23],
      [Moment('2017-01-24T07:00').valueOf(), 2.43],
    ];

    const windData = [
      [Moment('2017-01-24T00:00').valueOf(), 1.21],
      [Moment('2017-01-24T01:30').valueOf(), 1.13],
      [Moment('2017-01-24T02:00').valueOf(), 1.07],
      [Moment('2017-01-24T03:45').valueOf(), 1.04],
      [Moment('2017-01-24T04:00').valueOf(), 1.33],
      [Moment('2017-01-24T05:50').valueOf(), 1.23],
      [Moment('2017-01-24T06:00').valueOf(), 1.33],
      [Moment('2017-01-24T07:00').valueOf(), 0.43],
    ];

    const rainSeries = new TimeSeries({ name: 'rain', columns: ['time', 'rain'], points: rainData });
    const windSeries = new TimeSeries({ name: 'wind', columns: ['time', 'wind'], points: windData });
    const rainWindSeries = TimeSeries.timeSeriesListMerge({ name: 'rain-wind', seriesList: [rainSeries, windSeries] });
    const series = rainWindSeries.fixedWindowRollup({ windowSize: '1h', aggregation: { rain: { rain: sum() },
                                                                                       wind: { wind: sum() } } });
    const style = styler([{ key: 'rain', color: 'green', selected: 'brown' },
                          { key: 'wind', color: 'red', selected: 'green' }]);

    const legendCategories = [{ key: 'rain', label: 'rain' }, { key: 'wind', label: 'wind' }];

    return (
        <WidgetPanel title='Rain and Wind'>
          <Resizable>
            <ChartContainer
                enablePanZoom={true}
                timeRange={ this.state.timerange || series.range() }
                onTimeRangeChanged={timerange => this.setState({ timerange })}
            >
              <ChartRow height='150'>
                <YAxis
                    id='rainWind'
                    label='Rain and Wind'
                    min={0}
                    max={series.max('rain') + series.max('wind')}
                    format='.2f'
                    width='70'
                    type='linear'
                />
                <Charts>
                  <BarChart
                      axis='rainWind'
                      style={style}
                      spacing={1}
                      columns={['rain', 'wind']}
                      series={series}
                      minBarHeight={1}
                  />
                </Charts>
              </ChartRow>
            </ChartContainer>
          </Resizable>
          <Legend categories={legendCategories} style={style} type='dot' />
        </WidgetPanel>
    );
  }
}

export default BarChart3;
