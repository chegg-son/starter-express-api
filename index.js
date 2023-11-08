const express = require("express");
const app = express();
app.use(express.json());

async function sendFonnte(data) {
    const url = "https://api.fonnte.com/send";

    const customHeaders = {
        "Content-Type": "application/json",
        Authorization: "ysCwdTwNQUE0q#4tn8vS",
    };

    const response = await fetch(url, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
    });
    console.log(await response.json());
}

app.post("/webhook", function (req, res) {
    console.log(req.body);
    if (req.body.message == "test") {
        const data = {
            target: req.body.sender,
            message: "working great!",
        };
        sendFonnte(data);
    } else {
        const data = {
            target: req.body.sender,
            message: "this is default reply from fonnte",
        };
        sendFonnte(data);
    }
    res.end();
});

app.listen(process.env.PORT || 3000, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", 3000);
});
// app.listen(process.env.PORT || 3000)