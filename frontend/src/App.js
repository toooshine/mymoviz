import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavLink,
	Button,
	Popover,
	PopoverHeader,
	PopoverBody,
	Container,
	Row
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Movie from './Movie';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleClickLikeOn = this.handleClickLikeOn.bind(this);
		this.handleClickLikeOff = this.handleClickLikeOff.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.toggle = this.toggle.bind(this);
		this.state = {
			popoverOpen: false,
			viewOnlyLike: false,
			moviesCount: 0,
			moviesNameList: [],
			movies: [],
			moviesLiked: []
		};
	}

	componentDidMount() {
		var ctx = this;
		fetch('http://localhost:3000/movies')
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				console.log(data);
				ctx.setState({ movies: data.movies });
			})
			.catch(function(error) {
				console.log(error);
			});

		fetch('http://localhost:3000/mymovies')
			.then(function(response) {
				return response.json();
			})
			.then(function(movies) {
				var moviesNameListCopy = movies.data.map((movie) => {
					return movie.title;
				});
				ctx.setState({
					moviesLiked: movies.data,
					moviesCount: movies.data.length,
					moviesNameList: moviesNameListCopy
				});
				console.log('HERE THE MOVIES LIKED', ctx.state.moviesLiked);
			})
			.catch(function(error) {
				console.error(error);
			});
	}

	handleClickLikeOn() {
		this.setState({ viewOnlyLike: true });
	}

	handleClickLikeOff() {
		this.setState({ viewOnlyLike: false });
	}

	handleClick(isLike, name) {
		let moviesNameListCopy = [ ...this.state.moviesNameList ];

		console.log(name);
		if (isLike) {
			moviesNameListCopy.push(name);
			this.setState({ moviesCount: this.state.moviesCount + 1, moviesNameList: moviesNameListCopy });
		} else {
			var index = moviesNameListCopy.indexOf(name);
			moviesNameListCopy.splice(index, 1);

			this.setState({ moviesCount: this.state.moviesCount - 1, moviesNameList: moviesNameListCopy });
		}
	}

	toggle() {
		this.setState({
			popoverOpen: !this.state.popoverOpen
		});
	}

	render() {
		// var cardMovies = [
		// 	{
		// 		title: 'Maleficient',
		// 		desc: 'Ut officia amet deserunt amet. Velit reprehenderit veniam consequat aliquip aliqua nostrud.',
		// 		img: './malefique.jpg'
		// 	},
		// 	{
		// 		title: 'The adventure of Tintin',
		// 		desc: 'Ut officia amet deserunt amet. Velit reprehenderit veniam consequat aliquip aliqua nostrud.',
		// 		img: './tintin.jpg'
		// 	},
		// 	{
		// 		title: 'Life of Pi',
		// 		desc: 'Ut officia amet deserunt amet. Velit reprehenderit veniam consequat aliquip aliqua nostrud.',
		// 		img: './pi.jpg'
		// 	},
		// 	{
		// 		title: 'Drive hard',
		// 		desc: 'Ut officia amet deserunt amet. Velit reprehenderit veniam consequat aliquip aliqua nostrud.',
		// 		img: './thumb.jpg'
		// 	}
		// ];

		var movieList = [];
		this.state.movies.map((movie, i) => {
			var isLiked = false;
			for (var y = 0; y < this.state.moviesLiked.length; y++) {
				if (movie.id === this.state.moviesLiked[y].idMovieDB) {
					isLiked = true;
					break;
				}
			}
			movieList.push(
				<Movie
					key={i}
					title={movie.title}
					desc={movie.overview}
					img={movie.poster_path}
					idMovie={movie.id}
					isLiked={isLiked}
					displayOnlyLike={this.state.viewOnlyLike}
					handleClickParent={this.handleClick}
				/>
			);
		});

		var moviesCount = this.state.moviesCount;
		let moviesLast = this.state.moviesNameList.slice(-3);
		if (moviesCount === 0) {
			moviesLast = 'Aucun film sélectionné.';
		} else if (moviesCount > 3) {
			moviesLast = moviesLast.join(', ') + '...';
		} else {
			moviesLast = moviesLast.join(', ') + '.';
		}
		return (
			<div style={{ backgroundColor: '#212529' }}>
				<div style={{ marginBottom: 90 }}>
					<Navbar color="dark" light expand="xs">
						<span className="navbar-brand">
							<img
								src="./logo.png"
								width="30"
								height="30"
								className="d-inline-block align-top"
								alt="logo myMoviz"
							/>
						</span>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="" navbar>
								<NavItem>
									<NavLink style={{ color: '#FFFFFF' }} href="#" onClick={this.handleClickLikeOff}>
										Last releases
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink onClick={this.handleClickLikeOn} href="#" style={{ color: '#FFFFFF' }}>
										My movies
									</NavLink>
								</NavItem>
								<Button id="Popover1" onClick={this.togglePopOver} color="secondary">
									{this.state.moviesCount}
									{this.state.moviesCount > 1 ? ' films' : ' film'}
								</Button>

								<Popover
									placement="bottom"
									isOpen={this.state.popoverOpen}
									target="Popover1"
									toggle={this.toggle}
								>
									<PopoverHeader>Derniers films ajoutés</PopoverHeader>
									<PopoverBody>{moviesLast} </PopoverBody>
								</Popover>
							</Nav>
						</Collapse>
					</Navbar>
				</div>
				<Container>
					<Row>{movieList}</Row>
				</Container>
			</div>
		);
	}
}
