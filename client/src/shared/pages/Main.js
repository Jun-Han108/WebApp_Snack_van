import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../auth-context";
import Button from "@material-ui/core/Button";

import cookieLogo from "../../images/cookieLogo.png";
import { device } from "../components/device";
import coffeeBackground from "../../images/coffeeBackground.png";

const Container = styled.div`
	height: 93vh;
	width: 100%;
	position: relative;
	flex: 1;
	overflow-y: auto;
	display: flex;
	align-items: center;

	margin: 0;
	padding: 0;
`;

const LeftWrapper = styled.div`
	flex: 0 0 100%;
	flex-direction: column;
	max-width: 100%;
	margin-bottom: 4%;
	display: flex;

	@media ${device.tablet} {
		flex: 0 0 60%;
		max-width: 60%;
	}

	@media ${device.laptop} {
		flex: 0 0 40%;
		max-width: 40%;
	}
`;

const RightImage = styled.img`
	position: absolute;
	right: 0;
	width: 100%;
	height: 100%;
	flex: 0 0 0%;
	max-width: 0%;
	object-fit: cover;
	object-position: 15% 85%;

	@media ${device.tablet} {
		flex: 0 0 40%;
		max-width: 40%;
	}

	@media ${device.laptop} {
		flex: 0 0 60%;
		max-width: 60%;
	}
`;

const BottomContainer = styled.div`
	padding: 20px;
	margin-left: auto;

	margin-right: auto;
	padding-bottom: 5vh;
`;

const LeftImage = styled.img`
	display: block;
	margin-left: auto;
	margin-right: auto;
`;

const TitleBig = styled.h1`
	text-align: center;
	font-family: "Dawning of a New Day";
`;

function Main() {
	const history = useHistory();

	const auth = useContext(AuthContext);
	useEffect(() => {
		auth.logout();
	}, []);

	return (
		<Container>
			<LeftWrapper>
				<BottomContainer>
					<LeftImage alt="cookie-logo" src={cookieLogo} />
					<TitleBig>Snacks in a Van</TitleBig>
				</BottomContainer>
				<BottomContainer>
					<Button
						variant="default"
						color="default"
						style={{ fontSize: "18px" }}
						onClick={() => {
							history.push("/customer");
						}}
					>
						Customer
					</Button>
				</BottomContainer>
				<BottomContainer>
					<Button
						variant="default"
						color="default"
						style={{ fontSize: "18px" }}
						onClick={() => {
							history.push("/vendor");
						}}
					>
						Vendor
					</Button>
				</BottomContainer>
			</LeftWrapper>
			<RightImage alt="coffee-image" src={coffeeBackground} />
		</Container>
	);
}

export default Main;
