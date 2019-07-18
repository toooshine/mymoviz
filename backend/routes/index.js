var express = require('express');
var router = express.Router();
var request = require('request');
const apiKey = '3f08c9c8dd29aa6b1cd00037307f1682';
const movieModel = require('../models/movies');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/movies', function(req, res, next) {
	request(
		`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr&page=1&sort_by=popularity.desc&include_adult=false&include_video=false`,
		function(error, response, body) {
			body = JSON.parse(body);
			res.json({ result: true, movies: body.results });
		}
	);
});

router.get('/mymovies', function(req, res, next) {
	movieModel.find(function(error, data) {
		res.json({ result: true, data });
	});
});

router.post('/mymovies', function(req, res, next) {
	var newMovie = new movieModel({
		title: req.body.title,
		overview: req.body.overview,
		poster_path: req.body.poster_path,
		idMovieDB: req.body.idMovieDB
	});
	newMovie.save(function(error, movie) {
		res.json({ result: true, movie });
	});
});

router.delete('/mymovies/:idMovie', function(req, res, next) {
	movieModel.deleteOne({ idMovieDB: req.params.idMovie }, function(error, response) {
		res.json({ result: true });
	});
});

module.exports = router;
