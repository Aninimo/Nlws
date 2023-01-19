import { useState } from "react";

import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "Imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: "Imagem de um balão de pensamento",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <div
      className="
        bg-zinc-900 p-4 relative rounded-2xl
        flex flex-col items-center shadow-lg
        w-[calc(100vw-2rem)] md:w-auto
      "
    >
      {/* eslint-disable-next-line no-nested-ternary */}
      {feedbackSent ? (
        <FeedbackSuccessStep
          // eslint-disable-next-line react/jsx-no-bind
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : !feedbackType ? (
        <FeedbackTypeStep onFeedbackTypeChange={setFeedbackType} />
      ) : (
        <FeedbackContentStep
          feedbackType={feedbackType}
          // eslint-disable-next-line react/jsx-no-bind
          onFeedbackRestartRequested={handleRestartFeedback}
          onFeedbackSent={() => setFeedbackSent(true)}
        />
      )}
      <footer>
        Feito com 🤍 pela{" "}
        <a
          className="underline underline-offset-2"
          href="https://rocketseat.com.br"
        >
          RocketSeat
        </a>
      </footer>
    </div>
  );
}
