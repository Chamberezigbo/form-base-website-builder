const signupFormFields = [
	{
		name: "fullName",
		label: "Name",
		type: "text",
		placeholder: "Enter your full name",
	},
	{
		name: "email",
		label: "Email",
		type: "email",
		placeholder: "Enter your email",
	},
	{
		name: "password",
		label: "Password",
		type: "password",
		placeholder: "Enter your password",
	},
	{
		name: "phone",
		label: "Phone",
		type: "tel",
		placeholder: "Enter your phone number",
	},
	{
		name: "date_of_birth",
		label: "Date Of Birth",
		type: "date",
		placeholder: "Enter your date of birth",
	},
];
const loginFormFields = [
	{
		name: "email",
		label: "Email",
		type: "email",
		placeholder: "Enter your email",
	},
	{
		name: "password",
		label: "Password",
		type: "password",
		placeholder: "Enter your password",
	},
];

const businessFormFields = [
	{
		name: "name",
		label: "Name",
		type: "text",
		placeholder: "Enter your business name",
	},
	{
		name: "description",
		label: "description",
		placeholder: "Please describe what your business does",
	},
	{
		name: "location",
		label: "location",
		type: "text",
		placeholder: "Enter your address of your business",
	},
	{
		name: "logo",
		label: " Business Logo",
		type: "file",
		placeholder: "Enter your business logo",
	},
];

const socialLinkFormFields = [
	{
		name: "facebook",
		label: "Facebook",
		type: "url",
		placeholder: "Enter your Facebook Url",
	},
	{
		name: "linkedIn",
		label: "LinkedIn",
		type: "url",
		placeholder: "Enter your linkedin",
	},
	{
		name: "Instagram",
		label: "Instagram",
		type: "url",
		placeholder: "Enter your Instagram",
	},
];

const formFieldsProperty = {
	signupFormFields,
	businessFormFields,
	socialLinkFormFields,
	loginFormFields,
};

export default formFieldsProperty;
