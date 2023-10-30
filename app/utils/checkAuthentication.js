import { useSelector, useDispatch } from "react-redux";
import { saveUserData } from "../redux/reducers/userReducer";

const checkAuthentication = () => {
	const dispatch = useDispatch();

	// Get user data from Redux state
	const userData = useSelector((state) => state.user.userData);

	// If user data is present in Redux, return true
	if (userData && userData.token) {
		return true;
	}

	// If user data is not in Redux, try to get it from cookies
	const cookieUserData = getCookieUserData(); // Implement this function to read user data from cookies

	// If user data is found in cookies, save it to Redux and return true
	if (cookieUserData) {
		dispatch(saveUserData(cookieUserData));
		return true;
	}

	// If user data is not in Redux or cookies, return false
	return false;
};

export default checkAuthentication;
