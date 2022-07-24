//importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";

//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware

//DB config
const connection_url =
  "mongodb+srv://ahmad599:17November2001.com@cluster0.2zppg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection_url);

//????

//api routes
app.get("/", (req, res) =>
  res.status(200).send("lets goo!༼ つ ◕_◕ ༽つ(╯°□°）╯︵ ┻━┻")
);
app.post("/api/v1/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created:\n ${data}`);
    }
  });
});
//listen
app.listen(port, () => console.log(`Listening on port ${port}`));
