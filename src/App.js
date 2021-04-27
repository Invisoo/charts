import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'reactstrap';

import {ResponsiveStream} from '@nivo/stream';
import {ResponsiveLine} from '@nivo/line';

import './App.css';

const RangeSlider = ({ rangeval, setRangeval, max, min }) => {
  return (
    <div>
      <input type="range" min={min} max={max} defaultValue={rangeval}
        onChange={(event) => {
          return setRangeval(parseInt(event.target.value));
        }} />
    </div>
  );
};

const buildInterest = (duration, intVal, risk) => {
  const arr = new Array(duration + 1);
  for (var i = 0; i < duration + 1; i++) {
    arr[i] = interests(i, translateInvestment(intVal), risk);
  }
  return arr;
}

const interests = (i, base, risk) => {
  const erp = 0.05;
  const fee = 0.016;
  const clientRisk = erp / (5 - risk); // Assume "no risk return" of 0.
  const withFeePower = 1 + clientRisk - fee;
  const withoutFeePower = 1 + fee;

  if (i === 0) {
    return {
      "Avec Frais": base,
      "Sans Frais": 0.1
    }
  }

  return {
    "Avec Frais": base * Math.pow(withFeePower, i),
    "Sans Frais": base * (Math.pow(withoutFeePower, i) - 1)
  };
}

const translateInvestment = (x) => x * 500

const App = () => {
  const [duration, setDuration] = useState(20);
  const [invVal, setInv] = useState(1);
  const [risk, setRisk] = useState(3);

  const [chartData, setChartData] = useState(null);
  useEffect(() => setChartData(buildInterest(duration, invVal, risk)), [duration, invVal, risk])

  return (
    <section><Container className="text-center">
      <Row><Col>
        <h1>Hello sir!</h1>
      </Col></Row>

      <Row>
        <Col>
          <h4>Horizon d'Investissement: {duration}</h4>
          <RangeSlider rangeval={duration} setRangeval={setDuration} min={2} max={50} />
        </Col>
        <Col>
          <h4>Montant Investi: {translateInvestment(invVal)}</h4>
          <RangeSlider rangeval={invVal} setRangeval={setInv} min={1} max={200} />
        </Col>
        <Col>
          <h4>Risk: {risk}</h4>
          <RangeSlider rangeval={risk} setRangeval={setRisk} min={1} max={4} />
        </Col>
      </Row>

      <Row><Col>
        <div style={{ height: 400 }}>
          <MyResponsiveStream data={chartData} />
        </div>
      </Col></Row>
    </Container></section>
  );
}

const MyResponsiveStream = ({ data }) => (
  <ResponsiveStream
      data={data}
      keys={[ 'Avec Frais', 'Sans Frais' ]}
      enableGridX={false}
      enableGridY={true}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: 36
      }}
      axisLeft={{ orient: 'left', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: -40 }}
      offsetType="diverging"
      colors={{ scheme: 'set3' }}
      fillOpacity={0.85}
      borderColor={{ theme: 'background' }}
      legends={[
          {
              anchor: 'top',
              direction: 'row',
              translateY: -30,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: '#999999',
              symbolSize: 12,
              symbolShape: 'square',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemTextColor: '#000000'
                      }
                  }
              ]
          }
      ]}
  />
)

const MyResponsiveLine = ({ data }) => (
  <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle'
      }}
      axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle'
      }}
      enableGridX={false}
      lineWidth={6}
      enablePoints={false}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      enableArea={true}
      areaOpacity={0.1}
      enableSlices="x"
      legends={[
          {
              anchor: 'top',
              direction: 'column',
              justify: false,
              translateX: 0,
              translateY: -48,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 107,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 14,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
  />
)

export default App;
