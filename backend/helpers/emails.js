import nodemailer from 'nodemailer'

export const emailRegistro = async ( datos ) => { //export con name
  const { email, nombre, token } = datos 

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8ebffee91228d3",
      pass: "95dbf6bb50c42b"
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
