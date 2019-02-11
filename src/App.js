import React, { Component } from 'react';
import './App.css';
import Public from './components/public';
import Private from './components/private';
import { Route, Link, Redirect } from 'react-router-dom';

// Responsible for deciding whether to show private route or not
const authUser = {
	isAuthenticated: false,
	authenticate() {
		this.isAuthenticated = true;
	},
	onLogout() {
		this.isAuthenticated = false;
	}
};

// PrivateRoute which wraps the '/private' route i.e the preview component
// If the condition satisfies, It will show the private route otherwise user will be redirected to login page
const PrivateRoute = ({ component: Component, ...props }) => (
	<Route
		{...props}
		render={(props) =>
			authUser.isAuthenticated === true && localStorage.getItem('cookie') === 'a3476react9879ongraph90736' ? (
				<Component {...props} />
			) : (
				<Redirect to="/login" />
			)}
	/>
);

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false
		};
	}

	_onLogIn = () => {
		this.setState({ isLoggedIn: true }, () => {
			// for authentication purpose, cookie is saved in localstorage
			localStorage.setItem('cookie', 'a3476react9879ongraph90736');
			authUser.authenticate();
		});
	};

	render() {
		const { isLoggedIn } = this.state;
		if (isLoggedIn === true) {
			return <Redirect to="/private" />;
		}
		return (
			<div>
				<p>To read the preview of novel, you need to log in</p>
				<button className="btn button" onClick={this._onLogIn}>Log in</button>
			</div>
		);
	}
}

class App extends Component {
	_onLogOut = () => {
		// on logout, removing the cookie from localstorage so private route will not be accessed
		localStorage.removeItem('cookie');
		authUser.onLogout();
		this.forceUpdate();
	};

	render() {
		return (
			<div className="width_88">
				<nav class="navbar navbar-default nav">
					<div class="container-fluid">
						<div class="navbar-header">
							<h1 className="heading">Welcome To The World Of Books...</h1>
						</div>
					</div>
				</nav>
				<Route>
					<div>
						<ul>
							<li><Link to="/public">Novels</Link></li>
							<li><Link to="/private">Preview</Link></li>
						</ul>
						<Route path="/public" component={Public} />
						<PrivateRoute path="/private" component={Private} />
						<Route path="/login" component={Login} />
						{authUser.isAuthenticated && (
							<button className="btn button" onClick={this._onLogOut}>Log Out</button>
						)}
					</div>
				</Route>
			</div>
		);
	}
}

export default App;
