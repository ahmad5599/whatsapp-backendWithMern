//importing
import express from "express";

//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware

//DB config

//????

//api routes
app.get("/", (req, res) =>
  res.status(200).send("lets goo!༼ つ ◕_◕ ༽つ(╯°□°）╯︵ ┻━┻")
);

//listen
app.listen(port, () => console.log(`Listening on port ${port}`));
