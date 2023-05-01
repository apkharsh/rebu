const express = require("express");
const bodyParser = require("body-parser");
const bookingRoutes = require("./routes/bookingRoutes.js");
const roomRoutes = require("./routes/carRoutes.js");
const bcrypt = require("bcrypt");
const db = require("./db.js");
const app = express();
const cors = require("cors");
const generateAuthToken = require("./jwtTokenGenerator");

const User = require("./models/User");

// Middleware
app.use(cors());
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// now use these routes
app.use("/api/bookings/", bookingRoutes);
app.use("/api/cars/", roomRoutes);

// connect to MongoDB
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB!"));

// CLEAR DB
app.post("/api/clear", async (req, res) => {
    await db.dropDatabase();
    res.status(200).json({
        message: "Database cleared",
    });
});


app.post("/register", async (req, res) => {
    const user = req.body;
    const Email = await User.findOne({ email: user.email });
    if (Email) {
      res.send("user is already register in  our dataBase");
    } else {
      user.password = await bcrypt.hash(req.body.password, 10);
      const dbUser = new User({
        name: user.name,
        phonenumber: user.phonenumber,
        email: user.email.toLowerCase(),
        passWord: user.password,
      });
      await dbUser.save();
      res.json({ messge: "done" });
    }
  });



  app.post("/login", async (req, res) => {
    const userInfo = req.body;
    let userData;
    try {
      userData = await User.findOne({ email: userInfo.email });
    } catch (err) {
      console.log(err, "err while matching email in database");
    }
  
    if (!userData) {
      return res
        .status(401)
        .send({ message: "Invalid Email or password oye hoye", success: false });
    }
    const validPassword = await bcrypt
      .compare(userInfo.passWord, userData.passWord)
      .catch((err) => {
        console.log(err, "err while hashin");
        res.status(500).send({ message: "Internal server err" });
      });
    if (!validPassword) {
      return res.status(401).status({ message: "Invalid email passWord" });
    }
    let userDataObject = userData.toObject();
  
    delete userDataObject.passWord;
    console.log(userData.name);
    let username = userData.name;
    const token = generateAuthToken(userData);
    console.log(userDataObject);
    return res.status(200).send({
      data: { token: token, userData: userDataObject, username:username},
      message: "Loggged in successfully",
      success: true,
    });
  });
  

// Start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));