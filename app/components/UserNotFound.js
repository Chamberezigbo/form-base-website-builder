import Link from "next/link";

const UserNotFound = () => {
	return (
		<div className="error-container">
			<h1>Business Not Found</h1>
			<p>We couldn't find the business you're looking for.</p>
			<Link href="/">Go Back to Home</Link>
		</div>
	);
};

export default UserNotFound;
