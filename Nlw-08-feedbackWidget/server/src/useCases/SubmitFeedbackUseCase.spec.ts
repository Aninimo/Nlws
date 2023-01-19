import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase";

let submitFeedback: SubmitFeedbackUseCase;

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

describe('Submit feedback', () => {
  beforeEach(() => {
    submitFeedback = new SubmitFeedbackUseCase(
      { create: createFeedbackSpy },
      { sendEmail: sendEmailSpy },
    );
  });

  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'fake comment',
      screenshot: 'data:image/png;base64,asdhhfdfhfhh'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'fake comment',
      screenshot: 'data:image/png;base64,asdhhfdfhfhh'
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,asdhhfdfhfhh'
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback with and invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'fake comment',
      screenshot: 'teste.jpg'
    })).rejects.toThrow();
  });
});
