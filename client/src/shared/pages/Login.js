import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
	Container,
	LeftWrapper,
	RightImage,
	LeftImage,
	Title,
} from "./Welcome.style";
import coffeeBackground from "../../images/coffeeBackground.png";
// import SignIn from "../components/Login";

import SignIn from "../components/SignIn";
import cookieLogo from "../../images/cookieLogo.png";
import { Fragment } from "react";

// Login page, left has the component of login page, which is being imported from the components folder,
// Right side is a image in a flex-box to have 4:6 ratio
// login page for both customer and vendor app
export function Login() {
	const history = useHistory();
	const goBack = () => {
		if (pathname.includes("vendor")) {
			history.push("/customer/login");
		} else {
			history.push("/vendor/login");
		}
	};

	const pathname = useLocation().pathname;

	let user = "customer";

	// determine which user is using the app based
	// on the pathname
	if (pathname.includes("vendor")) {
		user = "vendor";
	}

	const renderLoginText = () => {
		let headingMsg = "Customer Login";
		let changeUser = "Are you a Vendor?";
		let changeUserButtonMsg = "Go to Vendor Login";

		// conditionally render the text based on which user is
		// using the app
		if (user == "vendor") {
			headingMsg = "Vendor Login";
			changeUser = "Are you a Customer?";
			changeUserButtonMsg = "Go to Customer Login";
		}
		return (
			<Fragment>
				<h1>{headingMsg}</h1>
				<h4>{changeUser}</h4>
				<Button type="button" onClick={goBack}>
					{changeUserButtonMsg}
				</Button>
			</Fragment>
		);
	};

	return (
		<Container>
			<LeftWrapper>
				{renderLoginText()}

				<br />
				<LeftImage alt="cookie-logo" src={cookieLogo} />
				<Title>Snacks in a Van</Title>
				<SignIn />
			</LeftWrapper>
			<RightImage alt="coffee-image" src={coffeeBackground} />
		</Container>
	);
}

export default Login;
