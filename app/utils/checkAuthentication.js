// utils/checkAuthentication.js
import { useSelector } from "react-redux";

const checkAuthentication = () => {
	const userData = useSelector((state) => state.user.userData); // Get the token from localStorage (or sessionStorage, cookies, etc.)

	if (!userData) {
		return false; // If the userData is not present, the user is not authenticated
	} else {
		return true;
	}
};

export default checkAuthentication;
