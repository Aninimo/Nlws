import { inject, injectable } from "tsyringe";

import { EmailAdapter } from "../adapters/EmailAdapter";
import { FeedbackRepository } from "../repositories/FeedbackRepository";

interface RequestDTO {
  type: string;
  comment: string;
  screenshot?: string;
}

@injectable()
export class SubmitFeedbackUseCase {
  constructor(
    @inject("FeedbackRepository")
    private feedbackRepository: FeedbackRepository,
    @inject("EmailAdapter")
    private emailAdapter: EmailAdapter,
  ) {}

  async execute(request: RequestDTO): Promise<void> {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error('Type is required')
    }

    if (!comment) {
      throw new Error('Comment is required')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.emailAdapter.sendEmail({
      subject: '',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join('\n'),
    })
  }
}
