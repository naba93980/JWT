const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const posts = [
    {
        username: "kyle",
        title: "Post 1",
    },
    {
        username: "jim",
        title: "Post 2",
    },
    {
        username: "nabajyoti",
        title: "Post 3",
    },
];

app.use(express.json());

app.get("/posts", authenticateToken, (req, res) => {
    const post = posts.find((post) => post.username === req.user.name);
    res.json(post);
});

app.post("/login", (req, res) => {
    //authenticate user

    console.log(req.body);
    const username = req.body.username;
    const user = { name: username };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const [Bearer, Token] = authHeader.split(" ");
    if (!Token) return res.status(401).send("send the auth token plz :)");
    jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).send("token doesnot match :)");
        console.log(user);
        req.user = user;
    });
    next();
}
app.listen(6000);
