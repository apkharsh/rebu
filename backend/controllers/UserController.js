const User = require("../models/User");

// api/users/
app.post('/register', async (req, res) => {
    try {
      var user = req.body;
      if (await User.findOne({email: user.email}) !== null) {
        res.status(400).json({ response: "User already registered." });
      } else {
        var currentPassword = user.password;
          bcrypt.hash(currentPassword, 10, async(err, hash) => {
          if (err) {
            console.log(err);
            res.status(500).json({ response: "Internal server error." });
          } else {
            const newUser = new User({
              name: user.name,
              email: user.email,
              phonenumber: user.phonenumber,
              passWord: hash
            });
            await newUser.save();
            res.status(200).json({ response: "User registered successfully." });
          }
        });
      }
    } catch (err) {
      res.status(400).json({ response: err });
    }
  });
  
  
  app.post('/login', async(req,res)=> {
    const { email, password } = req.body; 
    try {
      const user = await User.findOne({email: email});
  
      console.log(user);
  
      if(!user) {
        res.status(400).json({ response: "User not registered." });
      } else {
        const comparingPassword = user.passWord;
        bcrypt.compare(password, comparingPassword, (err,result)=>{
          if(err) {
            console.log(err);
            res.status(500).json({ response: "Internal server error." });
          } else if(result) {
            const token = generateAuthToken(user);
            res.status(200).json({ response: "User logged in successfully.", token: token, username: user.name });
          } else {
            res.status(400).json({ response: "Incorrect password." });
          }
        });
      }
    } catch(err) {
      console.log(err);
      res.status(500).json({ response: "Internal server error." });
    }
  });