import React, { useRef, useEffect } from "react";

import { IFormContext } from "./FormScreen";
import { IScreenAnimationConfig } from "../master-screen/MasterScreen";

import Button, { ButtonType } from "../../../components/buttons/Button";
import RouteButton from "../../../components/buttons/route-button/RouteButton";
import useFormManager from "../../../hooks/useFormManager";
import useViewManager from "../../../hooks/useViewManager";
import MessageContainer from "../../../components/message-container/MessageContainer";
import { AppAnimation } from "../../../interfaces/walkme-app/walkmeApp.interface";
import { config } from "../../../config";

interface IFormFooterProps {
	onSubmitted: (CTATargetLink: string) => void;
	animationConfig: IScreenAnimationConfig;
}

export default function FormFooter({
	props,
	formContext,
}: {
	props: IFormFooterProps;
	formContext: IFormContext;
}) {
	const formFooter = useRef<HTMLDivElement>(null);
	const formCTA = useRef<HTMLDivElement>(null);
	const { onSubmitted, animationConfig } = props;
	const { showExplanationOnSubmit, showResultsOnSubmit } = config;
	const {
		selectedAnswers,
		submitted,
		questionsLength,
		currentRouteId,
		loading,
		currentQuestion: { explanation },
	} = formContext;

	const { calculateScore, isCorrectAnswers } = useFormManager(formContext);
	const { animateCoreElements } = useViewManager();

	const isLastQuestion = currentRouteId >= questionsLength;
	const formCTALabel = isLastQuestion ? "Finish" : "Next";

	const formCTATargetLink = isLastQuestion
		? `/summary/${calculateScore()}`
		: `/form/${currentRouteId + 1}/${calculateScore()}`;

	useEffect(() => {
		if (formCTA.current) {
			animateCoreElements({
				elements: [formCTA.current],
				animateClassName: AppAnimation.FadeInUp,
				timeout: 3200,
				remove: true,
			});
		}
	}, [submitted]);

	useEffect(() => {
		if (formFooter.current) {
			animateCoreElements({
				elements: [formFooter.current],
				animateClassName: AppAnimation.FadeInUp,
				timeout: animationConfig.footer,
			});
		}
	}, []);

	return (
		<footer ref={formFooter} className="form-footer">
			{submitted ? (
				<>
					{showResultsOnSubmit && (
						<RouteButton
							linkTo={formCTATargetLink}
							id="form-action"
							buttonType={ButtonType.Default}
							label={formCTALabel}
						/>
					)}
					{showExplanationOnSubmit && explanation && (
						<MessageContainer
							className="explanation"
							subTitle="Explanation"
							message={explanation}
							animateConfig={{
								animateClass: AppAnimation.FadeInDown,
								timeout: 300,
							}}
						/>
					)}
				</>
			) : (
				<Button
					id="form-submit"
					tmButtonType={ButtonType.Default}
					buttonClicked={() =>
						onSubmitted(!showResultsOnSubmit && formCTATargetLink)
					}
					disabled={!Boolean(selectedAnswers.length)}
					loading={loading}
				>
					<span className="btn-label">
						{config.showResultsOnSubmit ? "Submit" : "Next"}
					</span>
				</Button>
			)}
		</footer>
	);
}
