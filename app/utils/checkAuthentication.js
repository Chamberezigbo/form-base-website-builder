import { useSelector, useDispatch } from "react-redux";
import { saveUserData } from "../redux/reducers/userReducer";

// Define the getCookieUserData function to read user data from cookies
const getCookieUserData = () => {
	if (typeof document === "undefined") {
		// Check if the document object is not available (server-side).
		return null;
	}
     
	// For example, if the user data is stored in a cookie called "userData":
	const userDataCookie = document.cookie
		.split("; ")
		.find((cookie) => cookie.startsWith("userData="));
	if (userDataCookie) {
		const userDataString = userDataCookie.split("=")[1];
		return JSON.parse(decodeURIComponent(userDataString));
	}
	// If user data is not found in cookies, return null or handle it accordingly.
	return null;
};

const checkAuthentication = () => {
	const dispatch = useDispatch();

	// Get user data from Redux state
	const userData = useSelector((state) => state.user.userData);

	// If user data is present in Redux, return true
	if (userData && userData.token) {
		return true;
	}

	// If user data is not in Redux, try to get it from cookies
	const cookieUserData = getCookieUserData();

	// If user data is found in cookies, save it to Redux and return true
	if (cookieUserData) {
		dispatch(saveUserData(cookieUserData));
		return true;
	}

	// If user data is not in Redux or cookies, return false
	return false;
};

export default checkAuthentication;
