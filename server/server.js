require("dotenv").config();

const express = require("express"),
    cookieParser = require("cookie-parser"),
    cors = require("cors")

//config
require("./config/mongoose.config");

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000"}));
app.use(express.json());

//routes
require("./routes/user.routes")(app)


app.listen(process.env.DB_PORT, () =>
    console.log(`Listening on port ${process.env.DB_PORT}`)
);