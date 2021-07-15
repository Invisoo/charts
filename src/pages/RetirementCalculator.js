import React, { useState } from 'react';
import { Container, Col, Row, Card, CardBody } from 'reactstrap';

const RetirementCalculator = () => {
	return (
		<Container>
			<Row>
				<Col style={{ maxWidth: "700px", margin: "0 auto" }}>
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

	return (
		<Card className="my-2"><CardBody className="text-justify">
			<p style={{ lineHeight: "2.8" }}>
				J'ai&nbsp;
				<input
					style={{ width: "50px", height: "35px" }}
					type="number" min="0" step="1"
					value={calcState.currentAge}
					onChange={ e => {setCalcState( prevState => ({
						...prevState,
						currentAge: Number(e.target.value)
					}))}}
				/> ans
				et je vais prendre ma retraite à&nbsp;
				<input
					style={{ width: "50px", height: "35px" }}
					type="number" min="0" step="1"
					value={calcState.retirementAge}
					onChange={ e => {setCalcState( prevState => ({
						...prevState,
						retirementAge: Number(e.target.value)
					}))}}
				/> ans.
			</p>
			<p>
				Jusqu'à maintenant, j'ai economisé
				$<input
					style={{ width: "80px", height: "35px" }}
					type="number" min="0" step="100"
					value={calcState.savings}
					onChange={ e => {setCalcState( prevState => ({
						...prevState,
						savings: Number(e.target.value)
					}))}}
				/>.
				Je pense obtenir
				$<input
					style={{ width: "80px", height: "35px" }}
					type="number" min="0" step="50"
					value={calcState.statePension}
					onChange={ e => {setCalcState( prevState => ({
						...prevState,
						statePension: Number(e.target.value)
					}))}}
				/> par mois de l'État.
			</p>
			<p>
				Au total, je voudrais avoir une pension de retraite de
				$<input
					style={{ width: "80px", height: "35px" }}
					type="number" min="0" step="50"
					value={calcState.wishedPension}
					onChange={ e => {setCalcState( prevState => ({
						...prevState,
						wishedPension: Number(e.target.value)
					}))}}
				/> par mois.
			</p>
		</CardBody></Card>
	);
}

export default RetirementCalculator;