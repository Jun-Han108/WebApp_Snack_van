import React, {
	useState,
	Fragment,
	useEffect,
	useCallback,
	useRef,
} from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import mapStyle from "../../utilities/Mapstyle";
import useCurrentLocation from "./useCurrentLocation";
import currentLocationMarker from "../../images/currentLocat.png";

// map for both customer and vendor app
export default function Map(props) {
	// used to center map, default center is Melbourne
	const [center, setCenter] = useState(null);
	// used to ste zoom level in maps
	const [zoom] = useState(15);

	// stores current location in latlng object (e.g. {lat: number, lng: number})
	const currentLocation = useCurrentLocation();

	const [data, setData] = useState(null);

	// from @react-google-maps/api
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GMAP_KEY,
	});

	// googleMap component options
	const options = {
		disableDefaultUI: true,
		zoomControl: true,
		gestureHandling: "greedy",
		// uses custom map style stored in mapStyle
		styles: mapStyle,
	};

	const mapContainerStyle = {
		height: "calc(100vh - 64px - 3vh)",
		width: "100%",
		// height: "95vh",
		// width: "100%",
	};

	const mapRef = useRef();
	const setSelected = props.setSelected;
	const setOpen = props.setOpen;

	useEffect(() => {
		let mounted = true;

		if (mounted && props.data) {
			setData(props.data);
		}
		return () => {};
	}, [props.data, data]);

	// set the center of the map to be the current user's location
	// if there is a current location for the user, (e.g. user denies
	// sharing location), if not, set the center of the map to Melbourne
	useEffect(() => {
		if (currentLocation) {
			setCenter(currentLocation);
		} else {
			setCenter({ lat: -37.8136, lng: 144.9631 });
		}
		return () => {};
	}, [currentLocation]);

	// when the map loads, create a ref to the map to avoid re-renders
	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	// render a marker on the map in the user's current location
	const displayCurrentLocation = () => {
		if (currentLocation) {
			return (
				<Marker
					title={"You are here!"}
					position={currentLocation}
					icon={{
						url: currentLocationMarker,
						scaledSize: new window.google.maps.Size(30, 40),
					}}
				/>
			);
		}
	};

	// render markers to display the position of the data's element
	// location
	const displayData = () => {
		if (data) {
			return data.map((element) => {
				return (
					<Marker
						onClick={() => {
							setSelected(element);
							setOpen(true);
						}}
						key={element.id}
						title={element.name}
						position={{ lat: element.location.lat, lng: element.location.lng }}
					/>
				);
			});
		}
	};

	// render the map
	const renderMap = () => {
		return (
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				center={center}
				zoom={zoom}
				options={options}
				onLoad={onMapLoad}
			>
				{displayData()}

				{displayCurrentLocation()}
			</GoogleMap>
		);
	};

	if (loadError) {
		return <h3>Unable to load map</h3>;
	}

	// temp loading div
	const loadingDiv = (
		<div>
			<h1>Loading</h1>
		</div>
	);
	return <Fragment>{isLoaded ? renderMap() : loadingDiv}</Fragment>;
}
