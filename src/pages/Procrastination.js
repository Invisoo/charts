import React from 'react';
import { Container, Col, Row, Card, CardBody } from 'reactstrap';

const Procrastination = () => {
	return (
		<Container>
			<Row>
				<Col style={{maxWidth: "500px", margin: "0 auto"}}>
					<ProcrastinationCard />
				</Col>
			</Row>
		</Container>
	);
}

const ProcrastinationCard = () => {
	return (
		<Card className="my-2"><CardBody className="text-center">
			<p>gooo</p>
		</CardBody></Card>
	);
}

export default Procrastination;