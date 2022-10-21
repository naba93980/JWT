const {BadRequest} = require("../errors");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequest('please provide email and password');
    }

    //just for demo, normally provided by DB!!!!
    const id = new Date().getDate();

    const token = jwt.sign({ id, username }, process.env.JWT_TOKEN, { expiresIn: '30s' })
    res.status(200).json({ mssg: "user logged", token });
};


const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello, ${req.user.username}`, secret: `Here is your authorized data, r lucky number is ${luckyNumber}` });
};

module.exports = {
    login,
    dashboard,
};
