import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true si usás el puerto 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendCancelacion(email: string, cancelToken: string) {
    const link = `http://localhost:3001/turnos/cancel/${cancelToken}`;

    const mailOptions = {
      from: `"Turnos Web" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Confirmación de turno y link para cancelar',
      html: `
        <h3>¡Tu turno fue reservado con éxito!</h3>
        <p>Si necesitás cancelar, podés hacerlo desde este enlace:</p>
        <a href="${link}">${link}</a>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Correo enviado:', info.messageId);
    } catch (error) {
      console.error('❌ Error al enviar correo:', error);
      throw new Error('No se pudo enviar el correo de cancelación');
    }
  }
}
