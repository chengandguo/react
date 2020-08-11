import React from "react";
import styles from "./index.module.scss";


export default function () {
	return (
		<div className="counter">
			<div className={styles.row}>
				<div>decrement 1</div>
				<div>10</div>
				<div>increment 1</div>
			</div>
		</div>
	);
}