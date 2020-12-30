import React, { useState, useEffect, memo } from "react";

export interface IProgressBarProps {
	percentCompletion: number;
	showTitle?: boolean;
	customTitle?: string;
	showPercentages?: boolean;
}

export default function ProgressBar({
	percentCompletion,
	showTitle = false,
	customTitle,
	showPercentages = false,
}: IProgressBarProps) {
	const [progressValue, setProgressValue] = useState(percentCompletion);
	const percentages = `${progressValue}%`;

	useEffect(() => {
		if (isNaN(percentCompletion) && typeof percentCompletion === "number") {
			const timer = setTimeout(() => {
				setProgressValue(percentCompletion);
			}, 300);

			return () => clearTimeout(timer);
		}
	}, []);

	useEffect(() => {
		if (progressValue !== percentCompletion) {
			setProgressValue(percentCompletion);
		}
	}, [percentCompletion]);

	return (
		<div className="progress-bar-wrapper">
			<div className="progress-bar-info">
				{showTitle && (
					<div className="title">
						<span>{customTitle || "OVERALL PROGRESS"}</span>
					</div>
				)}
				{showPercentages && (
					<span className="percentages">
						{progressValue ? progressValue.toFixed(2) : 0}%
					</span>
				)}
			</div>
			<div className="progress-bar">
				<div className="value" style={{ width: percentages }}></div>
			</div>
		</div>
	);
}
