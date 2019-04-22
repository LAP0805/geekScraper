const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: 'https://thumbs.dreamstime.com/b/geek-cartoon-character-avatar-graphic-art-illustration-42825869.jpg'
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;