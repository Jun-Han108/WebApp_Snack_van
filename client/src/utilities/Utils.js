import haversine from "haversine-distance";

// returns true if object is empty
export const objectIsEmpty = (object) => {
	return Object.keys(object).length === 0;
};

// parseISO date to HH:MM d/m/yyyy format
export const parseDate = (date) => {
	let minutes = date.getMinutes();
	let hours = date.getHours();
	let timeOfDay = "AM";
	if (hours > 12) {
		hours = `${date.getHours() - 12}`;
		timeOfDay = "PM";
	}
	if (minutes < 10) {
		minutes = `0${date.getMinutes()}`;
	}

	return `${hours}:${minutes} ${timeOfDay} on ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};
// calculate distance (in meters) between two latlng points
export const calculateDistance = (to, from) => {
  if (!objectIsEmpty(to) && !objectIsEmpty(from)) {
    return haversine(to, from);
  }
};
