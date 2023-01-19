import { Router } from "express"
import { container } from "tsyringe";

import { SubmitFeedbackUseCase } from "./useCases/SubmitFeedbackUseCase";

export const routes = Router();

routes.post('/feedback', async (req, res) => {
  const { comment, screenshot, type } = req.body;

  const submitFeedbackUseCase = container.resolve(SubmitFeedbackUseCase);

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).send();
})
