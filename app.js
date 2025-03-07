const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const message = req.body.message;
    const name = req.body.name;
    let transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'process.env.EMAIL_USER',
            pass: 'process.env.EMAIL_PASS'
        }
    });
    let mailOptions = {
        from: '"Rohan" <process.env.EMAIL_USER>',
        to: req.body.email,
        cc: 'process.env.EMAIL_USER',
        subject: 'Thanks for for giving feedback ' + name,
        text: 'Thanks for your message You have sent to us --> ' + message
    }

    transpoter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
            console.log("email sent" + info.response);
        }
    });

});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});