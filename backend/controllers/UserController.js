const User = require("../models/User");

// api/users/

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (name == null || email == null || password == null) {
        return res.status(400).json({
            error: "Fill all the fields",
        });
    } else {
        try {
            const user = new User({
                name: name,
                email: email,
                password: password,
            });

            await user.save();

            res.status(200).json({
                message: "Account created successfully",
                user,
            });
        } catch (error) {
            res.status(400).json({
                error: error.message,
            });
        }
    }
}