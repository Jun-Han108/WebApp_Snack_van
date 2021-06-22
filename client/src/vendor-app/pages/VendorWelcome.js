import React from "react";
import {
	Container,
	LeftWrapper,
	LeftImage,
	RightImage,
	Title,
	MyButton,
} from "./VendorWelcome.style";
import coffeeBackground from "../../images/coffeeBackground.png";
import cookieLogo from "../../images/cookieLogo.png";
import { Link } from "react-router-dom";

// vendor welcome page
export default function VendorWelcome() {
	return (
		<Container>
			{/* Left container made to 40% of the screen*/}
			<LeftWrapper>
				<LeftImage alt="cookie-logo" src={cookieLogo} />
				<Title>Snacks in a Van</Title>
				<Link to="/vendor/login">
					<MyButton>Login Van</MyButton>
				</Link>
			</LeftWrapper>
			{/* Right container made to 60% of the screen*/}

			<RightImage alt="coffee-image" src={coffeeBackground} />
		</Container>
	);
}
