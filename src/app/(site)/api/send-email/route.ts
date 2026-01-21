// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, type } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_SECRET_KEY,
      },
    });

    await transporter.verify();

    let mailOptions;

    if (type === 'newsletter') {
      // Confirmación al equipo: nuevo suscriptor
      mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: process.env.MAILER_EMAIL,
        subject: 'Nuevo Suscriptor al Newsletter',
        text: `Se ha suscrito: ${email}`,
        html: `
          <p><strong>📧 Nuevo suscriptor:</strong></p>
          <p><strong>Email:</strong> ${email}</p>
          <p>Revisa tu lista de contactos o gestiona desde tu panel.</p>
        `,
      };

      // Opcional: enviar correo de bienvenida al suscriptor
      const welcomeMail = {
        from: process.env.MAILER_EMAIL,
        to: email,
        subject: '¡Bienvenido a nuestro Newsletter!',
        html: `
          <h2>¡Hola!</h2>
          <p>Gracias por suscribirte a nuestro newsletter. Pronto recibirás contenido exclusivo sobre branding, diseño y marketing digital.</p>
          <p>— Tu Marca AR</p>
        `,
      };

      // Enviamos ambos correos
      await transporter.sendMail(mailOptions);
      await transporter.sendMail(welcomeMail);

    } else {
      // Mensaje de contacto normal
      mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.MAILER_EMAIL,
        replyTo: email,
        subject: `Nuevo mensaje de contacto de ${name}`,
        text: message,
        html: `
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Mensaje:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json(
      { message: type === 'newsletter' 
        ? '¡Gracias por suscribirte!' 
        : 'Correo enviado con éxito' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json(
      { error: 'No se pudo enviar el correo' },
      { status: 500 }
    );
  }
}