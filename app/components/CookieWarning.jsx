import React, { useState } from "react";
import styled from "styled-components";

const CookieWarningWrapper = styled.div`
	background: #333;
	color: #fff;
	padding: 10px;
	text-align: center;
	display: ${(props) => (props.show ? "block" : "none")};
`;

const CookieWarning = () => {
	const [showWarning, setShowWarning] = useState(true);

	const handleClose = () => {
		setShowWarning(false);
	};

	return (
		<CookieWarningWrapper show={showWarning}>
			This website uses cookies to ensure you get the best experience on
			our website.{" "}
			<button className="btn btn-primary" onClick={handleClose}>
				OK
			</button>
		</CookieWarningWrapper>
	);
};

export default CookieWarning;
