import { container } from "tsyringe";

import { FeedbackRepository } from "../../repositories/FeedbackRepository";
import { PrismaFeedbackRepository } from "../../repositories/prisma/PrismaFeedbackRepository";

container.registerSingleton<FeedbackRepository>(
  "FeedbackRepository",
  PrismaFeedbackRepository,
)
