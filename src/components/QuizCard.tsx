import React from 'react';

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNr: number;
  totalQuestions: number;
};

const QuizCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <div>
    <p>
      Question: {questionNr} / {totalQuestions}
    </p>
    <p
      dangerouslySetInnerHTML={{ __html: question }}
      className="text-xl font-semibold  py-4"
    />
    <div className="bg-slate-300 p-4 rounded-lg">
      {answers.map((answer) => (
        <div key={answer} className="w-full">
          <button
            disabled={userAnswer}
            value={answer}
            onClick={callback}
            className="bg-slate-50 w-full px-2 py-2 rounded-lg mb-2 text-left hover:bg-slate-200 transition"
          >
            <p dangerouslySetInnerHTML={{ __html: answer }} className="" />
          </button>
        </div>
      ))}
    </div>
  </div>
);
export default QuizCard;
