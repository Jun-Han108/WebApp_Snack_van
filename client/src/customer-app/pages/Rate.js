import React from "react";
import { TopWrapper, Button } from "./Rate.style";
import { Rating } from "@material-ui/lab";
// import coffeeBackgroundHalf from "../../images/coffeeBackgroundHalf.png";
// import coffeeCup from "../../images/coffeeCup.png";
import axios from "axios";

export function Rate(props) {
	const [value, setValue] = React.useState(2);

	const onClick = async () => {
		try {
			const data = { rating: value, id: props.vendorId };
			const res = await axios.put(`/vendor/rate`, data, {
				headers: { "Content-Type": "application/json" },
			});
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<TopWrapper>
				<Rating
					name="half-rating"
					defaultValue={0}
					precision={0.5}
					style={{
						color: "black",
						transform: "scale(1.5)",
						display: "flex",
						justifyContent: "center",
					}}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
				/>

				<br />
			</TopWrapper>
			<Button onClick={onClick}>Rate the order</Button>
		</div>
	);
}
export default Rate;
