import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ClubItem from './components/ClubItem';

const config = {
	apiKey: "AIzaSyAXDgLxEq1XNmv3ctktawlfksQbyGXfCRs",
	authDomain: "taco-salad-club.firebaseapp.com",
	databaseURL: "https://taco-salad-club.firebaseio.com",
	storageBucket: "taco-salad-club.appspot.com",
	messagingSenderId: "685377951699"
};

firebase.initializeApp(config);

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			loggedin: false,
			items: [{
				name: "Ryan",
				item: "Sour Cream"
			}]
		}
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((data) => {
			this.setState({
				loggedin: true
			});
		});
	}
	render() {
		let loggedin = "Make sure you login to see taco salad club items!";
		if(this.state.loggedin) {
			loggedin = ""
		}
		return (
			<div>
				<Header />
				<section>
				{loggedin}
				{this.state.items.map((item) => {
					return <ClubItem data={item} key={item}/>
				})}
				</section>
				<Footer />
			</div>
		)
	}
}

ReactDOM.render(<App/>,document.getElementById('app'));