import * as postmark from 'postmark';

const client = new postmark.ServerClient(
  process.env.POSTMARK_SERVER_TOKEN as string,
);

export interface EmailOptions {
  To: any;
  TemplateModel: object;
  locale?: string;
}

/**
 * Class representing an email
 */
export default class Email {
  /**
   * Initialize the sender and template
   * @param {string} origin The sender signature
   * @param {string} templateBase The template to use
   */

  private origin: string;
  private templateAlias: string;
  private stream: string;
  constructor(origin: string, templateBase: string, stream = 'outbound') {
    this.origin = origin;
    this.templateAlias = templateBase;
    this.stream = stream;
  }

  /**
   * Send the constructed email to the mail client
   * @param {EmailOptions} options
   * @return {Promise<>} The response object of the request
   */
  send(options: EmailOptions | EmailOptions[]) {
    /**
     * Predicate to verify whether the argument is an array or a single object
     * Support both batch sending and regular single transactional emails
     * @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
     */
    function isBatch(
      options: EmailOptions | EmailOptions[],
    ): options is EmailOptions[] {
      return Array.isArray(options);
    }

    if (isBatch(options)) {
      const batchList: postmark.TemplatedMessage[] = options.map(
        this.createEmail.bind(this),
      );

      return client.sendEmailBatchWithTemplates(batchList);
    } else {
      const email = this.createEmail(options);
      return client.sendEmailWithTemplate(email);
    }
  }

  /**
   * Creates the email's model
   * @param {EmailOptions}
   */
  createEmail({
    To,
    TemplateModel,
    locale = 'fr',
  }: EmailOptions): postmark.TemplatedMessage {
    const email: postmark.TemplatedMessage = {
      From: `${this.origin}@c360hd.com`,
      To,
      TemplateAlias: `${this.templateAlias}-${locale.toLowerCase()}`,
      TemplateModel,
      MessageStream: this.stream,
    };
    return email;
  }
}

const onboardingEmail = new Email('sales', 'onboarding');
const deliveryEmail = new Email('admin', 'sendoff', 'sendoffs');

export { onboardingEmail, deliveryEmail };
