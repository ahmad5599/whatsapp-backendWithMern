//importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1441964",
  key: "3837ddb7118dbb2fa7f5",
  secret: "e2eb2d585f67ff948a6e",
  cluster: "ap2",
  useTLS: true,
});

//middleware
app.use(express.json());
app.use(cors());

//DB config
const connection_url =
  "mongodb+srv://ahmad599:17November2001.com@cluster0.2zppg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection_url);

//????

const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to mongoDB");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("A change occured" + change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
      });
    } else {
      console.log("Error triggering pusher");
    }
  });
});

//api routes
app.get("/", (req, res) =>
  res.status(200).send("lets goo!༼ つ ◕_◕ ༽つ(╯°□°）╯︵ ┻━┻")
);

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
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
