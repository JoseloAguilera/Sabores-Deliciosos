const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");

module.exports.authenticate = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password.");
    res.json({ token: user.generateToken() });
};

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(8).required().email(),
        password: Joi.string().min(8).required(),
    });

    return schema.validate(req);
};


