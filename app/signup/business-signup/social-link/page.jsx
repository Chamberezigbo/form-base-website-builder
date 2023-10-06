"use client";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import validation from "../methods/methods";
import formFieldsProperty from "../../../utils/formInputs";
import DynamicForm from "../../../components/Dynamic";
import withAuth from "../../../utils/withAuth";

import "../css/pageStyle.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function page() {
	const userData = useSelector((state) => state.user.userData);
	const router = useRouter();
	const formTitle = "Connect With Clients! Share Your Social Links";

	// Defining the state of my form//
	const [signupData, setSignupData] = useState({
		facebook: "",
		linkedIn: "",
		Instagram: "",
		// updateCheck: !true,
	});
	// loader//
	const [loading, setLoading] = useState(false);

	// error state for validate//
	const [validationErrors, setValidationErrors] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setSignupData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		//validate after change //
		const fieldSchema = validation.socialLinkSchema.extract(name);
		const { error } = fieldSchema.validate(value, {
			abortEarly: false,
		});

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
			const { error } = validation.socialLinkSchema.validate(signupData, {
				abortEarly: false,
			});

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
			const url =
				"https://apis.thetekpreneurs.com/api-endpoint/save-social-link.php";
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // Include the
				},
				body: JSON.stringify(signupData),
			});
			// Simulate API request delay
			await new Promise((resolve) => setTimeout(resolve, 2000));

			if (response.ok) {
				const responseData = await response.json();
				const userData = responseData.message;
				toast.success("details has been successfully submitted");
				console.log(userData);
				router.push("../../dashboard/");
			} else {
				const errorData = await response.json();
				toast.error(errorData.error);
				console.log(errorData);
			}
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false); // Set loading state back to false
		}
	};

	// Set the value property for each form field based on the signupData state
	const formFieldsWithValue = formFieldsProperty.socialLinkFormFields.map(
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
			/>
		</>
	);
}

export default withAuth(page);
