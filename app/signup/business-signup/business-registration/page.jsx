//secure component
"use client"; // <-- Mark as client component
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import withAuth from "../../../utils/withAuth";
import DynamicForm from "../../../components/Dynamic";
import { ToastContainer, toast } from "react-toastify";
import formFieldsProperty from "../../../utils/formInputs";
import validation from "../methods/methods";

import ".././css/pageStyle.css";
import "react-toastify/dist/ReactToastify.css";

const BusinessRegistrationPage = () => {
	const fileInputRef = useRef(null); // Create a ref for the file input element
	const router = useRouter();
	const formTitle = "Let’s get to know more about your business";

	const userData = useSelector((state) => state.user.userData);

	// Defining the state of my form//
	const [signupData, setSignupData] = useState({
		name: "",
		description: "",
		location: "",
		logo: null, // Initially set to null
		// updateCheck: !true,
	});
	// loader//
	const [loading, setLoading] = useState(false);

	// error state for validate//
	const [validationErrors, setValidationErrors] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		// Handle the image input separately from other input fields
		if (name === "logo") {
			const file = e.target.files[0];
			setSignupData((prevData) => ({
				...prevData,
				[name]: file, // Set the image file in the state
			}));
		} else {
			setSignupData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}

		// Validate after change
		const fieldSchema = validation.businessValidationSchema.extract(name);
		const { error } = fieldSchema.validate(value);

		setValidationErrors((prevValidationErrors) => ({
			...prevValidationErrors,
			[name]: error ? error.details[0].message : null,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Do something with the form data, such as making an API request or performing validation
		try {
			setLoading(true); // Set loading state to true
			const { error } = validation.businessValidationSchema.validate(
				signupData,
				{
					abortEarly: false,
				}
			);

			if (error) {
				const validationErrors = error.details.reduce(
					(errors, { context, message }) => ({
						...errors,
						[context.key]: message,
					}),
					{}
				);
				// Display the validation errors in a Toastify notification
				Object.values(validationErrors).forEach((errorMessage) => {
					toast.error(errorMessage);
				});
				return;
			}

			const token = userData.token;

			// Create a new FormData to include the image data
			const formData = new FormData();
			formData.append("name", signupData.name);
			formData.append("description", signupData.description);
			formData.append("location", signupData.location);
			formData.append("logo", signupData.logo);

			const url =
				"https://apis.thetekpreneurs.com/api-endpoint/save-business-details.php";
			const response = await fetch(url, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`, // Include the token in the Authorization header
				},
				body: formData,
			});
			// Simulate API request delay
			await new Promise((resolve) => setTimeout(resolve, 2000));

			if (response.ok) {
				const responseData = await response.json();
				const userData = responseData;
				toast.success(userData.message);
				console.log(responseData);
				router.push("/signup/business-signup/social-link/"); // Replace '/success' with the desired page path
			} else {
				const errorData = await response.json();
				toast.error(errorData.message);
				console.log(errorData);
			}
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false); // Set loading state back to false
		}
	};

	// Set the value property for each form field based on the signupData state
	const formFieldsWithValue = formFieldsProperty.businessFormFields.map(
		(field) => ({
			...field,
			value: signupData[field.name],
		})
	);

	return (
		<>
			<ToastContainer limit={1} />
			<DynamicForm
				formTitle={formTitle}
				formFields={formFieldsWithValue}
				onChange={handleInputChange}
				onSubmit={handleSubmit}
				loading={loading} // Pass the loading state if needed
				fileInputRef={fileInputRef}
			/>
		</>
	);
};

export default withAuth(BusinessRegistrationPage);
