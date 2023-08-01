import React from "react";
import { DiAptana } from "react-icons/di";

const DynamicForm = ({
	formTitle,
	formFields,
	onChange,
	onSubmit,
	loading,
	fileInputRef,
}) => {
	return (
		<div className="container">
			<div className="row justify-content-center mt-0 mt-md-5">
				<div className="col-md-6">
					<h1 className="text-center">{formTitle}</h1>
					<form onSubmit={onSubmit}>
						{formFields.map((field) => (
							<div className="mb-3" key={field.name}>
								<label
									htmlFor={field.name}
									className="form-label"
								>
									{field.label}
								</label>
								{/* Conditional rendering for file input */}
								{field.type === "file" ? (
									<input
										type="file"
										className="form-control"
										id={field.name}
										name={field.name}
										onChange={onChange}
										accept="image/*"
										ref={fileInputRef}
									/>
								) : (
									<input
										type={field.type}
										className="form-control border-top-0 border-end-0 border-start-0"
										id={field.name}
										name={field.name}
										placeholder={field.placeholder}
										onChange={onChange}
										value={field.value}
									/>
								)}
							</div>
						))}
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
	);
};

export default DynamicForm;
