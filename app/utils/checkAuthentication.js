// utils/checkAuthentication.js
import { useSelector } from "react-redux";

const checkAuthentication = () => {
	const userData = useSelector((state) => state.user.userData); // Get the token from localStorage (or sessionStorage, cookies, etc.)

       if (userData && userData.token) {
			// Check if userData is not null/undefined and has a "token" property
			return true; // If the userData has a "token" property, the user is authenticated
		} else {
			return false; // If the userData is not present or doesn't have a "token" property, the user is not authenticated
		}
};

export default checkAuthentication;
