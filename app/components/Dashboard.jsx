import React from "react";
import styles from "./dashboard.module.css";
import {
	BsFacebook,
	BsWhatsapp,
	BsFillTelephoneOutboundFill,
} from "react-icons/bs";
import { BiLogoInstagramAlt, BiLogoTiktok } from "react-icons/bi";

const Dashboard = ({ data }) => {
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
					<div className="col-lg-6 mt-3">
						<a
							href={data.user.facebook}
							target="_blank"
							rel="Social link"
						>
							<div className="card">
								<div className="card-body d-flex">
									<span className="social-icons">
										<BsFacebook className="icon" />
										<BiLogoInstagramAlt className="icon" />
										<BiLogoTiktok className="icon" />
										<BsWhatsapp className="icon" />
									</span>
									<div className="mt-2 ms-5">
										{data.user.full_name}
									</div>
								</div>
							</div>
						</a>
					</div>

					<div className="col-lg-6 mt-3">
						<a
							href={data.user.linkedIn}
							rel="Social Link"
							target="_blank"
						>
							<div className="card">
								<div className="card-body d-flex">
									<span className="social-icons">
										<BsFacebook className="icon" />
										<BiLogoInstagramAlt className="icon" />
										<BiLogoTiktok className="icon" />
										<BsWhatsapp className="icon" />
									</span>
									<div className="mt-2 ms-5">
										{data.user.full_name}
									</div>
								</div>
							</div>
						</a>
					</div>
					<div className="col-lg-6 mt-3">
						<a
							href={data.user.Instagram}
							target="_blank"
							rel="Social link"
						>
							<div className="card">
								<div className="card-body d-flex">
									<span className="social-icons">
										<BsFacebook className="icon" />
										<BiLogoInstagramAlt className="icon" />
										<BiLogoTiktok className="icon" />
										<BsWhatsapp className="icon" />
									</span>
									<div className="mt-2 ms-5">
										{data.user.full_name}
									</div>
								</div>
							</div>
						</a>
					</div>
					<div className="col-lg-6 mt-3">
						<a
							href={`mailto:${data.user.email}`}
							target="_blank"
							rel="Email Address"
						>
							<div className="card">
								<div className="card-body d-flex">
									<span className="social-icons">
										<BsFacebook className="icon" />
										<BiLogoInstagramAlt className="icon" />
										<BiLogoTiktok className="icon" />
										<BsWhatsapp className="icon" />
									</span>
									<div className="mt-2 ms-5">
										{data.user.full_name} Email
									</div>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
			<div className="phone-icon text-light">
				<a href={`tel:+${data.user.phone}`}>
					<BsFillTelephoneOutboundFill className="phoneIcon" />
				</a>
			</div>
		</section>
	);
};

export default Dashboard;
