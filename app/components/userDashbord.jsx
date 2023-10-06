import { useState } from "react";
import styles from "./dashboard.module.css";
import {
	BsFacebook,
	BsWhatsapp,
	BsFillTelephoneOutboundFill,
} from "react-icons/bs";
import { BiLogoInstagramAlt, BiLogoTiktok } from "react-icons/bi";

const Dashboard = ({ data }) => {
	const [isCopied, setIsCopied] = useState(false);

	// Function to handle copying text to clipboard
	const handleCopyText = () => {
		const textToCopy = data.user.full_name;
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => setIsCopied(true))
			.catch((error) => console.error("Error copying text: ", error));
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
					<div className="col-lg-12 mt-3">
						<div className="card">
							<div className="card-body d-flex">
								<span className="social-icons">
									<BsFacebook className="icon" />
									<BiLogoInstagramAlt className="icon" />
									<BiLogoTiktok className="icon" />
									<BsWhatsapp className="icon" />
								</span>
								<div className="mt-2 ms-5">
									<div
										className={`copiable-content ${
											isCopied ? "copied" : ""
										}`}
										onClick={handleCopyText}
									>
										{data.user.full_name}
									</div>
									{isCopied && (
										<span className="copy-feedback">
											Copied!
										</span>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="phone-icon">
				<a href={`tel:+${data.user.phone}`}>
					<BsFillTelephoneOutboundFill className="phoneIcon" />
				</a>
			</div>
		</section>
	);
};

export default Dashboard;
