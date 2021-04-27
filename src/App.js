import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'reactstrap';

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
  const wFeeArr = new Array(duration + 1);
  const woFeeArr = new Array(duration + 1);
  for (var i = 0; i < duration + 1; i++) {
    const values = interests(i, translateInvestment(intVal), risk);
    wFeeArr[i] = {x: i, y: values.wFee};
    woFeeArr[i] = {x: i, y: values.woFee};
  }

  const ret = [
    {
      id: "Avec Frais",
      data: wFeeArr
    },
    {
      id: "Sans Frais",
      data: woFeeArr
    }
  ];
  console.log(ret);
  return ret;
}

const interests = (i, base, risk) => {
  const erp = 0.05;
  const fee = 0.016;
  const clientRisk = erp / (5 - risk); // Assume "no risk return" of 0.
  const withFeePower = 1 + clientRisk - fee;
  const withoutFeePower = 1 + clientRisk;

  return {
    wFee: base * Math.pow(withFeePower, i),
    woFee: base * Math.pow(withoutFeePower, i)
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
          <RangeSlider rangeval={duration} setRangeval={setDuration} min={2} max={35} />
        </Col>
        <Col>
          <h4>Montant Investi: {translateInvestment(invVal)}</h4>
          <RangeSlider rangeval={invVal} setRangeval={setInv} min={1} max={200} />
        </Col>
        <Col>
          <h4>Risque: {risk}</h4>
          <RangeSlider rangeval={risk} setRangeval={setRisk} min={1} max={4} />
        </Col>
      </Row>

      <Row><Col>
        <div style={{ height: 400 }}>
          <MyResponsiveLine data={chartData} />
        </div>
      </Col></Row>
    </Container></section>
  );
}

const getDataMin = (data) => {
  if (!Array.isArray(data) || data.length < 2) {
    return 0;
  }

  const wFeeData = data[0].data;
  const yAxis = Array.from(wFeeData, (v, _) => v.y);
  const minWFee = Math.min.apply(null, yAxis);
  return minWFee;
}

const MyResponsiveLine = ({ data }) => {
  const areaMin = getDataMin(data);

  return (
  <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 80 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
          orient: 'bottom',
          tickMin: 0,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Année',
          legendOffset: 36,
          legendPosition: 'middle'
      }}
      axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Valeur',
          legendOffset: -60,
          legendPosition: 'middle'
      }}
      colors={{ scheme: 'set3' }}
      enableGridX={false}
      lineWidth={5}
      enablePoints={false}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      enableArea={true}
      areaBaselineValue={areaMin}
      areaOpacity={0.2}
      enableSlices="x"
      legends={[
          {
              anchor: 'top',
              direction: 'row',
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
  );
}

export default App;
