import React, { useState } from "react";
import styled from "styled-components";

const CookieWarningWrapper = styled.div`
	background: #333;
	color: #fff;
	padding: 10px;
	text-align: center;
	display: block; // Always set to block
`;

const CookieWarning = () => {
	const [showWarning, setShowWarning] = useState(true);

	const handleClose = () => {
		setShowWarning(false);
	};

	// Use conditional rendering to render the component only when showWarning is true
	return showWarning ? (
		<CookieWarningWrapper>
			This website uses cookies to ensure you get the best experience on
			our website. <br />
			<button className="btn btn-primary mt-2" onClick={handleClose}>
				OK
			</button>
		</CookieWarningWrapper>
	) : null;
};

export default CookieWarning;
