export type Question = {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: {
    text: string;
  };
  tags: string[];
  type: string;
  difficulty: string;
  regions: string[];
  isNiche: boolean;
};

import questionsData from "./questionsData.json";

const getQuestions = (category: string, numberOfQuestions: number) => {
  let filteredQuestions: Question[] = [];
  if (category === "any") {
    filteredQuestions = questionsData;
  } else {
    filteredQuestions = questionsData.filter(
      (question: Question) => question.category === category
    );
  }
  return filteredQuestions.slice(0, numberOfQuestions);
};

export default getQuestions;
