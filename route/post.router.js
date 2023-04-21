const express = require("express")
const fs = require("fs")
const dogRoute = express.Router();
//const {validator}=require("./middlewares/validator.middleware.js")

dogRoute.get("/", (req, res) => {
    const read = fs.readFileSync("./db.json");
    const parsedData = JSON.parse(read);
    // console.log(parsedData);
    res.send(parsedData.dogs);
})


dogRoute.post("/add", (req, res) => {
    const read = fs.readFileSync("./db.json");
    const parsedData = JSON.parse(read);
    let obj = req.body;
    let randomNumber = Math.floor(Math.random() * 900000) + 100000;
    obj["id"] = randomNumber;
    parsedData.dogs.push(obj);
    fs.writeFileSync("./db.json", JSON.stringify(parsedData));
    res.send("dogs added");
})

//studentRoute.use(validator)

dogRoute.patch("/update/:id", (req, res) => {
    const read = fs.readFileSync("./db.json");
    const parsedData = JSON.parse(read);
    let data = req.params.id;
    parsedData.dogs.forEach((item, index) => {
        if (item.id == data) {
            item.name = req.body.name;
            item.age = req.body.age;
            item.place = req.body.place;
            item.gender = req.body.gender;
            item.image = req.body.image;
        }
    });

    fs.writeFileSync("./db.json", JSON.stringify(parsedData));
    res.send("dog information updated");
})

dogRoute.delete("/delete/:id", (req, res) => {
    const read = fs.readFileSync("./db.json");
    const parsedData = JSON.parse(read);
    let data = req.params.id;
    parsedData.dogs.forEach((item, index) => {
        if (item.id == data) {
            parsedData.dogs.splice(index, 1);
        }
    });
    fs.writeFileSync("./db.json", JSON.stringify(parsedData));
    res.send("dog removed");
})


module.exports = {
    dogRoute
}