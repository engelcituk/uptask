import nodemailer from 'nodemailer'

export const emailRegistro = async ( datos ) => { //export con name
  const { email, nombre, token } = datos 

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  //información del email
  const info = await transport.sendMail({
    from: '"upTask - Administrador de proyectos" <cuentas@uptask.com>',
    to: email,
    subject: 'UpTask - Comprueba tu cuenta',
    text: 'Comprueba tu cuenta en UpTask',
    html:`<p>Hola: ${nombre} Comprueba tu cuenta en UpTask.</p>
      <p>Tu cuenta ya está casi lista, solo debes de comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">comprobar cuenta</a>
      </p>
      <p>Sí tu no creaste está cuenta, puedes ignorar este mensaje 😉</p>
    `
  })
}

export const emailOlvidePassowrd = async ( datos ) => { //export con name
  const { email, nombre, token } = datos 

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  //información del email
  const info = await transport.sendMail({
    from: '"upTask - Administrador de proyectos" <cuentas@uptask.com>',
    to: email,
    subject: 'UpTask - Reestablece tu password',
    text: 'Reestablece tu password en UpTask',
    html:`<p>Hola: ${nombre} has solicitado reestablecer tu password en UpTask.</p>
      <p>Sigue  el siguiente enlace, para generar una nueva contraseña:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a>
      </p>
      <p>Sí tu no solicitaste esta acción, puedes ignorar este mensaje 😉</p>
    `
  })
}