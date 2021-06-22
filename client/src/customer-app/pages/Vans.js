import React, { useState, useEffect } from "react";
import Map from "../../shared/components/Map";
import axios from "axios";
import { Link } from "react-router-dom";
import {
	PopUpBody,
	PopUpTitle,
	OrderButton,
	PopUpRating,
	SlideDiv,
	SlideWrapper,
	VanDescription,
} from "../pages/Vans.style";
import { Fragment } from "react";
import { Dialog } from "@material-ui/core";
import useCurrentLocation from "../../shared/components/useCurrentLocation";
import { calculateDistance } from "../../utilities/Utils";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import bigCake from "../../images/bigcakeCrop.png";
import cappuccino from "../../images/cappuccinoCrop.png";
import fancybiscuit from "../../images/fancybiscuit.jpg";

export default function Vans() {
	const [vendors, setVendors] = useState([]);

	const [selected, setSelected] = useState(null);
	const [open, setOpen] = useState(false);

	const currentLocation = useCurrentLocation();

	const slideImages = [bigCake, cappuccino, fancybiscuit];

	const Slideshow = () => {
		return (
			<div>
				<Slide easing="ease">
					<div className="each-slide">
						<SlideDiv
							style={{ backgroundImage: `url(${slideImages[0]})` }}
						></SlideDiv>
					</div>
					<div className="each-slide">
						<SlideDiv
							style={{ backgroundImage: `url(${slideImages[1]})` }}
						></SlideDiv>
					</div>
					<div className="each-slide">
						<SlideDiv
							style={{ backgroundImage: `url(${slideImages[2]})` }}
						></SlideDiv>
					</div>
				</Slide>
			</div>
		);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		// used for cleanup
		let isMounted = true;

		// fetch list of vendors from db
		const fetchVendors = async () => {
			try {
				const res = await axios.get("/vendor");
				if (isMounted) {
					setVendors(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchVendors();

		return () => {
			isMounted = false;
		};
	}, [vendors]);

	// display the distance between the user's current location and
	// the vendor in meters
	const renderDistance = () => {
		if (selected && selected.location != currentLocation && currentLocation) {
			const distance = calculateDistance(selected.location, currentLocation);
			return <p>{distance.toFixed(2)} m away from you</p>;
		}
		return null;
	};

	// render rating
	const renderRating = () => {
		var total = 0;
		for (var i in selected.rating) {
			total += selected.rating[i];
		}
		return total / selected.rating.length;
	};

	// render rating in star format
	const renderRatingStar = () => {
		var total = 0;
		var output = "";
		for (var i in selected.rating) {
			total += selected.rating[i];
		}
		if (
			Math.floor(total / selected.rating.length) ===
			total / selected.rating.length
		) {
			output += "★".repeat(total / selected.rating.length);
			output += "☆".repeat(5 - total / selected.rating.length);
			return output;
		} else {
			output += "★".repeat(Math.floor(total / selected.rating.length));
			output += "☆".repeat(5 - Math.floor(total / selected.rating.length));
			return output;
		}
	};

	// render the dialog modal
	const renderDialog = () => {
		if (selected && selected.location != currentLocation) {
			return (
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<PopUpTitle>{selected.name}</PopUpTitle>

					<SlideWrapper>{Slideshow()}</SlideWrapper>
					<PopUpBody>
						<PopUpRating>
							{renderRatingStar()}{" "}
							<span style={{ fontSize: "1.7rem", color: "grey" }}>
								{renderRating()}/5
							</span>
						</PopUpRating>

						<VanDescription>
							<p style={{ fontWeight: "bold" }}>Description:</p>
							<p>{selected.locationDetails}</p>
							<p>{renderDistance()}</p>
						</VanDescription>
						<Link to={{ pathname: `/customer/menu/` }}>
							<OrderButton
								onClick={() => {
									localStorage.setItem("vendor", JSON.stringify(selected));
								}}
							>
								Make an order
							</OrderButton>
						</Link>
					</PopUpBody>
				</Dialog>
			);
		}
	};
	return (
		<Fragment>
			<Map
				data={vendors}
				selected={selected}
				setOpen={setOpen}
				setSelected={setSelected}
			/>
			{renderDialog()}
		</Fragment>
	);
}
