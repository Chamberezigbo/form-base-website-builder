// utils/withAuth.js
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import checkAuthentication from "./checkAuthentication";

const withAuth = (WrappedComponent) => {
	const AuthComponent = (props) => {
		const router = useRouter();

		// Check if the user is authenticated
		const isAuthenticated = checkAuthentication(); // Implement this function to check if the token is valid
		useEffect(() => {
			// Ensure this effect runs only on the client-side
			if (typeof window !== "undefined" && !isAuthenticated) {
				router.push("/signup/business-signup"); // Redirect to login if not authenticated
			}
		}, [isAuthenticated, router]);

		return <WrappedComponent {...props} />;
	};

	return AuthComponent;
};

export default withAuth;
