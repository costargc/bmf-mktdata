
module.exports = function (app, path) {

  // Load index page
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home", "home.html"));
  });

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/404", "404.html"));
  });

  // Load example page and pass in an example by id

// Render 404 page for any unmatched routes
//   app.get("*", function (req, res) {
//     var mypath = { pathname: res.req._parsedOriginalUrl.pathname };
//     res.status(404);
//     res.render("404", mypath);
//   });
};
