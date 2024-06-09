const nodemailer = require("nodemailer");
const { convert } = require('html-to-text');

const options = {
  wordwrap: 130,
};

module.exports = class Email {
  constructor(user, url) {
    (this.to = user.email),
      (this.password = user.password),
      (this.firstName = user.name.trim().split(" ")[0]),
      (this.url = url),
      (this.from = `Tourism <${process.env.EMAIL}>`);
  }

  newTransport() {
    
    return nodemailer.createTransport({
      service: `gmail`,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    //1) Render HTMl mail template
    let html;
    if (subject === "Welcome to the LiveEasy")
      html = `<h1> Welcome ${this.firstName} in LiveEasy </h1>`;
    else
      html = `<label>Your new password is : </label> 
            <p>${this.password}</p>`;

    //2) Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html, options),
    };

    //3)send mail using transporter
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the LiveEasy");
  }

  async sendResetPassword() {
    await this.send(
      "resetPassword",
      "Your password is reset successfully for LiveEasy"
    );
  }
};
