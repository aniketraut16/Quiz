"use client";

import { useState, useEffect } from "react";
import { Category } from "./Quiz";

type DataGatheringScreenProps = {
    onStart: (name: string, numberOfQuestions: number, category: string) => void;
};

export default function DataGatheringScreen({ onStart }: DataGatheringScreenProps) {
    const [name, setName] = useState("");
    const [numberOfQuestions, setNumberOfQuestions] = useState(5);
    const [category, setCategory] = useState("any");
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true);

                const data = [
                    "arts_and_literature",
                    "film_and_tv",
                    "food_and_drink",
                    "general_knowledge",
                    "geography",
                    "history",
                    "music",
                    "science",
                    "society_and_culture",
                    "sport_and_leisure"
                ];

                // Convert the category object into an array of categories
                const categoryArray = Object.entries(data).map(([id, name]) => ({
                    id,
                    name: Array.isArray(name) ? name[0] : name as string,
                }));

                setCategories(categoryArray);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError("Failed to load categories. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();

        // Add entrance animation
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Please enter your name");
            return;
        }

        onStart(name, numberOfQuestions, category);
    };

    return (
        <div className={`min-h-screen bg-[#0a1744] flex items-center justify-center p-4 ${isAnimating ? 'animate-fadeIn' : ''}`}>
            {/* KBC-style light beams */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 animate-slow-spin">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-1/2 left-1/2 h-full w-4 -translate-x-1/2 origin-bottom bg-gradient-to-t from-transparent to-blue-500/20"
                            style={{ transform: `translateX(-50%) rotate(${i * 30}deg)` }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Main content */}
            <div className="w-full max-w-md bg-[#0d1e56]/90 backdrop-blur-md rounded-lg shadow-[0_0_30px_rgba(0,100,255,0.3)] overflow-hidden border border-blue-500/30 z-10">
                <div className="bg-gradient-to-r from-[#0d1e56] via-[#1a3a8f] to-[#0d1e56] p-6 text-center border-b border-blue-500/30">
                    <h1 className="text-4xl font-extrabold text-[#ffcb05] mb-2 animate-pulse tracking-wider">
                        QUIZ MASTER
                    </h1>
                    <p className="text-blue-200 text-sm">Aapka Intezaar Khatam Hua</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/30">
                            <p className="text-red-300 text-center font-medium">{error}</p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-bold text-blue-300 uppercase tracking-wider">
                            Contestant Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-[#0a1744] border border-blue-500/30 rounded-lg text-white placeholder-blue-300/50 focus:ring-2 focus:ring-[#ffcb05] focus:border-transparent transition-all duration-300"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="questions" className="block text-sm font-bold text-blue-300 uppercase tracking-wider">
                            Number of Questions
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {[5, 10, 15, 20].map((num) => (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => setNumberOfQuestions(num)}
                                    className={`py-3 rounded-lg text-center transition-all duration-300 ${numberOfQuestions === num
                                        ? "bg-[#ffcb05] text-[#0a1744] font-bold"
                                        : "bg-[#0a1744] text-blue-300 border border-blue-500/30 hover:bg-blue-900/30"
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="category" className="block text-sm font-bold text-blue-300 uppercase tracking-wider">
                            Select Your Topic
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-[#0a1744] border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-[#ffcb05] focus:border-transparent transition-all duration-300"
                            disabled={isLoading}
                        >
                            <option value="any">Any Topic</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {isLoading && (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-t-2 border-[#ffcb05] rounded-full animate-spin"></div>
                                <p className="ml-2 text-sm text-blue-300">Loading topics...</p>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#ffcb05] text-[#0a1744] py-4 px-6 rounded-lg hover:bg-yellow-400 transition-all duration-300 font-bold text-lg uppercase tracking-wider shadow-[0_0_15px_rgba(255,203,5,0.5)] transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ffcb05] focus:ring-offset-2 focus:ring-offset-[#0a1744]"
                    >
                        Lock Kiya Jaye?
                    </button>
                </form>

                <div className="px-6 pb-6 text-center">
                    <p className="text-blue-300 text-xs">Hot Seat par aapka swagat hai!</p>
                </div>
            </div>

            {/* KBC-style logo in background */}
            <div className="absolute bottom-4 right-4 text-xs text-blue-500/50">
                Quiz Master &copy; 2023
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes slow-spin {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
                .animate-slow-spin {
                    animation: slow-spin 120s linear infinite;
                }
            `}</style>
        </div>
    );
} 