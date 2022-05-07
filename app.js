const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
// const client = require("mailchimp-marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  //   console.log(firstName, lastName, email);
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const url = "https://us17.api.mailchimp.com/3.0/lists/5fb6f7825b";

  const jsonData = JSON.stringify(data);

  const options = {
    method: "POST",
    auth: "swastikop:487709f550fdd3d0ccb92c182805eedb-us17",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.send("Wohhooo You are successfully subscribed!");
    } else {
      res.send("Plz try again later :|");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);

  request.end();
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
