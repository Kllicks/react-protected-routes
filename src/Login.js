import React, { Component } from 'react';
// import { BrowserRouter, Route, Link, Redirect, withRouter } from "react-router-dom";

// figure out how to only have this in app.js
const fakeAuthCentralState = {
	isAuthenticated: false,
	authenticate(callback) {
		this.isAuthenticated = true;
		setTimeout(callback, 300);
	},
	signout(callback) {
		this.isAuthenticated = false;
		setTimeout(callback, 300);
	}
};

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectToReferrer: false
		};
	}
	
	login = () => {
		fakeAuthCentralState.authenticate(() => {
			this.setState(() => ({
				redirectToReferrer: true
			}));
		});
	}

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } };
		const { redirectToReferrer } = this.state;

		if (redirectToReferrer === true) {
			this.props.history.push(from.pathname);
		}

		return (
			<div>
				<p>Please, you need to be authenticated to to view this content</p>
				<button onClick={this.login}>Log in</button>
			</div>
		)
	}
}

export default Login;