"use client";
import "./css/pageStyle.css";
import { useState, useEffect } from "react";
import useRouter from "next/router";
import { DiAptana } from "react-icons/di";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Joi.object({
	fullName: Joi.string().min(2).max(100).required().messages({
		"string.base": "Full name must be a string",
		"string.empty": "Full name is required",
		"string.min": "Full name must be at least {#limit} characters long",
		"string.max": "Full name cannot exceed {#limit} characters",
		"any.required": "Full name is required",
	}),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			"string.base": "Email must be a string",
			"string.empty": "Email is required",
			"string.email": "Email must be a valid email address",
			"any.required": "Email is required",
		}),
	password: Joi.string().min(6).required().messages({
		"string.base": "Password must be a string",
		"string.empty": "Password is required",
		"string.min": "Password must be at least {#limit} characters long",
		"any.required": "Password is required",
	}),
	phone: Joi.string()
		.pattern(/^\d{10}$/)
		.required()
		.messages({
			"string.base": "Phone number must be a string",
			"string.empty": "Phone number is required",
			"string.pattern.base": "Phone number must be a 10-digit number",
			"any.required": "Phone number is required",
		}),

	dateOfBirth: Joi.date().iso().max("now").required().messages({
		"date.base": "Date of birth must be a valid date",
		"date.empty": "Date of birth is required",
		"date.iso": "Date of birth must be in ISO format",
		"date.max": "Date of birth cannot be in the future",
		"any.required": "Date of birth is required",
	}),
});

const page = () => {
	const router = useRouter;
	// Defining the state of my form//
	const [signupData, setSignupData] = useState({
		fullName: "",
		email: "",
		password: "",
		phone: "",
		dateOfBirth: "",
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
		const fieldSchema = validationSchema.extract(name);
		const { error } = fieldSchema.validate(value, {
			abortEarly: false,
		});

		setValidationErrors((prevValidationErrors) => ({
			...prevValidationErrors,
			[name]: error ? error.details[0].message : null,
		}));
	};
	useEffect(() => {
		console.log("this is coming from useEffect", signupData);
	}, [signupData]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Do something with the form data, such as making an API request or performing validation
		try {
			setLoading(true); // Set loading state to true
			const { error } = validationSchema.validate(signupData, {
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
			const url = "https://mybusiness.onrender.com/api/users/";
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
				console.log(response);
			} else {
				console.log(response);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false); // Set loading state back to false
		}

		// After the form submission logic is complete, navigate to another page
		// router.push("3"); // Replace '/success' with the desired page path
	};

	return (
		<>
			<ToastContainer limit={1} />
			<div className="container">
				<div className="row justify-content-center mt-0 mt-md-5">
					<div className="col-md-6">
						<h1 className="text-center">Welcome</h1>
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label
									htmlFor="exampleName"
									className="form-label"
								>
									Name
								</label>
								<input
									type="text"
									className="form-control border-top-0 border-end-0 border-start-0"
									name="fullName"
									id="fullName"
									placeholder="Enter your full-name"
									onChange={handleInputChange}
									value={signupData.fullName}
								/>
							</div>
							<div className="mb-3">
								<label
									htmlFor="exampleEmail"
									className="form-label"
								>
									Email
								</label>
								<input
									type="email"
									className="form-control border-top-0 border-end-0 border-start-0"
									name="email"
									id="email"
									placeholder="Enter your email"
									onChange={handleInputChange}
									value={signupData.email}
								/>
							</div>
							<div className="mb-3">
								<label
									htmlFor="examplePassword"
									className="form-label"
								>
									Password
								</label>
								<input
									type="password"
									className="form-control border-top-0 border-end-0 border-start-0"
									id="password"
									name="password"
									placeholder="Enter your password"
									onChange={handleInputChange}
									value={signupData.password}
								/>
							</div>
							<div className="mb-3">
								<label
									htmlFor="examplePassword"
									className="form-label"
								>
									Phone
								</label>
								<input
									type="tel"
									className="form-control border-top-0 border-end-0 border-start-0"
									id="phone"
									name="phone"
									placeholder="Enter your phone number"
									onChange={handleInputChange}
									value={signupData.phone}
								/>
							</div>
							<div className="mb-3">
								<label
									htmlFor="examplePassword"
									className="form-label"
								>
									Date Of Birth
								</label>
								<input
									type="date"
									className="form-control border-top-0 border-end-0 border-start-0"
									id="dateOfBirth"
									name="dateOfBirth"
									placeholder="Enter your date of birth"
									onChange={handleInputChange}
									value={signupData.dateOfBirth}
								/>
							</div>
							<div className="mb-3  custom-form-check ">
								<label
									className="form-check-label"
									htmlFor="exampleCheck"
								>
									Do you agree to receive email update from
									tekprenuers.com?
								</label>
								<input
									type="checkbox"
									className="form-check-input"
									id="updateCheck"
									name="updateCheck"
									value={signupData.update}
									onChange={handleInputChange}
								/>
							</div>
							<div className="text-center">
								<button
									type="submit"
									className="btn btn-primary btn-md px-5"
									disabled={loading}
								>
									{loading ? (
										<DiAptana className="spinner" />
									) : (
										"Signup"
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
