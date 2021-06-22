import { useEffect, useState } from "react";

// custom hook to get the user's current location
// using the browser's implementation
export default function useCurrentLocation() {
	const [location, setLocation] = useState(null);

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				},
				(error) => {
					console.warn(`Error(${error.code}): ${error.message}`);
				},
				{ enableHighAccuracy: true, timeout: 5000 }
			);
		} else {
			console.log("Geolocation is not available");
		}
		return () => {};
	}, []);
	return location;
}
