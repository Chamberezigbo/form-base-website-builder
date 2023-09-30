import React from "react";
import withAuth from "../utils/withAuth";

function page() {
	return (
		<div>
			<h1>Hello</h1>
		</div>
	);
}

export default withAuth(page);
