const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "snehlata0042@gmail.com",
    pass: "bnxsswqdwcotrsyy",
  },
});

const SendToUSer = async (email, smail, smobile, sname) => {
  try {
    const info = await transporter.sendMail({
      from: '"snehlata0042@gmail.com',
      to: email,
      subject: "Seller Details",
      text: "contact-details",
      html: `<b>Seller Name:</b> ${sname}<br>
            <b>Seller Email:</b> ${smail}<br>
            <b>Seller Mobile:</b> ${smobile}`,
    });
    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const SendToSeller = async (email, uemail, uname, umobile) => {
  try {
    const info = await transporter.sendMail({
      from: '"snehlata0042@gmail.com',
      to: email,
      subject: "Interted Client Details",
      text: "interested",
      html: `<b>Seller Name:</b> ${uname}<br>
            <b>Seller Email:</b> ${uemail}<br>
            <b>Seller Mobile:</b> ${umobile}`,
    });
    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// RegistrationEmail().catch(console.error);

module.exports = { SendToUSer, SendToSeller };
