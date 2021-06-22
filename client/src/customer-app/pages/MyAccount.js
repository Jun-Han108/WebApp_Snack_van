import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	Container,
	RightImage,
	LeftWrapper,
	LeftImage,
	Title,
} from "./Welcome.style";
import { Division, Line, Edit } from "./MyAccount.style";
import coffeeBackground from "../../images/coffeeBackground.png";
import cookieLogo from "../../images/cookieLogo.png";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";
import Button from "@material-ui/core/Button";

// My account page
export function MyAccount() {
	const [customer, setCustomer] = useState(null);
	const [edit, setEdit] = useState(false);
	const [pass, setPassword] = useState(false);
	const changePassword = () => {
		setPassword(false);
	};

	useEffect(() => {
		let isMounted = true;
		const fetchAccount = async () => {
			try {
				const res = await axios.get("/customer/me");
				if (isMounted) {
					setCustomer(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchAccount();
		return () => {
			isMounted = false;
		};
	}, []);

	const changeState = () => {
		setEdit(false);
	};

	function renderCustomer() {
		if (customer) {
			const { email, firstName, lastName } = customer;
			const FName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
			const LName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
			return (
				<Container>
					<LeftWrapper>
						<LeftImage alt="cookie-logo" src={cookieLogo} />
						<Title>MyAccount</Title>

						{pass ? (
							<Division>
								{" "}
								<ChangePassword changePassword={changePassword} />
							</Division>
						) : (
							<>
								{edit ? (
									<Division>
										{" "}
										<EditProfile
											changeState={changeState}
											customer={customer}
										/>{" "}
									</Division>
								) : (
									<Division>
										<Line>
											<b>Email: </b> &nbsp; {email}
										</Line>
										<Line>
											<b>First Name:</b> &nbsp; {FName}
										</Line>
										<Line>
											<b>Last Name:</b> &nbsp; {LName}
										</Line>

										<Edit>
											<Button color="default" onClick={() => setEdit(true)}>
												Edit Profile
											</Button>
										</Edit>
										<Edit>
											<Button color="default" onClick={() => setPassword(true)}>
												Change Password
											</Button>
										</Edit>
									</Division>
								)}
							</>
						)}
					</LeftWrapper>

					<RightImage alt="coffee-image" src={coffeeBackground} />
				</Container>
			);
		}
	}
	return <>{renderCustomer()}</>;
}

export default MyAccount;
