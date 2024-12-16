"use client";

import { useState, useEffect } from "react";
import { Question, Answer } from "./Quiz";

type QuizScreenProps = {
    questions: Question[];
    answers: Answer[];
    onAnswerSubmit: (questionId: string, selectedAnswer: string) => void;
};

export default function QuizScreen({ questions, answers, onAnswerSubmit }: QuizScreenProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    // Find if this question already has an answer
    const existingAnswer = answers.find(
        (a) => a.questionId === currentQuestion.id
    );

    // Track progress
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const handleAnswerSelect = (answer: string) => {
        if (!isAnswerSubmitted) {
            setSelectedAnswer(answer);
        }
    };

    const handleNextQuestion = () => {
        // Submit the answer if not already submitted
        if (!isAnswerSubmitted && selectedAnswer) {
            onAnswerSubmit(currentQuestion.id, selectedAnswer);
            setIsAnswerSubmitted(true);

            // If this is the last question, we don't navigate to the next one
            if (currentQuestionIndex === questions.length - 1) {
                return;
            }

            // Short delay before moving to the next question
            setTimeout(() => {
                setCurrentQuestionIndex((prev) => prev + 1);
                setSelectedAnswer(null);
                setIsAnswerSubmitted(false);
            }, 1000);
        } else if (currentQuestionIndex < questions.length - 1) {
            // If already submitted, just move to the next question
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setIsAnswerSubmitted(false);
        }
    };

    // Handle case where we already have an answer for this question
    useEffect(() => {
        if (existingAnswer) {
            setSelectedAnswer(existingAnswer.selectedAnswer);
            setIsAnswerSubmitted(true);
        } else {
            setSelectedAnswer(null);
            setIsAnswerSubmitted(false);
        }
    }, [currentQuestionIndex, existingAnswer]);

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <div className="p-8">
            <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {currentQuestion.question}
                </h2>
            </div>

            <div className="space-y-3 mb-8">
                {currentQuestion.allAnswers?.map((answer, index) => {
                    const isSelected = selectedAnswer === answer;
                    const isCorrect = isAnswerSubmitted && answer === currentQuestion.correctAnswer;
                    const isIncorrect = isAnswerSubmitted && isSelected && !isCorrect;

                    let buttonClasses = "w-full text-left p-4 rounded-md border transition-all duration-200 ";

                    if (isSelected) {
                        buttonClasses += isAnswerSubmitted
                            ? isCorrect
                                ? "bg-green-100 border-green-400 text-green-800 "
                                : "bg-red-100 border-red-400 text-red-800 "
                            : "bg-indigo-100 border-indigo-400 text-indigo-800 ";
                    } else if (isAnswerSubmitted && isCorrect) {
                        buttonClasses += "bg-green-100 border-green-400 text-green-800 ";
                    } else {
                        buttonClasses += "bg-white border-gray-300 text-gray-800 hover:bg-gray-50 ";
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(answer)}
                            className={buttonClasses}
                            disabled={isAnswerSubmitted}
                        >
                            <div className="flex items-center">
                                <span className="w-6 h-6 flex items-center justify-center rounded-full border border-current mr-3">
                                    {String.fromCharCode(65 + index)}
                                </span>
                                <span>{answer}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            <button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className={`w-full py-3 px-4 rounded-md transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${selectedAnswer
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                {isAnswerSubmitted
                    ? isLastQuestion
                        ? "See Results"
                        : "Next Question"
                    : "Submit Answer"}
            </button>
        </div>
    );
} 