const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

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
            user: 'rohandalal079@gmail.com',
            pass: 'bqap vfmq vpfl cvto'
        }
    });
    let mailOptions = {
        from: '"Rohan" <rohandalal079@gmail.com>',
        to: req.body.email,
        cc: 'rohandalal079@gmail.com',
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