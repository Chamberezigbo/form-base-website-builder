// LoadingSpinner.js
import React from "react";
import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
	return (
		<div className={styles.spinner}>
			<div className={styles.loader}></div>
		</div>
	);
}

export default LoadingSpinner;
