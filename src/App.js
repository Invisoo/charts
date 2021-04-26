import React, {useState} from 'react';
import {Container, Row, Col} from 'reactstrap';

import {ResponsiveStream} from '@nivo/stream';

import './App.css';

const AppCont = ({ children }) => {
  return (
      <Container className="my-3">
        <Row className="text-center"><Col>
          {children}
        </Col></Row>
      </Container>
  )
}

const RangeSlider = ({ rangeval, setRangeval }) => {
  return (
    <div>
      <input type="range" min="0" max="100" className="slider" defaultValue={rangeval}
        onChange={(event) => {
          return setRangeval(event.target.value);
        }} />
      <h4>The range value is {rangeval}</h4>
    </div>
  );
};

const App = () => {
  const [rangeval, setRangeval] = useState(10);
  const randomData = Array.from({ length: 8 }, (_, i) => {
    return {
    "Raoul": i+1,
    "Jacques": 2 * (1+i)
    };
  })

  return (
    <>
      <AppCont >
        <h1>Hello sira</h1>
        <h2>Slider value: {rangeval}</h2>
        <RangeSlider rangeval={rangeval} setRangeval={setRangeval} />
      </AppCont>
      <AppCont >
        <div style={{ height: 400 }}>
          <MyResponsiveStream data={randomData} />
        </div>
      </AppCont>
    </>
  );
}

const MyResponsiveStream = ({ data }) => (
  <ResponsiveStream
      data={data}
      keys={[ 'Raoul', 'Jacques' ]}
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
      colors={{ scheme: 'blues' }}
      fillOpacity={0.85}
      borderColor={{ theme: 'background' }}
      legends={[
          {
              anchor: 'bottom-right',
              direction: 'column',
              translateX: 100,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: '#999999',
              symbolSize: 12,
              symbolShape: 'circle',
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
