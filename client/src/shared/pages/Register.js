import React from "react";
// import { Link } from "react-dom";
import {
	Container,
	LeftWrapper,
	RightImage,
	LeftImage,
	Title,
} from "./Welcome.style";
import coffeeBackground from "../../images/coffeeBackground.png";
import CreateAccount from "../components/Register";
import cookieLogo from "../../images/cookieLogo.png";

// Register page, left has the component of register page, which is being imported,
// Right side is a image in a flex-box to have 4:6 ratio
// register page for both customer and vendor app
export function Register() {
	return (
		<Container>
			<LeftWrapper>
				<LeftImage alt="cookie-logo" src={cookieLogo} />
				<Title>Snacks in a Van</Title>
				<CreateAccount />
			</LeftWrapper>
			<RightImage alt="coffee-image" src={coffeeBackground} />
		</Container>
	);
}

export default Register;
