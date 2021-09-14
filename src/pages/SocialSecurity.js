import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Card, CardBody } from 'reactstrap';

const SocialSecurity = () => {
	return (
		<Container>
			<Row>
				<Col style={{ maxWidth: "500px", margin: "0 auto" }}>
					<SSCard />
				</Col>
			</Row>
		</Container>
	);
}

const SSCard = () => {
	const [salary, setSalary] = useState({
		currentAge: 35,
		salary: 60000,
		increase: 1000
	});
	const [pension, setPension] = useState(0);

	useEffect(() => {
		setPension(computePension(salary));
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
				/> ans. Je gagne
				$<input
					style={{ width: "75px", height: "30px" }}
					type="number" min="0" step="500"
					value={salary.salary}
					onChange={(e) => setSalary(prev => ({
						...prev,
						salary: Number(e.target.value)
					}))}
				/> par an.
			</p>

			<p>
				Dans le future, je pense que mon salaire augmentera de&nbsp;
				<span style={{whiteSpace: 'nowrap'}}>
				$<input
					style={{ width: "75px", height: "30px" }}
					type="number" min="0" step="100"
					value={salary.increase}
					onChange={(e) => setSalary(prev => ({
						...prev,
						increase: Number(e.target.value)
					}))}
				/></span> tous les ans.
			</p>

			<h2 style={{ fontWeight: '900' }} className="text-success my-4">
				${pension}
			</h2>

			<p>
				🔼 C'est la pension que vous versera la Social Security américaine tous les ans.
			</p>

			<div className="help-tip">
				<p>
					Ce calculateur suppose que prendrez votre retraite au
					"<a href="nra.html">normal (or full) retirement age</a>" qui est de 67 ans.
				</p>
			</div>
		</CardBody></Card>
	);
}

const computePension = (salary) => {
	const aime = computeAIME(salary);
	console.log(`AIME: ${aime}`);

	const binnedAIME = 12 * computeBins(aime);

	return binnedAIME.toFixed();
}

const computeAIME = (salary) => {
	const ret_age = 67;
	const ssaPeriod = 35;
	let last35Income = 0;
	let current_salary = salary.salary;

	let current_age = salary.currentAge;
	if(salary.currentAge > ret_age - ssaPeriod) {
		// If so old that the years ahead of me won't cover the 35 years.
		const left_over_time = ssaPeriod - (ret_age - salary.currentAge);
		last35Income += left_over_time * current_salary;
	}

	for (var a = current_age + 1; a <= ret_age; a++) {
		current_salary += salary.increase

		if(a > ret_age - ssaPeriod) {
			// If I'm old enough to already be contributing.
			last35Income += current_salary
		//} else {
		//	console.log(`I'm ${a} and it's not old enough to contribute.`);
		}
	}

	const aime = last35Income * 1.0 / ssaPeriod / 12;

	return aime;
}

const computeBins = (aime) => {
	const bin1 = 996;
	const bin2 = 6002;
	const rate1 = .9;
	const rate2 = .32;
	const rate3 = .15;


	switch (true) {
		case aime <= bin1:
			return aime * rate1;

		case bin1 < aime && aime <= bin2:
			return bin1 * rate1 + (aime - bin1) * rate2; 

		default:
			const part1 = bin1 * rate1;
			const part2 = (bin2 - bin1) * rate2;
			const part3 = (aime - bin2) * rate3;
			return part1 + part2 + part3;
	}

	return 0;
}

export default SocialSecurity;