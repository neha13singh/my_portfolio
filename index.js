const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const mongo = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(mongo);
    console.log("Connected to DB");
}
main().catch(err => console.log(err));

// Middleware
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/",(req,res)=>{
    res.render("index.ejs", {
        nextPage: 'education',
        nextPageTitle: 'Education'
    });
});
app.get("/skills",(req,res)=>{
    res.render("skills.ejs", {
        nextPage: 'projects',
        nextPageTitle: 'Projects'
    });
});
app.get("/education",(req,res)=>{
    res.render("education.ejs", {
        nextPage: 'skills',
        nextPageTitle: 'Skills'
    });
});
app.get("/achievements",(req,res)=>{
    res.render("achievements.ejs", {
        nextPage: 'experience',
        nextPageTitle: 'Experience'
    });
});
app.get('/projects', function(req, res) {
    res.render('projects.ejs', {
        nextPage: 'experience',
        nextPageTitle: 'Experience'
    });
});
app.get("/experience",(req,res)=>{
    res.render("experience.ejs", {
        nextPage: 'achievements',
        nextPageTitle: 'Achievements'
    });
})
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});