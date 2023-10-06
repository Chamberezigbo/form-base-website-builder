"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import withAuth from "../utils/withAuth";
import Dashboard from "../components/userDashbord";
import { ToastContainer, toast } from "react-toastify";
import UserNotFound from "../components/UserNotFound";
import LoadingSpinner from "../components/LoadingSpinner";

function page() {
	// State to store the product data fetched from the REST API
	const [productData, setProductData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const userData = useSelector((state) => state.user.userData);
	const token = userData?.token;

	useEffect(() => {
		const fetchData = async () => {
			if (token) {
				// Fetch data from your REST API using productId as a query parameter
				const url =
					"https://apis.thetekpreneurs.com/api-endpoint/app.php";

				try {
					const response = await fetch(url, {
						method : 'GET',
						headers: {
							Authorization: `Bearer ${token}`, // Include the token in the Authorization header
						},
					});

					console.log(response);
					if (response.ok) {
						const responseData = await response.json();
						setProductData(responseData);
						console.log(responseData);
					}
				} catch (error) {
					// Handle network errors
					// toast.error(error);
					setError("User not found");
					console.log(error);
				} finally {
					setIsLoading(false);
				}
			}
		};
		fetchData(); // Call the async function immediately
	}, [token]);
	return (
		<div>
			{isLoading ? (
				<LoadingSpinner />
			) : error ? (
				<UserNotFound />
			) : (
				<div>
					{/* Render your data here */}
					<Dashboard data={productData} />
				</div>
			)}
		</div>
	);

	// if (isLoading) {
	// 	// Render a loading indicator
	// 	return ;
	// } else if (productData) {
	// 	// Render your component with the fetched data
	// 	return <Dashboard data={productData} />;
	// } else {
	// 	// Handle other cases or render a default component
	// 	return <UserNotFound />;
	// }
}

export default withAuth(page);
// export default page;
