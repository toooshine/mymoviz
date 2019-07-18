const mongoose = require('mongoose');

/* ----- Your DB ------ */
const dbUrl = 'mongodb+srv://toooshine:Leejunfan27!@cluster0-mza1q.mongodb.net/mymovies?retryWrites=true';
/* --------------------- */

/* ----- DB Options ------ */
const options = {
	connectTimeoutMS: 5000,
	useNewUrlParser: true
};

mongoose.connect(dbUrl, options, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.log('Your database is operational...');
	}
});

module.exports = mongoose;
