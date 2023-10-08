import { useState } from "react";
import styles from "./dashboard.module.css";
import { BiLinkAlt } from "react-icons/bi";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";

const Dashboard = ({ data }) => {
	const [copied, setCopied] = useState(false);

	// Function to handle copying the text
	const copyText = () => {
		const nameToCopy = `formcraft.thetekpreneurs.com/dashboard/${data.user.user_id}`;

		// Create a temporary input element
		const tempInput = document.createElement("input");
		tempInput.value = nameToCopy;
		document.body.appendChild(tempInput);

		// Select the text in the input element
		tempInput.select();
		tempInput.setSelectionRange(0, 99999); // For mobile devices

		// Copy the text to the clipboard
		document.execCommand("copy");

		// Remove the temporary input element
		document.body.removeChild(tempInput);

		// Set the copied state to true to provide feedback
		setCopied(true);
	};

	return (
		<section className={styles.section}>
			<div className="container my-5 d-flex justify-content-center align-items-center">
				<div className="row">
					<div className="col-lg-12">
						<div className="text-center">
							<img
								src={`https://apis.thetekpreneurs.com/api-endpoint/${data.user.logo}`}
								className="logo"
								width={90}
							/>
							<h1 className={styles.h1}>{data.user.name}</h1>
							<h5>{data.user.description}</h5>
						</div>
					</div>
					<div className="col-lg-9 mt-3 mx-auto">
						<div className="card">
							<div className="card-body d-flex">
								<span className="social-icons">
									<BiLinkAlt
										className="icon"
										onClick={copyText}
									/>
								</span>
								<div className="mx-auto">
									<span
										className={`copyable ${
											copied ? "copied" : ""
										}`}
										onClick={copyText}
									>
										formcraft.thetekpreneurs.com/dashboard/
										{data.user.user_id}
									</span>
								</div>
							</div>
						</div>
						<p className="text-center">
							copy your link to potential client
						</p>
					</div>
				</div>
			</div>
			{/* <div className="phone-icon">
				<a href={`tel:+${data.user.phone}`}>
					<BsFillTelephoneOutboundFill className="phoneIcon" />
				</a>
			</div> */}
		</section>
	);
};

export default Dashboard;
