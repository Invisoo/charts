import React from 'react';
import { Container, Col, Row, Card, CardBody } from 'reactstrap';

const RetirementCalculator = () => {
	return (
		<Container>
			<Row>
				<Col style={{maxWidth: "700px", margin: "0 auto"}}>
					<RetCalcCard />
				</Col>
			</Row>
		</Container>
	);
}

const RetCalcCard = () => {
	return (
		<Card className="my-2"><CardBody>
			<p style={{lineHeight: "2.8"}}>
				J'ai&nbsp;
				<input
				  style={{ width: "50px", height: "35px" }}
				  type="number" min="0" step="1"
				/> ans
				et je vais prendre ma retraite à&nbsp;
				<input
				  style={{ width: "50px", height: "35px" }}
				  type="number" min="0" step="1"
				/> ans.
				Jusqu'à maintenant, j'ai economisé
				$<input
				  style={{ width: "80px", height: "35px" }}
				  type="number" min="0" step="1"
				/>.
				Je pense obtenir
				$<input
				  style={{ width: "80px", height: "35px" }}
				  type="number" min="0" step="1"
				/> par mois de l'État.
				Au total, je voudrais avoir une pension de retraite de
				$<input
				  style={{ width: "80px", height: "35px" }}
				  type="number" min="0" step="1"
				/> par mois.
			</p>
		</CardBody></Card>
	);
}

export default RetirementCalculator;