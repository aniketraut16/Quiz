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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("https://the-trivia-api.com/v2/categories");

                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }

                const data = await response.json();

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
        <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
                Welcome to the Quiz App!
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-50 p-4 rounded-md border border-red-200">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="questions" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Questions
                    </label>
                    <select
                        id="questions"
                        value={numberOfQuestions}
                        onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        {[5, 10, 15, 20].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isLoading}
                    >
                        <option value="any">Any Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {isLoading && <p className="mt-1 text-sm text-gray-500">Loading categories...</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Start Quiz
                </button>
            </form>
        </div>
    );
} 