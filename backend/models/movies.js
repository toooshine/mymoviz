const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
	title: String,
	overview: String,
	poster_path: String,
	idMovieDB: Number
});

var movieModel = mongoose.model('movies', movieSchema);

module.exports = movieModel;
