import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Card, CardBody } from 'reactstrap';

const Procrastination = () => {
	return (
		<Container>
			<Row>
				<Col style={{ maxWidth: "500px", margin: "0 auto" }}>
					<ProcrastinationCard />
				</Col>
			</Row>
		</Container>
	);
}

const ProcrastinationCard = () => {
	const [salary, setSalary] = useState({
		currentAge: 35,
		retirementAge: 65,
		salary: 5000,
	});
	const [loss, setLoss] = useState(0);

	useEffect(() => {
		setLoss(computingLoss(salary));
	}, [salary]);

	return (
		<Card className="my-2"><CardBody className="text-center pb-5">
			<p style={{ lineHeight: "2" }}>
				J'ai&nbsp;
				<input
					style={{ width: "50px", height: "30px" }}
					type="number" min="0" step="1"
					value={salary.currentAge}
					onChange={e => {
						setSalary(prevState => ({
							...prevState,
							currentAge: Number(e.target.value)
						}))
					}}
				/> ans
				et je vais prendre ma retraite à&nbsp;
				<input
					style={{ width: "50px", height: "30px" }}
					type="number" min="0" step="1"
					value={salary.retirementAge}
					onChange={e => {
						setSalary(prevState => ({
							...prevState,
							retirementAge: Number(e.target.value)
						}))
					}}
				/> ans.
			</p>

			<p>
				Je gagne
				$<input
					style={{ width: "75px", height: "30px" }}
					type="number" min="0" step="100"
					value={salary.salary}
					onChange={(e) => setSalary(prev => ({
						...prev,
						salary: Number(e.target.value)
					}))}
				/> par mois.
			</p>

			<h2 style={{ fontWeight: '900' }} className="text-danger my-4">
				${loss}
			</h2>

			<p>
				☝️ C'est ce que vous <strong>perdez chaque mois</strong> que vous n’investissez pas 📉
			</p>

			<div class="help-tip">
				<p>
					Ce calculateur suppose que vous investissez 20% de votre salaire avec
					un rendement annuel de 7%.
				</p>
			</div>
		</CardBody></Card>
	);
}

const computingLoss = (salary) => {
	const i_s = Math.pow(1+0.07, 1./12) - 1; // Monthly interest rate
	const s = 0.2 * salary.salary; // Savings per month
	const m = 12 * (salary.retirementAge - salary.currentAge);

	console.log(i_s);
	const loss = (s / i_s) * (Math.pow(1+i_s, m+1) - Math.pow(1+i_s, m));
	const approximateLoss = .5 + loss;

	return approximateLoss.toFixed();
}

export default Procrastination;