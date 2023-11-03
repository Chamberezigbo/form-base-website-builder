import Link from "next/link";

const UserNotFound = ({ errorMessage }) => {
	return (
		<div className="error-container">
			<h1>{errorMessage}</h1>
			<p>We couldn't find the business you're looking for.</p>
			<Link href="/">Go Back to Home</Link>
		</div>
	);
};

export default UserNotFound;
