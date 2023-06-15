import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"

type ResetPasswordMailer = {
  to: string
  token: string
}

//parti de blitz permettant de retrouver lemail rentrer dans le form ainsi que le token géneré qui sera placé dans le lien
export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/reset-password?token=${token}`

  //transporter pour utiliser nodemailers, certainementà passer sur serveur smtp mais normalement on ne depassera pas les 500mails par jour
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "numedic.efrei@gmail.com",
      pass: "Efrei2023$", // naturally, replace both with your real credentials or an application-specific password
    },
  })

  //mise en place du template (chemin et etc)
  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        partialsDir: "./views/",
        defaultLayout: "",
      },
      viewPath: "./views/",
      extName: ".hbs",
    })
  )

  //schema de l'email
  const msg = {
    from: "numedic.efrei@gmail.com",
    to,
    subject: "Vos instructions de changements de mot de passe",
    text: "message envoyé",
    template: "recover",
    context: {
      url: resetUrl,
    },
  }

  //envoi du mail
  transporter.sendMail(msg, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })

  //partie de base par blitz j'ai supprimé la géneration du previewemail
  return {
    async send() {},
  }
}

/*
j'ai du supprimé les différents fichiers test géneré par blitz car il reset la bdd et surtout je ne voyais pas l'utilité
l'erreur sur le typescript de viewEngine (l.26) n'a pas l'air de poser de probleme, je suppose que le fichier ts n'a pas été mis a jour
avec le module
*/
