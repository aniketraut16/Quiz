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
    const percentage = Math.round((score / totalQuestions) * 100);

    let feedbackMessage = "";
    let emoji = "";

    if (percentage >= 90) {
        feedbackMessage = "Shandar! Aap ban gaye Crorepati!";
        emoji = "🏆";
    } else if (percentage >= 70) {
        feedbackMessage = "Bahut badiya! KBC champ material!";
        emoji = "🎉";
    } else if (percentage >= 50) {
        feedbackMessage = "Accha khela! Agli baar aur behtar!";
        emoji = "👍";
    } else if (percentage >= 30) {
        feedbackMessage = "Thoda aur mehnat karein! Potential hai!";
        emoji = "🌱";
    } else {
        feedbackMessage = "Koshish jaari rakhiye, safalta zaroor milegi!";
        emoji = "💪";
    }

    return (
        <div className="p-8 text-center bg-gradient-to-br from-[#0a1e40] to-[#091634] min-h-screen text-gold font-sans">
            <h1 className="text-4xl font-extrabold mb-6 text-gold drop-shadow-[0_0_5px_gold]">
                🎯 Final Results
            </h1>

            <div className="mb-8">
                <div className="text-6xl mb-4">{emoji}</div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    {name ? `Well played, ${name}!` : "Well played!"}
                </h2>
                <p className="text-lg text-gold opacity-90 mb-6">
                    {feedbackMessage}
                </p>

                <div className="flex justify-center mb-6">
                    <div className="relative w-44 h-44 rounded-full bg-[#0e2559] border-8 border-gold flex items-center justify-center shadow-inner">
                        <span className="text-3xl font-bold text-gold">{percentage}%</span>
                        <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-gold opacity-20 animate-pulse"></div>
                    </div>
                </div>

                <div className="bg-[#122b56] p-6 rounded-lg shadow-lg border border-gold text-white inline-block w-72">
                    <div className="flex justify-between mb-3 text-lg">
                        <span>Questions:</span>
                        <span className="font-bold text-gold">{totalQuestions}</span>
                    </div>
                    <div className="flex justify-between mb-3 text-lg">
                        <span>Correct:</span>
                        <span className="font-bold text-green-400">{score}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                        <span>Incorrect:</span>
                        <span className="font-bold text-red-400">{totalQuestions - score}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={onRestart}
                className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-[#0a1e40] py-3 px-8 rounded-md hover:from-yellow-400 hover:to-yellow-500 transition duration-300 font-bold text-lg mt-4 shadow-md"
            >
                🔄 Play Again
            </button>
        </div>
    );
}
