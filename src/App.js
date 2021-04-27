import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'reactstrap';

import {ResponsiveStream} from '@nivo/stream';

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
    arr[i] = interests(i, intVal);
  }
  return arr;
}

const interests = (i, base) => {
  if (i === 0) {
    return {
      "Avec Frais": base,
      "Sans Frais": 0.001
    }
  }
  return {
    "Avec Frais": base * Math.pow(1.04, i),
    "Sans Frais": base * (Math.pow(1.013, i) - 1)
  };
}

const App = () => {
  const [duration, setDuration] = useState(10);
  const [invVal, setInv] = useState(1000);
  const [risk, setRisk] = useState(3);

  const [chartData, setChartData] = useState([]);
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
          <h4>Montant Investi: {invVal}</h4>
          <RangeSlider rangeval={invVal} setRangeval={setInv} min={1000} max={100000} />
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
      colors={{ scheme: 'purples' }}
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

export default App;
