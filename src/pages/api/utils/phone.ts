import { createReminderSms } from './templates';

/**
 * Formats a phone number to a simple string by removing spaces and special characters
 *
 * @param {string} phoneNumber
 * @returns {string}
 */
function formatPhoneNumber(phoneNumber: string): string {
  const regex = /[()\s-]/gi;
  return '+1' + phoneNumber.replace(regex, '');
}

export interface Appointment {
  company: string;
  number: string;
  time: string;
  language: string;
}

/**
 * Send messages to all appointment owners via Twilio
 * @param {Array} appointments List of appointments.
 */
async function sendSmsNotifications(
  appointments: Appointment[]
): Promise<void> {
  // Set up twilio
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  async function sendAppointment(appointment: Appointment) {
    const options = {
      to: appointment.number,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: createReminderSms(appointment),
    };

    // Forward message request to Twilio
    await client.messages.create(options);

    // Log the last digits of the phone number
    let masked = appointment.number.substr(0, appointment.number.length - 5);
    masked += '*****';
    console.log(`Message sent to ${masked}`);
  }

  await Promise.all(appointments.map(sendAppointment));
}

export { formatPhoneNumber, sendSmsNotifications };
