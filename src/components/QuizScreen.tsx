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

    const existingAnswer = answers.find(
        (a) => a.questionId === currentQuestion.id
    );

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const handleAnswerSelect = (answer: string) => {
        if (!isAnswerSubmitted) setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        if (!isAnswerSubmitted && selectedAnswer) {
            onAnswerSubmit(currentQuestion.id, selectedAnswer);
            setIsAnswerSubmitted(true);

            if (currentQuestionIndex === questions.length - 1) return;

            setTimeout(() => {
                setCurrentQuestionIndex((prev) => prev + 1);
                setSelectedAnswer(null);
                setIsAnswerSubmitted(false);
            }, 1000);
        } else if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setIsAnswerSubmitted(false);
        }
    };

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
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white p-6 font-semibold">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="mb-4">
                    <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-yellow-400 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-yellow-300 tracking-wide">
                        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                    </div>
                </div>

                <div className="bg-blue-800 rounded-lg p-6 shadow-2xl border-2 border-yellow-400">
                    <h2 className="text-2xl text-yellow-300 text-center font-bold mb-4">
                        {currentQuestion.question}
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {currentQuestion.allAnswers?.map((answer, index) => {
                        const isSelected = selectedAnswer === answer;
                        const isCorrect = isAnswerSubmitted && answer === currentQuestion.correctAnswer;
                        const isIncorrect = isAnswerSubmitted && isSelected && !isCorrect;

                        let buttonClasses = "py-4 px-6 rounded-xl border-2 text-lg transition-all duration-300 shadow-md ";

                        if (isSelected) {
                            if (isAnswerSubmitted) {
                                buttonClasses += isCorrect
                                    ? "bg-green-600 border-green-300 text-white"
                                    : "bg-red-600 border-red-300 text-white";
                            } else {
                                buttonClasses += "bg-yellow-500 border-yellow-300 text-black";
                            }
                        } else if (isAnswerSubmitted && isCorrect) {
                            buttonClasses += "bg-green-600 border-green-300 text-white";
                        } else {
                            buttonClasses += "bg-blue-950 border-blue-700 hover:bg-blue-800";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(answer)}
                                className={`${buttonClasses} flex items-center gap-4`}
                                disabled={isAnswerSubmitted}
                            >
                                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-yellow-400 text-yellow-300 font-bold">
                                    {String.fromCharCode(65 + index)}
                                </span>
                                <span className="flex-1 text-left">{answer}</span>
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className={`w-full py-3 mt-6 rounded-lg text-xl font-bold transition-all duration-300 
                        ${selectedAnswer
                            ? "bg-yellow-400 text-black hover:bg-yellow-300"
                            : "bg-gray-500 text-gray-300 cursor-not-allowed"
                        }`}
                >
                    {isAnswerSubmitted
                        ? isLastQuestion
                            ? "See Results"
                            : "Next Question"
                        : "Lock Kiya Jaye?"}
                </button>
            </div>
        </div>
    );
}
