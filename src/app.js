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
			items: [],
			name: "",
			item: ""
		}
		this.addItem = this.addItem.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((data) => {
			this.setState({
				loggedin: true
			});
		});

		firebase.database().ref().on('value', (data) => {
			const values = data.val();
			const items = [];
			for(let key in values) {
				values[key].key = key;
				items.push(values[key])
			}
			this.setState({
				items
			});
		});
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	addItem(e) {
		e.preventDefault();
		if(firebase.auth().currentUser !== null) {
			firebase.database().ref().push({
				name: this.state.name,
				item: this.state.item
			});

			this.setState({
				name: "",
				item: ""
			});
		}
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
				<form onSubmit={this.addItem}>
					<label htmlFor="item">Item: </label>
					<input type="text" name="item" onChange={this.handleChange}/>
					<label htmlFor="name">Name: </label>
					<input type="text" name="name" onChange={this.handleChange}/>
					<button>Add Item</button>
				</form>
				{this.state.items.map((item) => {
					return <ClubItem data={item} key={item.key}/>
				})}
				</section>
				<Footer />
			</div>
		)
	}
}

ReactDOM.render(<App/>,document.getElementById('app'));