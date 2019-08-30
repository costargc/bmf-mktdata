var bmf_scraper = require("../app/bmf_scraper.js");
var anbima_scraper = require("../app/anbima_scraper.js");
var fs = require('fs');

module.exports = function (app) {


  app.post("/api/BMFsearch", function (req, res) {
    console.log("Received Data:");
    console.log(req.body.date);

    anbima_scraper.ambima_isHoliday(req.body.date).then(function (result) {
      if (result === false) {


        bmf_scraper.searchbmf(req.body.date, req.body.slcTaxa).then(function (data) {

          // fs.writeFile('./public/assets/data.json', data);
   
          var time = []; 
          var value = [];
          for (var i = 0; i < data.length; i++) {
            time.push(data[i][0]);
            value.push(data[i][1]);
          }

          obj = {
            date: req.body.date,
            index: req.body.slcTaxa,
            time: time,
            value: value
          }

          console.log(obj);

          // fs.writeFile("./public/assets/data.json", JSON.stringify(obj), err => {
          //   if (err) {
          //     throw err;
          //   }
          //   else {
          //     console.log("data written to file");
          //   }
          // });

          res.json(obj);
        });

      }
      else {
        res.json("can't find data");
        console.log("can't find data");
      }
    });



  })


};
