import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Card, CardBody } from 'reactstrap';

const AmortizationCalculator = () => {
	return (
		<Container>
			<Row>
				<Col md="3"></Col>
				<Col>
					<AmortizationCard />
				</Col>
				<Col md="3"></Col>
			</Row>
		</Container>
	);
}

const AmortizationCard = () => {
	const [expenditure, setExpenditure] = useState(10000);
	const [duration, setDuration] = useState(12);
	const [monthlyContribution, setMonthlyContribution] = useState(0);

	useEffect(() => {
		const newAmortization = 0.5 + Number(expenditure) / Number(duration);
		setMonthlyContribution(newAmortization.toFixed());
	}, [duration, expenditure])

	return (
		<Card className="my-2"><CardBody className="text-center">
			<p>
				Je vais depensez
				$<input
					style={{ width: "75px" }}
					type="number" min="0" step="1"
					value={expenditure}
					onChange={(e) => setExpenditure(e.target.value)}
				/> dans&nbsp;
				<input style={{ width: "45px" }}
					type="number" min="0" step="1"
					value={duration}
					onChange={(e) => setDuration(e.target.value)}
				/> mois.
			</p>
			<p>
				⇒ Je dois mettre <u>${monthlyContribution}</u> par mois de côté.
			</p>
		</CardBody></Card>
	);
}

export default AmortizationCalculator;