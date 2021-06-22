import React from "react";

export default function FilterOrder(props) {
	const statusList = [
		"all",
		"active",
		"pending",
		"cancelled",
		"declined",
		"ready",
		"received",
		"fulfilled",
	];
	return (
		<div className="filter">
			<div className="Filter Status">
				<b>Filter &nbsp;</b>
				<select
					style={{ width: "130px", height: "20px" }}
					val={statusList}
					onChange={props.changeFilter}
				>
					<option value="active">ACTIVE</option>
					<option value="all">ALL</option>
					<option value="cancelled">CANCELLED</option>
					<option value="declined">DECLINED</option>
					<option value="pending">PENDING</option>
					<option value="received">RECEIVED</option>
					<option value="ready">READY</option>
					<option value="fulfilled">COMPLETE</option>
				</select>
			</div>
		</div>
	);
}
