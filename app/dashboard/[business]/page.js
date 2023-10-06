"use client";
import { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import LoadingSpinner from "../../components/LoadingSpinner";
import UserNotFound from "../../components/UserNotFound";

const Page = ({ params }) => {
	// State to store the product data fetched from the REST API
	const [productData, setProductData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const businessId = params.business;

	useEffect(() => {
		const fetchData = async () => {
			if (businessId) {
				// Fetch data from your REST API using productId as a query parameter
				const url = `https://apis.thetekpreneurs.com/api-endpoint/read_data.php?business=${businessId}`;

				try {
					const response = await fetch(url, {
						method: "GET",
					});

					if (response.ok) {
						const responseData = await response.json();
						setProductData(responseData);
					} else if (response.status === 404) {
						// Handle the case where the user is not found
						setError("User not found");
					} else {
						// Handle other errors
						setError("An error occurred");
					}
				} catch (error) {
					// Handle network errors
					setError("Network error");
				} finally {
					setIsLoading(false);
				}
			}
		};

		fetchData(); // Call the async function immediately
	}, [businessId]);

	// Conditionally render based on the fetch response
	if (isLoading) {
		// Render a loading indicator
		return <LoadingSpinner />;
	} else if (error) {
		// Render an error message or redirect to a "not found" page
		if (error === "User not found") {
			// Redirect to the Next.js built-in "notFound" page
			return <UserNotFound />;
		} else {
			// Render an error message
			return <p>{error}</p>;
		}
	} else if (productData) {
		// Render your component with the fetched data
		return <Dashboard data={productData} />;
	} else {
		// Handle other cases or render a default component
		return <UserNotFound />;
	}
};

export default Page;
