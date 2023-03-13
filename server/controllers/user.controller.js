const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user.model");



    module.exports.nuevoUser = async (req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(414).send("User already registered.");

        user = new User(
        _.pick(req.body, ["nombre", "email", "password", "favoritos"])
        );
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(_.pick(user, ["_id", "nombre", "email"]));
    }

    module.exports.getPerfil= async (req, res) => {
        const user = await User.findById(req.user._id).select("-password");
        res.send(user);
    }

