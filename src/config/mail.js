export default {

    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,

    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }

}
// var transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "fba8ddad498dea",
//       pass: "5dc6db7a18a833"
//     }
//   });