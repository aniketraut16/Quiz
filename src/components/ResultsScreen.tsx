"use client";

type ResultsScreenProps = {
    name: string;
    score: number;
    totalQuestions: number;
    onRestart: () => void;
};

export default function ResultsScreen({
    name,
    score,
    totalQuestions,
    onRestart,
}: ResultsScreenProps) {
    // Calculate percentage score
    const percentage = Math.round((score / totalQuestions) * 100);

    // Determine feedback message based on score
    let feedbackMessage = "";
    let emoji = "";

    if (percentage >= 90) {
        feedbackMessage = "Outstanding! You're a quiz master!";
        emoji = "🏆";
    } else if (percentage >= 70) {
        feedbackMessage = "Great job! You know your stuff!";
        emoji = "🎉";
    } else if (percentage >= 50) {
        feedbackMessage = "Good effort! Keep learning!";
        emoji = "👍";
    } else if (percentage >= 30) {
        feedbackMessage = "Nice try! You'll do better next time!";
        emoji = "🌱";
    } else {
        feedbackMessage = "Don't worry, we all start somewhere!";
        emoji = "💪";
    }

    return (
        <div className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-6 text-indigo-600">Quiz Results</h1>

            <div className="mb-8">
                <div className="text-6xl mb-4">{emoji}</div>
                <h2 className="text-2xl font-semibold mb-2">
                    {name ? `Great effort, ${name}!` : "Great effort!"}
                </h2>
                <p className="text-gray-600 mb-6">{feedbackMessage}</p>

                <div className="flex justify-center mb-4">
                    <div className="relative w-40 h-40">
                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                            <div className="text-3xl font-bold">{percentage}%</div>
                        </div>
                        <div
                            className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-indigo-500"
                            style={{
                                clipPath: `polygon(50% 50%, 50% 0%, ${percentage >= 12.5 ? '100% 0%' : `${50 + percentage * 4}% 0%`}${percentage >= 25 ? ', 100% 100%' : ''
                                    }${percentage >= 37.5 ? ', 0% 100%' : ''
                                    }${percentage >= 50 ? ', 0% 0%' : ''
                                    })`
                            }}
                        ></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 inline-block">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Questions answered:</span>
                        <span className="font-semibold">{totalQuestions}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Correct answers:</span>
                        <span className="font-semibold text-green-600">{score}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Incorrect answers:</span>
                        <span className="font-semibold text-red-600">{totalQuestions - score}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={onRestart}
                className="bg-indigo-600 text-white py-3 px-8 rounded-md hover:bg-indigo-700 transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Start New Quiz
            </button>
        </div>
    );
} 