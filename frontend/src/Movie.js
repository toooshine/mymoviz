import React, { Component } from 'react';
import { Col, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default class Movie extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.state = { like: this.props.isLiked };
	}

	handleClick() {
		var isLike = !this.state.like;
		this.setState({
			like: isLike
		});
		if (isLike) {
			// We want to save a movie in our db
			// Here, we are using ES6 syntax, so we do not need to store this in ctx.
			fetch('http://localhost:3000/mymovies', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: `title=${this.props.title}&overview=${this.props.desc}&poster_path=${this.props
					.img}&idMovieDB=${this.props.idMovie}`
			}).catch((error) => {
				console.error(error);
			});
		} else {
			// Here we want to delete a movie in our database
			fetch(`http://localhost:3000/mymovies/${this.props.idMovie}`, {
				method: 'DELETE'
			}).catch((error) => {
				console.error(error);
			});
		}
		this.props.handleClickParent(isLike, this.props.title);
	}

	render() {
		if (this.props.displayOnlyLike && !this.state.like) {
			var styleCol = {
				display: 'none'
			};
		}
		var styleHeartTrue = {
			color: '#fc6861',
			position: 'absolute',
			top: '5%',
			left: '80%',
			cursor: 'pointer'
		};
		var styleHeartFalse = {
			position: 'absolute',
			top: '5%',
			left: '80%',
			cursor: 'pointer'
		};
		return (
			<Col xs="12" sm="6" md="4" lg="3" style={styleCol}>
				<div style={{ marginBottom: 30 }}>
					<Card>
						<CardImg
							top
							width="100%"
							src={`https://image.tmdb.org/t/p/w500/${this.props.img}`}
							alt="Card image cap"
							style={{ minHeight: 380 }}
						/>
						{this.state.like ? (
							<FontAwesomeIcon
								size="2x"
								style={styleHeartTrue}
								icon={faHeart}
								onClick={this.handleClick}
							/>
						) : (
							<FontAwesomeIcon
								size="2x"
								style={styleHeartFalse}
								icon={faHeart}
								onClick={this.handleClick}
							/>
						)}
						<CardBody style={{ height: 250 }}>
							<CardTitle style={{ textAlign: 'center' }}>{this.props.title}</CardTitle>

							<CardText style={{ textAlign: 'center' }}>
								{this.props.desc.substr(0, 90) + ' ...'}
							</CardText>
						</CardBody>
					</Card>;
				</div>
			</Col>
		);
	}
}
