import React, { useState, useEffect, useCallback, Fragment } from "react";
import { Time } from "./Interval.style";

// Timer for order
const Interval = (props) => {
	const calcTimeLeft = useCallback(() => {
		const updatedAt = new Date(props.updatedAt);
		let currentDate = new Date();
		// max late time limit for discount
		let discountTime = 15;
		// timeLimit is in ms
		let timeLimit = discountTime * 60 * 1000;

		// time difference between the time limit and the current time
		let difference = timeLimit - (currentDate - updatedAt);
		let timeLeft = null;
		if (difference > 0) {
			timeLeft = {
				min: Math.floor((difference / 1000 / 60) % 60),
				sec: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	}, [props.updatedAt]);

	const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

	const setLate = props.setLate;
	let min = 0;
	let sec = 0;

	// countdown every second
	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft(calcTimeLeft());
		}, 1000);

		return () => clearInterval(interval);
	}, [calcTimeLeft, timeLeft]);

	// if timeLeft is null (i.e. time limit met or exceeded),
	// set the order as late, which will apply a 20% discount
	useEffect(() => {
		if (!timeLeft) {
			setLate(true);
		}
		return () => {};
	}, [setLate, timeLeft]);

	if (timeLeft) {
		min = timeLeft.min;
		sec = timeLeft.sec;
	}
	if (min < 10) {
		min = "0" + min;
	}

	if (sec < 10) {
		sec = "0" + sec;
	}

	return (
		<Fragment>
			{timeLeft ? (
				<Time>
					<header>
						{min}:{sec}
					</header>
				</Time>
			) : null}
		</Fragment>
	);
};

export default Interval;
