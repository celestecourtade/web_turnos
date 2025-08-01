import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendCancellation(email: string, token: string) {
    const cancelLink = `${process.env.FRONT_URL}/cancel/${token}`;

    await this.resend.emails.send({
      from: 'celestecmex@gmail.com',
      to: email,
      subject: 'Cancel your appointment',
      html: `
        <p>Hello!</p>
        <p>You can cancel your appointment by clicking the link below:</p>
        <a href="${cancelLink}">Cancel Appointment</a>
      `,
    });
  }
}
