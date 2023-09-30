"use client";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/reducers/userReducer";
import validation from "./methods/methods";
import formFieldsProperty from "../../utils/formInputs";
import DynamicForm from "../../components/Dynamic";

import "./css/pageStyle.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const formTitle = "Welcome";

	// Defining the state of my form//
	const [signupData, setSignupData] = useState({
		fullName: "",
		email: "",
		password: "",
		phone: "",
		date_of_birth: "",
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
		const fieldSchema = validation.validationSchema.extract(name);
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
			const { error } = validation.validationSchema.validate(signupData, {
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
			const url =
				"https://apis.thetekpreneurs.com/api-endpoint/signup.php";
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(signupData),
			});
			// Simulate API request delay
			await new Promise((resolve) => setTimeout(resolve, 2000));

			if (response.ok) {
				const responseData = await response.json();
				const userData = responseData;
				dispatch(saveUserData(userData)); // This will save userData to Redux state
				toast.success(userData.message);
				router.push("/signup/business-signup/business-registration"); // Replace '/success' with the desired page path
			} else {
				const errorData = await response.json();
				toast.error(errorData.message);
			}
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false); // Set loading state back to false
		}
	};

	// Set the value property for each form field based on the signupData state
	const formFieldsWithValue = formFieldsProperty.signupFormFields.map(
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
};

export default page;
