import React, { Component } from 'react';
import './App.css';
import Public from './components/public';
import Private from './components/private';
import { Route, Link, Redirect } from 'react-router-dom';

const authUser = {
	isAuthenticated: false,
	authenticate() {
		this.isAuthenticated = true;
	},
	onLogout() {
		this.isAuthenticated = false;
	}
};

const PrivateRoute = ({ component: Component, ...props }) => (
	<Route
		{...props}
		render={(props) =>
			authUser.isAuthenticated === true && localStorage.getItem('cookie') === 'Dracarys' ? (
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
			localStorage.setItem('cookie', 'Dracarys');
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
				<button className="btn button" onClick={this._onLogIn}>
					Log in
				</button>
			</div>
		);
	}
}

class App extends Component {
	_onLogOut = () => {
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
							<li>
								<Link to="/public">Novels</Link>
							</li>
							<li>
								<Link to="/private">Preview</Link>
							</li>
						</ul>
						<Route path="/public" component={Public} />
						<PrivateRoute path="/private" component={Private} />
						<Route path="/login" component={Login} />
						{authUser.isAuthenticated && (
							<button className="btn button" onClick={this._onLogOut}>
								Log Out
							</button>
						)}
					</div>
				</Route>
			</div>
		);
	}
}

export default App;
