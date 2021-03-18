import { Appointment } from './phone';

/**
 * Creates the sms content with appropriate formatting and language.
 */
function createReminderSms({ company, time, language: lang }: Appointment) {
  switch (lang) {
    case 'EN':
      return `Hello. This a message from C360HD that our photographer will be at ${company} around ${time} tomorrow for your Google Streetview Tour.`;
    default:
      return `Bonjour. Ceci est un message de la part de C360HD pour vous rappeler que notre photographe sera à ${company} demain aux environs de ${time} pour votre visite virtuelle Google Streetview.`;
  }
}

export { createReminderSms };
