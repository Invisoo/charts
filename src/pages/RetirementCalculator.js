import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Card, CardBody } from 'reactstrap';

import { ResponsiveLine } from '@nivo/line';

const RetirementCalculator = () => {
	return (
		<Container>
			<Row>
				<Col style={{ maxWidth: "800px", margin: "0 auto" }} >
					<RetCalcCard />
				</Col>
			</Row>
		</Container>
	);
}

const RetCalcCard = () => {
	const [calcState, setCalcState] = useState({
		currentAge: 35,
		retirementAge: 65,
		savings: 30000,
		statePension: 1500,
		wishedPension: 3000,
	});
	const [chartData, setChartData] = useState([]);

	const [neededSavings, setSavings] = useState(0);
	useEffect(() => {
		const savingTarget = computeNeededSavings(calcState);
		setSavings(savingTarget);
		const data = computeRetirementChart(calcState, savingTarget);
		setChartData(data);
	}, [calcState]);

	return (
		<>
			<Card className="my-2 px-4"><CardBody className="text-justify">
				<h2 className="mb-4">🚀 Votre point de Départ</h2>
				<p style={{ lineHeight: "2" }}>
					J'ai&nbsp;
					<input
						style={{ width: "50px", height: "35px" }}
						type="number" min="0" step="1"
						value={calcState.currentAge}
						onChange={e => {
							setCalcState(prevState => ({
								...prevState,
								currentAge: Number(e.target.value)
							}))
						}}
					/> ans
					et je vais prendre ma retraite à&nbsp;
					<input
						style={{ width: "50px", height: "35px" }}
						type="number" min="0" step="1"
						value={calcState.retirementAge}
						onChange={e => {
							setCalcState(prevState => ({
								...prevState,
								retirementAge: Number(e.target.value)
							}))
						}}
					/> ans.
				</p>
				<p>
					Jusqu'à maintenant, j'ai economisé
					$<input
						style={{ width: "80px", height: "35px" }}
						type="number" min="0" step="100"
						value={calcState.savings}
						onChange={e => {
							setCalcState(prevState => ({
								...prevState,
								savings: Number(e.target.value)
							}))
						}}
					/> pour ma retraite. (Note: exclus votre réserve de sécurité.)
				</p>
				<p>
					Je pense obtenir
					$<input
						style={{ width: "80px", height: "35px" }}
						type="number" min="0" step="50"
						value={calcState.statePension}
						onChange={e => {
							setCalcState(prevState => ({
								...prevState,
								statePension: Number(e.target.value)
							}))
						}}
					/> par mois de l'État.
				</p>
				<p>
					Au total, je voudrais avoir une pension de retraite de&nbsp;
					<span style={{whiteSpace: 'nowrap'}}>
					$<input
						style={{ width: "80px", height: "35px" }}
						type="number" min="0" step="50"
						value={calcState.wishedPension}
						onChange={e => {
							setCalcState(prevState => ({
								...prevState,
								wishedPension: Number(e.target.value)
							}))
						}}
					/></span> par mois.
				</p>
			</CardBody></Card>

			<h1 className="text-center">⬇️</h1>

			<Card className="my-2 px-2"><CardBody className="text-justify">
				<div className="px-3">
					<h2 className="mb-4">🏎️ Route de la Retraite</h2>
					<p>Vous devez économiser <strong className="text-danger"
						style={{fontSize: '1.3rem'}}>${neededSavings}</strong> par mois.</p>
				</div>
				<div style={{ height: 300 }}>
					<MyResponsiveLine chartData={chartData} />
				</div>
			</CardBody></Card>
		</>
	);
}

const computeNeededSavings = (calcState) => {
	// Constants
	const i_r = 0.035; // 4% rule, updated in the new environment.
	const i_s = 0.07; // 7% is discount rate in EM.

	// Basic variables
	const retirementFromInvestment = calcState.wishedPension - calcState.statePension;
	const savingDuration = calcState.retirementAge - calcState.currentAge;
	const fundAtRetirement = retirementFromInvestment * 12 / i_r;

	// Computing needed contribution per month
	const a_n = Math.pow(1 + i_s, savingDuration);
	const yearlyCont = (fundAtRetirement - a_n * calcState.savings) *
		i_s / (a_n - 1);
	const monthlyContribution = .5 + yearlyCont / 12;

	return monthlyContribution.toFixed();
}

const computeRetirementChart = (calcState, savingTarget) => {
	const i_s = 0.07; // 7% is discount rate in EM.
	const i_r = 0.03; // Invest safer at retirement.
	const duration = 100 - calcState.currentAge + 1;
	const savingsArray = new Array(duration);
	const retirementFromInvestment = calcState.wishedPension - calcState.statePension;

	let savings = calcState.savings;
	savingsArray[0] = { x: calcState.currentAge, y: savings};
	for (var i = 1; i < duration; i++) {
		if (i <= calcState.retirementAge - calcState.currentAge) {
		  savings = savings * (1 + i_s) + savingTarget * 12;
		} else {
			savings = savings - retirementFromInvestment * 12;
			savings = savings * (1 + i_r);
		}
		savingsArray[i] = { x: i + calcState.currentAge, y: savings}
	}

	return [{
		id: "Votre Épargne",
		data: savingsArray
	}]
}

const MyResponsiveLine = ({ chartData /* see data tab */ }) => {
	const areaMin = chartData.length > 0 ? chartData[0].data[0].y : 0;

	var tickValues = []
	if (chartData.length > 0) {
		for (let i = 0; i < chartData[0].data.length; i++) {
			const point = chartData[0].data[i];
			if (point.x % 5 === 0) {
				tickValues.push(point.x);
			}
		}
	}

	return (
	<ResponsiveLine
			data={chartData}
      areaBaselineValue={areaMin}
			margin={{ top: 50, right: 10, bottom: 50, left: 90 }}
			xScale={{ type: 'point' }}
			yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
			curve="catmullRom"
			isInteractive={false}
			axisTop={null}
			axisRight={null}
			axisBottom={{
					orient: 'bottom',
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'Âge',
					tickValues: tickValues,
					legendOffset: 36,
					legendPosition: 'middle'
			}}
			axisLeft={{
					orient: 'left',
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'Épargne',
					legendOffset: -80,
					legendPosition: 'middle',
					format: function(value) {
						return `$${value/1000}'000`;
					}
			}}
			enableGridX={false}
			enablePoints={false}
			pointSize={10}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-12}
			enableArea={true}
			useMesh={true}
			theme={{axis: {legend: {text: {fontSize: '16px'} } } }}
	/>
	);
}

export default RetirementCalculator;