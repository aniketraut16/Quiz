"use client";

import { useState } from "react";
import DataGatheringScreen from "@/components/DataGatheringScreen";
import QuizScreen from "@/components/QuizScreen";
import ResultsScreen from "@/components/ResultsScreen";
import getQuestions from "@/utility/questions";

type QuizState = {
    currentScreen: "dataGathering" | "quiz" | "results";
    name: string;
    numberOfQuestions: number;
    category: string;
    questions: Question[];
    answers: Answer[];
    score: number;
};

export type Question = {
    id: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    allAnswers?: string[];
};

export type Answer = {
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
};

export type Category = {
    id: string;
    name: string;
};

export default function Quiz() {
    const [state, setState] = useState<QuizState>({
        currentScreen: "dataGathering",
        name: "",
        numberOfQuestions: 5,
        category: "",
        questions: [],
        answers: [],
        score: 0,
    });

    const handleStartQuiz = async (name: string, numberOfQuestions: number, category: string) => {
        try {
            // Update state with user data
            setState({
                ...state,
                name,
                numberOfQuestions,
                category,
                currentScreen: "quiz",
            });
            const data = getQuestions(category, numberOfQuestions);

            // Process the questions to include all answers in a randomized array
            const processedQuestions = data.map((q: any) => {
                const correctAnswer = q.correctAnswer;
                const incorrectAnswers = q.incorrectAnswers || [];
                const allAnswers = [...incorrectAnswers, correctAnswer].sort(
                    () => Math.random() - 0.5
                );

                return {
                    id: q.id,
                    question: q.question.text,
                    correctAnswer,
                    incorrectAnswers,
                    allAnswers,
                };
            });

            // Update state with fetched questions
            setState((prevState) => ({
                ...prevState,
                questions: processedQuestions,
            }));
        } catch (error) {
            console.error("Error starting quiz:", error);
            // Handle error (could show an error message to the user)
        }
    };

    const handleAnswerSubmit = (questionId: string, selectedAnswer: string) => {
        const question = state.questions.find((q) => q.id === questionId);

        if (!question) return;

        const isCorrect = selectedAnswer === question.correctAnswer;

        const newAnswer: Answer = {
            questionId,
            selectedAnswer,
            isCorrect,
        };

        // Check if this question was already answered
        const updatedAnswers = [...state.answers];
        const existingAnswerIndex = updatedAnswers.findIndex(
            (a) => a.questionId === questionId
        );

        if (existingAnswerIndex !== -1) {
            // Update existing answer
            updatedAnswers[existingAnswerIndex] = newAnswer;
        } else {
            // Add new answer
            updatedAnswers.push(newAnswer);
        }

        // Check if all questions have been answered
        if (updatedAnswers.length === state.questions.length) {
            // Calculate score
            const score = updatedAnswers.filter((a) => a.isCorrect).length;

            // Move to results screen
            setState({
                ...state,
                answers: updatedAnswers,
                score,
                currentScreen: "results",
            });
        } else {
            // Just update answers
            setState({
                ...state,
                answers: updatedAnswers,
            });
        }
    };

    const handleRestartQuiz = () => {
        setState({
            currentScreen: "dataGathering",
            name: "",
            numberOfQuestions: 5,
            category: "",
            questions: [],
            answers: [],
            score: 0,
        });
    };

    return (
        <div className="bg-white shadow-lg overflow-hidden transition-all">
            {state.currentScreen === "dataGathering" && (
                <DataGatheringScreen onStart={handleStartQuiz} />
            )}

            {state.currentScreen === "quiz" && state.questions.length > 0 && (
                <QuizScreen
                    questions={state.questions}
                    answers={state.answers}
                    onAnswerSubmit={handleAnswerSubmit}
                />
            )}

            {state.currentScreen === "results" && (
                <ResultsScreen
                    name={state.name}
                    score={state.score}
                    totalQuestions={state.numberOfQuestions}
                    onRestart={handleRestartQuiz}
                />
            )}
        </div>
    );
} 