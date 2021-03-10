require("dotenv").config();
const express = require("express");
const path = require("path");
const got = require("got");
// const ejs = require("ejs");
const app = express();



//To direct Express to the views folder
app.set("view engine", "ejs");

// telling Node.js to use __dirname to point to the public directory that contains static files.
app.use(express.static(path.join(__dirname, "public")));



app.get("/", (req, res) => {

    const url = {
        total: "https://disease.sh/v3/covid-19/all",
        daily: "https://disease.sh/v3/covid-19/historical/all?lastdays=all",
        continent: "https://disease.sh/v3/covid-19/continents",
        hardestHit: "https://disease.sh/v3/covid-19/historical/USA%2CIndia%2CBrazil%2C%20Russia%2CUK?lastdays=all",
    };

    Promise.all([got(url.total).json(), got(url.daily).json(), got(url.continent).json(), got(url.hardestHit).json()]).then((data)=> {
        
        //sort array object by descending
        for (var i = 0; i < data[2].length; i++) {
            for (var j = i + 1; j < data[2].length; j++) {
                if (data[2][i].cases < data[2][j].cases) {
                    temp = data[2][i];
                    data[2][i] = data[2][j];
                    data[2][j] = temp;
                }
            }
        }

        res.render("home", {totalData: data[0], dailyData: data[1], continentData: data[2], hardestData: data[3]});
    }).catch(err => {
        console.log("error: " + err);
    });

});


app.get("/table", (req, res) => {
    res.render("table");
})



app.listen("3000", (req, res) => {
    console.log("Server is running on port 3000");
});