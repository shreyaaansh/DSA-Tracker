const express = require('express');
const Router = express.Router();
const handler = require('express-async-handler');
const { UserAuthModel } = require('../Models/UserLoginSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt_rounds = 4;
Router.post('/login', handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserAuthModel.findOne({ email });
    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            res.send(generateToken(user));
            return;
        }
        else {
            res.status(400).send('Username or password is invalid');
            return;
        }
    }
    res.status(400).send('User not exist');
}));



Router.post('/register', handler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await UserAuthModel.findOne({ email });
    if (user) {
        res.status(400).send('User Already Registered');
        return;
    }
    const hashPassword = await bcrypt.hash(password, salt_rounds);
    const newUser = {
        name,
        email: email,
        password: hashPassword,
    }
    const result = await UserAuthModel.create(newUser);
    res.send(generateToken(result));
    return;
}));

const generateToken = user => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    );
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        token,
    };
};

module.exports = Router;
