import { container } from "tsyringe";

import { EmailAdapter } from "../../adapters/EmailAdapter";
import { NodemailerEmailAdapter } from "../../adapters/nodemailer/NodemailerEmailAdapter";

container.registerSingleton<EmailAdapter>(
  "EmailAdapter",
  NodemailerEmailAdapter,
)
