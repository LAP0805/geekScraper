const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const PORT = process.env.PORT || 3000;
const app = express();
const db = require("./models");

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(express.static("public"));
const handlebars = require("express-handlebars");

app.engine("handlebars", handlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

//connect to mongoDB//
mongoose.connect("mongodb://localhost/geekScraper", {
  useNewUrlParser: true
});


///api routes///
function getAllTheThings() {
  app.get('/', (req, res) => {
    db.Article.find({}).populate('notes').sort({
      _id: -1
    }).then(function (results) {
      res.render('index', {
        results
      })
    })
  });

}
getAllTheThings();


app.get("/scrape", (req, res) => {
  axios.get("https://www.geek.com/category/news/").then(response => {
    const $ = cheerio.load(response.data);
    $("h1.story-title").each((i, element) => {
      const result = {
        title: $(element).text(),
        link: $(element).parent().parent().parent().find('a').attr('href'),
        image: $(element).parent().parent().parent().find('img').attr('data-src').split(',')[0].replace('[', '')
      };

      db.Article.create(result).then(function (newArticle) {
        console.log(newArticle)
getAllTheThings();
      })
    });

  });
});

app.post('/articles/:id', (req, res) => {
  db.Note.create(req.body).then(dbNote => {
      console.log(dbNote)
      return db.Article.findOneAndUpdate({_id: req.params.id}, {$push: {notes: dbNote._id}}, {new: true});
    })
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});

app.delete('/deleteNote/:id', (req, res) => {
  db.Note.deleteOne({
    _id: req.params.id
  }, function (error) {
    if (error) {
      console.log(error)
    } else {
      res.end()
    }
  })
})