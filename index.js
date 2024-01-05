const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username : "AdityaKadam",
        content : "Which coding challenge pushed your boundaries recently, and how did you tackle it to overcome the obstacle?",
    },
    {
        id : uuidv4(),
        username : "prajwalkadam",
        content : "What's the first programming language you ever learned, and what motivated you to start coding?",
    },
    {
        id : uuidv4(),
        username : "shreyashsarode",
        content : "How did your internship experience contribute to your personal or professional growth?",
    },
];
app.get("/posts", (req, res) => {
    res.render("index.ejs" , {posts});
});
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});
app.post("/posts", (req, res) => {
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({ id,username, content });
    res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    console.log(post);
    res.render("show.ejs", {post});
});
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs");
});
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
     posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});
app.listen(port, () => {
    console.log("listing to port : 8080");
})