import React, { useContext, useState, useEffect, useRef } from "react";

import { ScreenType } from "../../../interfaces/screen/screen.interface";
import MasterScreen from "../master-screen/MasterScreen";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { AppContext } from "../../../App";
import {
	IFormQuestionBE,
	IFormAnswerBE,
} from "../../../interfaces/form/form.interface";

import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import Form from "./Form";
import useFormManager from "../../../hooks/useFormManager";
import Confetti from "react-dom-confetti";
import { config } from "../../../config";

type FormParams = { id: string; score: string };

const formAnimationConfig = {
	topSection: 300,
	options: 600,
	footer: 900,
};

export interface IFormScreenProps extends RouteComponentProps<FormParams> {}

export interface IFormContext {
	currentRouteId: number;
	currentIndex: number;
	currentQuestion: IFormQuestionBE;
	questionsLength: number;
	submitted?: boolean;
	loading?: boolean;
	selectedAnswers?: IFormAnswerBE[];
	currentScore?: number;
	selectedIndexes?: number[];
}

const confettiConfig = {
	angle: 270,
	spread: 160,
	dragFriction: 0.1,
	startVelocity: 15,
	duration: 1500,
	stagger: 5,
	colors: ["#348bd8", "#1F569D", "#89d1ef", "#348bd8", "#ACD2ED"],
};

export default function FormScreen(props?: IFormScreenProps) {
	const { appState, setAppState } = useContext(AppContext);
	const {
		data: { questions },
	} = appState.formSDK;
	const { successConfetti, showResultsOnSubmit } = config;
	const routeHistory = useHistory();
	const { id, score } = props.match.params;
	const [selectedAnswers, setSelectedAnswers] = useState([] as IFormAnswerBE[]);
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	const currentRouteId = parseInt(id);
	const currentIndex = currentRouteId - 1;
	const currentQuestion = questions[currentIndex];
	const currentScore = score ? parseInt(score) : 0;

	const formGlobals = {
		currentRouteId,
		currentIndex,
		currentScore,
		currentQuestion,
		questionsLength: questions.length,
		selectedAnswers,
		submitted,
		loading,
	};

	const { calculateCompletion, isCorrectAnswers } = useFormManager(formGlobals);
	const [percentCompletion, setPercentCompletion] = useState(
		calculateCompletion(),
	);

	const form = {
		...formGlobals,
		percentCompletion,
	};

	const [formData, setFormData] = useState(form);

	const getSelectedAnswersId = () => {
		return selectedAnswers.map((selected) => selected.id);
	};

	const handleSubmitted = (CTATargetLink?: string) => {
		appState.formSDK.submit(currentQuestion.id, getSelectedAnswersId());
		console.log("CTATargetLink ", CTATargetLink);
		/**
		 * fake loading button
		 * Preparation for future asynchronous behavior
		 */
		setLoading(true);
		setTimeout(() => {
			setSubmitted(true);
			setLoading(false);
			CTATargetLink && routeHistory.push(CTATargetLink);
		}, 500);
	};

	const handleSelected = (selected: IFormAnswerBE[]) => {
		setSelectedAnswers(selected);
	};

	/** reset form */
	useEffect(() => {
		setSubmitted(false);
		setSelectedAnswers([]);
	}, [id, score]);

	/** updating data when each of dependencies change */
	useEffect(() => {
		setFormData(form);
		setPercentCompletion(calculateCompletion());

		setAppState({
			...appState,
			percentCompletion: calculateCompletion(),
		});

		if (submitted && currentQuestion.explanation) {
			const explanationContainer = scrollRef.current.querySelector(
				".explanation",
			);
			if (explanationContainer) {
				explanationContainer.scrollIntoView({
					behavior: "smooth",
					block: "end",
				});
			}
		}
	}, [id, selectedAnswers, submitted, loading]);

	return (
		<MasterScreen
			isAnimatedScreen
			type={ScreenType.Form}
			header={<FormHeader {...formData} />}
			scrollForwardedRef={scrollRef}
		>
			<>
				{showResultsOnSubmit && successConfetti && (
					<div className="confetti-container">
						<Confetti
							active={submitted && isCorrectAnswers()}
							config={confettiConfig}
						/>
					</div>
				)}
				<Form
					formContext={formData}
					props={{
						onSelected: handleSelected,
						animationConfig: formAnimationConfig,
					}}
				/>
				<FormFooter
					formContext={formData}
					props={{
						onSubmitted: (CTATargetLink?: string) =>
							handleSubmitted(CTATargetLink),
						animationConfig: formAnimationConfig,
					}}
				/>
			</>
		</MasterScreen>
	);
}
