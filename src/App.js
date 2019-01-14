import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link, Redirect, withRouter } from "react-router-dom";
import Login from './Login';

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

const Public = () => <h3>Public Content</h3>;
const Protected = () => <h3>Protected Content</h3>;

const ProtectedRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		fakeAuthCentralState.isAuthenticated === true
			? <Component {...props} />
			: <Redirect to={{
				pathname: '/login',
				state: { from: props.location }
			}} />
	)} />
);

const AuthButton = withRouter(({ history }) => (
	fakeAuthCentralState.isAuthenticated ? (
		<p>
			Welcome to this amazing content! <button onClick={() => {
				fakeAuthCentralState.signout(() => history.push('/'))
			}}>Sign out</button>
		</p>
	) : (
		<p>You are not logged in.</p>
	)
));


class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React Router Protection Sample</h1>
				</header>
				<BrowserRouter>
					<div>
						<AuthButton/>
						<ul>
							<li><Link to="/public">Public Content</Link></li>
							<li><Link to="/protected">Protected Content</Link></li>
						</ul>
						<Route path="/public" component={Public}/>
						<Route path="/login" component={withRouter(Login)}/>
						<ProtectedRoute path='/protected' component={Protected} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
