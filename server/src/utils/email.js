const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
// const sendMail = async options => {
//   const transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "db35c8379b254d",
//       pass: "3f1a5e5b2b8752"
//     }
//   });

//   const mailOptions = {
//     from: "Admin <jonathanwongcodes@gmail.com>",
//     to: options.email,
//     subject: options.subject,
//     text: options.message
//   };

//   await transport.sendMail(mailOptions);
// };

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.firstName = user.name;
    this.from = `Jonathan ${process.env.EMAIL_FROM}`;
  }

  newTransport() {
    if (process.env.NODE_ENV.trim() === "production") {
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "db35c8379b254d",
        pass: "3f1a5e5b2b8752"
      }
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    const mailOptions = {
      to: this.to,
      from: this.from,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to my app");
  }

  async sendPasswordReset() {
    await this.send("resetPassword", "Reset your password");
  }
}

module.exports = Email;
