const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new CustomAPIError('please provide email and password', 400);
    }
    res.send("Fake Login/Register/Signup Route");

};

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: "Hello, John Doe", secret: `Here is your authorized data, r lucky number is ${luckyNumber}` });
};

module.exports = {
    login,
    dashboard,
};
