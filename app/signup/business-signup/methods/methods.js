import Joi from "joi";

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
		.pattern(/^[0-9\s+]+$/)
		.required()
		.messages({
			"string.base": "Phone number must be a string",
			"string.empty": "Phone number is required",
			"string.pattern.base": "Phone number must be above 8-digit number",
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

const businessValidationSchema = Joi.object({
	// Additional fields
	description: Joi.string().min(10).max(500).required().messages({
		"string.base": "Description must be a string",
		"string.empty": "Description is required",
		"string.min": "Description must be at least {#limit} characters long",
		"string.max": "Description cannot exceed {#limit} characters",
		"any.required": "Description is required",
	}),
	name: Joi.string().min(2).max(50).required().messages({
		"string.base": "Name must be a string",
		"string.empty": "Name is required",
		"string.min": "Name must be at least {#limit} characters long",
		"string.max": "Name cannot exceed {#limit} characters",
		"any.required": "Name is required",
	}),
	location: Joi.string().min(5).max(100).required().messages({
		"string.base": "Location must be a string",
		"string.empty": "Location is required",
		"string.min": "Location must be at least {#limit} characters long",
		"string.max": "Location cannot exceed {#limit} characters",
		"any.required": "Location is required",
	}),
	image: Joi.object().meta({ swaggerType: "file" }).required().messages({
		"any.required": "Image is required",
	}),
});

const validation = {
	validationSchema,
	businessValidationSchema,
};

export default validation;
